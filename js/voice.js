/* Sakhi Health - voice symptom input (English + Kannada).
 *
 * Uses the browser's Web Speech API (Chrome / Edge). The browser converts speech
 * to text; we then match the text against symptom keywords and tick the chips.
 * Matching is simple and transparent (see KW below). Users can always correct chips by hand.
 *
 * Privacy note: in Chrome and Edge the audio is processed by the browser vendor's
 * speech service. This is optional and disclosed on the Privacy tab.
 */

Object.assign(UI.en, {
  vStart: '🎤 Speak your symptoms', vStop: '⏹ Stop', vListening: 'Listening… speak now.',
  vHeard: 'Heard', vFound: 'Ticked', vNone: 'No symptom recognised. You can tick the chips yourself.',
  vUnsupported: 'Voice input is not supported in this browser. Try Chrome or Edge.',
  vError: 'Could not use the microphone. Check the permission and try again.',
  textSize: 'Text size', skip: 'Skip to content',
  pVoice: 'Voice input is optional. In Chrome and Edge, the browser sends your speech to its own speech service to turn it into text. Nothing else leaves your device.'
});
Object.assign(UI.kn, {
  vStart: '🎤 ನಿಮ್ಮ ಲಕ್ಷಣಗಳನ್ನು ಹೇಳಿ', vStop: '⏹ ನಿಲ್ಲಿಸಿ', vListening: 'ಕೇಳಿಸಿಕೊಳ್ಳುತ್ತಿದೆ… ಈಗ ಮಾತನಾಡಿ.',
  vHeard: 'ಕೇಳಿದ್ದು', vFound: 'ಆಯ್ಕೆ ಮಾಡಿದ್ದು', vNone: 'ಯಾವುದೇ ಲಕ್ಷಣ ಗುರುತಿಸಲಾಗಿಲ್ಲ. ನೀವೇ ಆಯ್ಕೆ ಮಾಡಬಹುದು.',
  vUnsupported: 'ಈ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಧ್ವನಿ ಇನ್‌ಪುಟ್ ಬೆಂಬಲಿತವಾಗಿಲ್ಲ. Chrome ಅಥವಾ Edge ಬಳಸಿ.',
  vError: 'ಮೈಕ್ರೊಫೋನ್ ಬಳಸಲಾಗಲಿಲ್ಲ. ಅನುಮತಿ ಪರಿಶೀಲಿಸಿ ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.',
  textSize: 'ಅಕ್ಷರ ಗಾತ್ರ', skip: 'ವಿಷಯಕ್ಕೆ ಹೋಗಿ',
  pVoice: 'ಧ್ವನಿ ಇನ್‌ಪುಟ್ ಐಚ್ಛಿಕ. Chrome ಮತ್ತು Edge ನಲ್ಲಿ ನಿಮ್ಮ ಮಾತನ್ನು ಪಠ್ಯವಾಗಿ ಪರಿವರ್ತಿಸಲು ಬ್ರೌಸರ್ ತನ್ನದೇ ಸ್ಪೀಚ್ ಸೇವೆಗೆ ಕಳುಹಿಸುತ್ತದೆ. ಬೇರೇನೂ ನಿಮ್ಮ ಸಾಧನ ಬಿಟ್ಟು ಹೋಗುವುದಿಲ್ಲ.'
});
UI.en.pText.push(UI.en.pVoice);
UI.kn.pText.push(UI.kn.pVoice);

const Voice = (() => {
  /* one list of trigger phrases per symptom id (English and Kannada) */
  const KW = {
    irregular: ['irregular', 'missed period', 'late period', 'ಅನಿಯಮಿತ'],
    acne: ['acne', 'pimple', 'ಮೊಡವೆ'],
    hair: ['excess hair', 'facial hair', 'unwanted hair', 'hair growth', 'ಅತಿಯಾದ ಕೂದಲು'],
    hairloss: ['hair loss', 'hair fall', 'losing hair', 'ಕೂದಲು ಉದುರ'],
    weight: ['weight gain', 'gained weight', 'putting on weight', 'ತೂಕ ಹೆಚ್ಚ'],
    fatigue: ['tired', 'fatigue', 'exhausted', 'weakness', 'feel weak', 'ಆಯಾಸ', 'ಸುಸ್ತು', 'ದಣಿವು'],
    dizzy: ['dizzy', 'dizziness', 'giddy', 'light headed', 'lightheaded', 'ತಲೆತಿರುಗ', 'ತಲೆ ಸುತ್ತ'],
    pale: ['pale', 'paleness', 'ಬಿಳಿಚ'],
    cold: ['feel cold', 'feeling cold', 'always cold', 'ಚಳಿ'],
    pelvic: ['pelvic', 'lower abdomen', 'lower belly', 'ಸೊಂಟದ ಕೆಳ', 'ಕೆಳ ಹೊಟ್ಟೆ', 'ಕೆಳಹೊಟ್ಟೆ'],
    painful: ['period pain', 'painful period', 'cramp', 'ಮುಟ್ಟಿನ ನೋವು', 'ನೋವಿನ ಮುಟ್ಟು'],
    bloat: ['bloat', 'ಉಬ್ಬರ'],
    headache: ['headache', 'head ache', 'ತಲೆನೋವು', 'ತಲೆ ನೋವು'],
    palp: ['palpitation', 'heart racing', 'racing heart', 'ಎದೆ ಬಡಿತ', 'ಎದೆಬಡಿತ'],
    moodsw: ['mood swing', 'irritable', 'ಮನಸ್ಥಿತಿ'],
    sleep: ["can't sleep", 'cannot sleep', 'insomnia', 'poor sleep', 'trouble sleeping', 'ನಿದ್ರೆ'],
    hot: ['hot flash', 'hot flush', 'night sweat', 'sweating at night', 'ಬಿಸಿ ಅಲೆ', 'ರಾತ್ರಿ ಬೆವರ']
  };
  const NEG = /\b(no|not|without|never|don't have|do not have|nothing)\b/;
  const CLAUSE_END = /\b(?:but|and|however|though|although)\b|[.,;]/;

  /* returns the symptom ids mentioned in the text (English negations such as "no headache" are skipped) */
  function match(text) {
    const t = (text || '').toLowerCase();
    return Object.keys(KW).filter(id => KW[id].some(w => {
      const i = t.indexOf(w.toLowerCase());
      if (i < 0) return false;
      const clause = t.slice(0, i).split(CLAUSE_END).pop(); // only words in the same clause can negate it
      return !NEG.test(clause);
    }));
  }

  const SR = globalThis.SpeechRecognition || globalThis.webkitSpeechRecognition;
  const api = { KW, match, supported: !!SR, active: false };
  let rec = null;

  api.start = function (lang, onText, onEnd, onErr) {
    rec = new SR();
    rec.lang = lang === 'kn' ? 'kn-IN' : 'en-IN';
    rec.interimResults = false; rec.continuous = false;
    rec.onresult = e => onText(Array.from(e.results).map(r => r[0].transcript).join(' '));
    rec.onerror = e => { api.active = false; onErr(e.error); };
    rec.onend = () => { api.active = false; onEnd(); };
    api.active = true; rec.start();
  };
  api.stop = function () { if (rec) rec.stop(); };
  return api;
})();
