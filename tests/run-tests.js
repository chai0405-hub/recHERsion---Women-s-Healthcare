/* Sakhi Health tests. No dependencies: run with `npm test` (Node 20+).
 * The browser files are loaded into a sandbox with a tiny fake DOM and storage. */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

function makeStore() {
  const s = {};
  return { getItem: k => (k in s ? s[k] : null), setItem: (k, v) => { s[k] = String(v); }, removeItem: k => { delete s[k]; }, _s: s };
}

function loadApp() {
  const els = {};
  const fakeEl = id => els[id] || (els[id] = {
    id, style: {}, textContent: '', innerHTML: '', value: '', checked: false,
    setAttribute() {}, classList: { add() {}, remove() {}, toggle() {}, contains() { return false; } }
  });
  const sandbox = {
    localStorage: makeStore(), sessionStorage: makeStore(),
    document: {
      documentElement: { classList: { add() {}, remove() {} } },
      getElementById: fakeEl,
      createElement: () => ({ remove() {}, setAttribute() {} }),
      body: { appendChild() {} }, querySelectorAll: () => [], querySelector: () => null
    },
    window: { scrollTo() {}, print() {}, open() {} },
    setTimeout: () => {}, confirm: () => true,
    crypto: globalThis.crypto, btoa: globalThis.btoa, atob: globalThis.atob,
    TextEncoder, console
  };
  sandbox.globalThis = sandbox;
  vm.createContext(sandbox);
  const dir = path.join(__dirname, '..', 'js');
  const code = ['data.js', 'auth.js', 'voice.js', 'app.js'].map(f => fs.readFileSync(path.join(dir, f), 'utf8')).join('\n') + `
;({ UI, SYMS, PATTERNS, Auth, Voice, analyze, loadDemo, startSession, logout, guestLogin, deleteAccount, submitAuth, render, T,
   get user(){return user}, get entries(){return entries},
   setEntries(a){entries=a}, loadExample, removeSample, hasSample, setAge(v){age=v;prof=v?Object.assign(PROF0(),{lpUnknown:true,miss:'unsure',menUnknown:true,conds:['unsure']}):PROF0()}, setProf(o){prof=Object.assign(PROF0(),{menUnknown:true,conds:['unsure']},o)}, get prof(){return prof}, setScope(v){scope=v}, cycleInfo, setToday(){},  calcAge, get age(){return age}, persist, get lastP(){return lastP}, setLastP(v){lastP=v;persistLP()}, setTab(v){tab=v}, setLang(v){lang=v}, setAuthMode(v){authMode=v} })`;
  const api = vm.runInContext(code, sandbox);
  api.els = els; api.ls = sandbox.localStorage;
  return api;
}

/* ---------- tiny test runner ---------- */
let pass = 0, fail = 0;
const t = (name, ok, extra) => { if (ok) pass++; else fail++; console.log((ok ? '  PASS ' : '  FAIL ') + name + (!ok && extra ? '  -> ' + extra : '')); };
const section = n => console.log('\n' + n);

/* ---------- helpers to build logs ---------- */
const day = n => { const d = new Date(Date.UTC(2026, 0, 1 + n)); return d.toISOString().slice(0, 10); };
function build(days, fn) {
  return Array.from({ length: days }, (_, i) => Object.assign(
    { date: day(i), periodStart: false, flow: 0, pain: 1, energy: 7, mood: 3, syms: [], notes: '' }, fn(i)));
}
const flaggedIds = a => a.pats.filter(p => p.flagged).map(p => p.id);

(async () => {
  const app = loadApp();

  app.setScope('all');
  section('Pattern rules');
  app.setEntries(build(90, i => ({ periodStart: [0, 40, 82].includes(i), syms: i % 3 === 0 ? ['acne'] : (i % 7 === 0 ? ['hairloss'] : []) })));
  let a = app.analyze();
  t('cycle lengths computed from period starts', JSON.stringify(a.cycles) === '[40,42]', JSON.stringify(a.cycles));
  t('PCOS pattern flagged: long irregular cycles + acne', flaggedIds(a).includes('pcos'));

  app.setEntries(build(40, i => ({ flow: [3, 12, 13].includes(i) ? 3 : 0, energy: 3, syms: i % 2 === 0 ? ['fatigue'] : (i % 5 === 0 ? ['dizzy'] : []) })));
  a = app.analyze();
  t('iron pattern flagged: heavy flow + fatigue + dizziness', flaggedIds(a).includes('iron'), JSON.stringify(flaggedIds(a)));

  app.setEntries(build(40, i => ({ pain: [5, 6, 20].includes(i) ? 8 : 2, syms: i % 4 === 0 ? ['painful', 'pelvic'] : [] })));
  a = app.analyze();
  t('severe pain pattern flagged: pain 7+ and painful periods', flaggedIds(a).includes('endo'), JSON.stringify(flaggedIds(a)));

  app.setEntries(build(40, i => ({ syms: i % 3 === 0 ? ['fatigue', 'weight', 'cold', 'hairloss'] : [] })));
  a = app.analyze();
  t('thyroid pattern flagged: 4+ frequent related symptoms', flaggedIds(a).includes('thyroid'), JSON.stringify(flaggedIds(a)));

  app.setEntries(build(60, () => ({})));
  a = app.analyze();
  t('healthy log flags nothing', flaggedIds(a).length === 0, JSON.stringify(flaggedIds(a)));

  app.setEntries(build(3, () => ({ syms: ['acne'] })));
  app.setTab('insights'); app.setLang('en'); app.startSession({ email: 'guest', name: 'Guest', guest: true });
  app.setEntries(build(3, () => ({})));
  app.setTab('insights'); app.render();
  t('no age yet: asks for age first', app.els.app.innerHTML.includes('About you questions'));
  app.setAge(25); app.render();
  t('fewer than 7 days: shows an early-read note, not a block', app.els.app.innerHTML.includes('Early read') && app.els.app.innerHTML.includes('3 day'));
  app.setEntries([]); app.render();
  t('no entries: asks to log today', app.els.app.innerHTML.includes('Log today'));
  app.setAge(0);

  section('Voice keyword matching');
  const m = x => app.Voice.match(x).sort().join(',');
  t('English: "I have a headache and feel tired"', m('I have a headache and feel tired') === 'fatigue,headache', m('I have a headache and feel tired'));
  t('English negation: "no headache but bloating"', m('no headache but bloating') === 'bloat', m('no headache but bloating'));
  t('Kannada: ತಲೆನೋವು ಮತ್ತು ಆಯಾಸ', m('ನನಗೆ ತಲೆನೋವು ಮತ್ತು ಆಯಾಸ ಇದೆ') === 'fatigue,headache', m('ನನಗೆ ತಲೆನೋವು ಮತ್ತು ಆಯಾಸ ಇದೆ'));
  t('Kannada: ಮೊಡವೆ + ಕೂದಲು ಉದುರುವಿಕೆ', m('ಮೊಡವೆ ಮತ್ತು ಕೂದಲು ಉದುರುವಿಕೆ') === 'acne,hairloss', m('ಮೊಡವೆ ಮತ್ತು ಕೂದಲು ಉದುರುವಿಕೆ'));
  t('unrelated text matches nothing', m('the weather is nice today') === '');

  section('Translations and data integrity');
  const missing = [];
  Object.keys(app.UI.en).forEach(k => { if (!(k in app.UI.kn)) missing.push('kn:' + k); });
  Object.keys(app.UI.kn).forEach(k => { if (!(k in app.UI.en)) missing.push('en:' + k); });
  t('every UI string exists in English and Kannada', missing.length === 0, missing.join(', '));
  t('privacy bullets match in both languages', app.UI.en.pText.length === app.UI.kn.pText.length);
  t('every symptom has English and Kannada labels', Object.values(app.SYMS).every(s => s.en && s.kn));
  t('every symptom has voice keywords', Object.keys(app.SYMS).every(k => (app.Voice.KW[k] || []).length > 0));
  t('every pattern has EN+KN text, tests and questions', Object.values(app.PATTERNS).every(p =>
    p.name.en && p.name.kn && p.desc.en && p.desc.kn && p.tests.en.length === p.tests.kn.length && p.qs.en.length === p.qs.kn.length && p.qs.en.length > 0));

  section('Age-aware rules');
  const irregLog = syms => build(90, i => ({ periodStart: [0, 40, 82].includes(i), syms: i % 3 === 0 ? syms : [] }));
  app.setEntries(irregLog(['acne', 'hairloss'])); app.setAge(26); a = app.analyze();
  t('age 26: PCOS pattern flagged', flaggedIds(a).includes('pcos') && !a.pats.some(p => p.id === 'teen' || p.id === 'peri'));
  app.setAge(16); a = app.analyze();
  t('age 16: irregular cycles are not read as PCOS', !flaggedIds(a).includes('pcos'));
  t('age 16: early-cycle pattern is shown instead', a.pats.some(p => p.id === 'teen'));
  app.setEntries(irregLog(['hot', 'sleep', 'moodsw'])); app.setAge(50); a = app.analyze();
  t('age 50: perimenopause pattern flagged', flaggedIds(a).includes('peri'), JSON.stringify(flaggedIds(a)));
  t('age 50: irregular cycles are not read as PCOS', !flaggedIds(a).includes('pcos'));
  app.setEntries(irregLog(['acne', 'hairloss'])); app.setAge(30); a = app.analyze();
  t('age 30: no perimenopause pattern', !a.pats.some(p => p.id === 'peri'));
  t('voice recognises hot flushes', app.Voice.match('I have hot flushes and night sweats').includes('hot'));
  app.setAge(0);

  section('Date of birth and flow');
  t('age is calculated from date of birth', (() => { const y = new Date().getFullYear(); return app.calcAge((y - 30) + '-01-01') === 30 || app.calcAge((y - 30) + '-01-01') === 29; })());
  t('impossible dates of birth give no age', app.calcAge('') === 0 && app.calcAge('2026-10-01') === 0);

  section('Cycle-based view');
  const dAgo = n => { const d = new Date(); d.setDate(d.getDate() - n); return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10); };
  app.setAge(28);
  app.setEntries([{ date: dAgo(40), periodStart: true, flow: 2, pain: 2, energy: 6, mood: 3, syms: ['acne'], notes: '' },
    { date: dAgo(10), periodStart: true, flow: 2, pain: 2, energy: 6, mood: 3, syms: [], notes: '' },
    { date: dAgo(2), periodStart: false, flow: 0, pain: 1, energy: 6, mood: 3, syms: ['fatigue'], notes: '' }]);
  app.setScope('cycle'); a = app.analyze();
  t('cycle view counts only days since the last period start', a.n === 2 && a.scope === 'cycle', 'n=' + a.n);
  app.setScope('all'); a = app.analyze();
  t('all-days view counts everything', a.n === 3 && a.scope === 'all');
  const ci = app.cycleInfo(30);
  t('cycle day counts from day 1 of the last period', ci.day === 11 && ci.start === dAgo(10), JSON.stringify(ci));
  t('phase is an estimate from cycle length', ci.phase === 'follicular' || ci.phase === 'ovulation', ci.phase);
  app.setScope('cycle'); app.setAge(0);

  section('Missed periods and last period answers');
  app.setScope('all'); app.setAge(28); app.setEntries(build(20, () => ({}))); app.setLastP(''); 
  a = app.analyze();
  t('not sure: nothing is guessed from missed periods', a.missedN === 0 && !a.pats.find(p => p.id === 'pcos').crit[0].met);
  app.setProf({ lpUnknown: true, miss: 'yes', months: ['2026-08', '2026-09', '2026-10'] }); a = app.analyze();
  t('3 missed months count as irregular cycles', a.missedN === 3 && a.pats.find(p => p.id === 'pcos').crit[0].met);
  app.setProf({ lpUnknown: true, miss: 'no', months: ['2026-08'] }); a = app.analyze();
  t('"no missed periods" ignores any month chips', a.missedN === 0);
  app.setProf({ lpUnknown: true, miss: 'unsure', months: [] }); app.setLastP(dAgo(70)); a = app.analyze();
  t('70 days since last period counts as a long gap', a.pats.find(p => p.id === 'pcos').crit[0].met);
  app.setLastP(''); app.setAge(0); app.setScope('cycle');

  section('Menarche and diagnosed conditions');
  app.setScope('all'); app.setAge(28); app.setEntries(irregLog(['acne']));
  app.setProf({ lpUnknown: true, miss: 'unsure', menarche: 12, menUnknown: false, conds: ['none'] }); a = app.analyze();
  t('normal start: PCOS flagged as before', flaggedIds(a).includes('pcos') && a.yrs === 16);
  app.setProf({ lpUnknown: true, miss: 'unsure', menarche: 16, menUnknown: false, conds: ['none'] }); a = app.analyze();
  const lm = a.pats.find(p => p.id === 'pcos').crit.find(c => c.text.en.includes('late'));
  t('late first period (16) counts as a PCOS context sign', lm && lm.met);
  app.setAge(19); app.setProf({ lpUnknown: true, miss: 'unsure', menarche: 18, menUnknown: false, conds: ['none'] }); a = app.analyze();
  t('within 2 years of the first period: irregular cycles not read as PCOS', !flaggedIds(a).includes('pcos') && a.pats.some(p => p.id === 'teen'), JSON.stringify(flaggedIds(a)));
  app.setAge(28); app.setEntries(build(20, i => ({ syms: i % 2 === 0 ? ['fatigue', 'cold'] : [] })));
  app.setProf({ lpUnknown: true, miss: 'unsure', menarche: 13, menUnknown: false, conds: ['thyroid'] }); a = app.analyze();
  const th = a.pats.find(p => p.id === 'thyroid');
  t('diagnosed thyroid + some matching signs: card shown with known note', th.known && th.flagged);
  app.setProf({ lpUnknown: true, miss: 'unsure', menarche: 13, menUnknown: false, conds: ['none'] }); a = app.analyze();
  t('same signs without a diagnosis: not flagged', !a.pats.find(p => p.id === 'thyroid').flagged);
  app.setAge(28); app.setProf({ lpUnknown: true, miss: 'unsure', menUnknown: false, menarche: 0, conds: [] });
  app.setTab('insights'); app.setLang('en'); app.render();
  t('profile gate also needs first-period age and conditions', app.els.app.innerHTML.includes('About you questions'));
  app.setAge(0); app.setScope('cycle');

  section('Last-3-months answers give insights on day 1');
  app.setScope('all'); app.setAge(28); app.setEntries([]);
  app.setProf({ lpUnknown: true, miss: 'unsure', menarche: 13, menUnknown: false, conds: ['none'], base: { done: true, len: 48, reg: 'irregular', pain: 3, flow: 'medium', syms: { acne: 2, hairloss: 2, weight: 1 } } });
  a = app.analyze();
  t('no daily logs yet: PCOS pattern found from history alone', a.n === 0 && flaggedIds(a).includes('pcos'), JSON.stringify(flaggedIds(a)));
  t('self-reported cycle length shows as a criterion', a.pats.find(p => p.id === 'pcos').crit[0].text.en.includes('48'));
  t('stats use the self-reported cycle length', a.avgCycle === 48);
  app.setEntries(build(14, () => ({ syms: [] }))); a = app.analyze();
  t('after 14 clean logged days the logs take over from the history', !flaggedIds(a).includes('pcos') || a.freq.acne < 0.1, 'acne=' + a.freq.acne);
  app.setProf({ lpUnknown: true, miss: 'unsure', menarche: 13, menUnknown: false, conds: ['none'], base: { done: true, len: 28, reg: 'regular', pain: 8, flow: 'heavy', syms: { painful: 2, pelvic: 2, fatigue: 2 } } });
  app.setEntries([]); a = app.analyze();
  t('severe pain + heavy flow history: pain pattern found on day 1', flaggedIds(a).includes('endo'), JSON.stringify(flaggedIds(a)));
  app.setProf({ lpUnknown: true, miss: 'unsure', menarche: 13, menUnknown: false, conds: ['none'], base: { done: true, len: 0, reg: '', pain: null, flow: '', syms: { acne: 2 } } });
  app.setTab('insights'); app.setLang('en'); app.render();
  t('insights screen opens with history only and no logs', app.els.app.innerHTML.includes('last-3-months') || app.els.app.innerHTML.includes('Early read'));
  app.setAge(0); app.setScope('cycle');

  section('One-tap example profiles for judges');
  app.setScope('all');
  [['pcos', 'pcos'], ['iron', 'iron'], ['peri', 'peri']].forEach(([k, want]) => {
    app.loadExample(k); a = app.analyze();
    t(`example "${k}" shows the ${want} pattern straight away`, a.n === 0 && flaggedIds(a).includes(want), JSON.stringify(flaggedIds(a)));
  });
  app.loadExample('peri'); a = app.analyze();
  t('perimenopause example is not read as PCOS', !flaggedIds(a).includes('pcos'));
  t('examples open in a guest session that is wiped on logout', app.user.guest); app.logout();
  app.setAge(0); app.setScope('cycle');

  section('Cycle story from the answers');
  app.startSession({ email: 'guest', name: 'Guest', guest: true });
  app.setScope('all'); app.setAge(28); app.setEntries([]);
  const withReg = (reg, extra) => app.setProf(Object.assign({ lpUnknown: true, miss: 'no', menarche: 13, menUnknown: false, conds: ['none'], base: { done: true, len: 28, reg, irrAge: 0, pain: 2, flow: 'medium', syms: {} } }, extra || {}));
  const story = () => { app.setTab('insights'); app.setLang('en'); app.render(); return app.els.app.innerHTML; };
  withReg('regular'); let h = story();
  t('regular since first period: story says so', h.includes('Regular since your first period') && h.includes('less likely'));
  t('regular since first period: PCOS cycle sign not met', !app.analyze().pats.find(p => p.id === 'pcos').crit[0].met);
  withReg('start'); h = story();
  t('irregular since the start: story and PCOS cycle sign', h.includes('Irregular since the start') && app.analyze().pats.find(p => p.id === 'pcos').crit[0].met);
  withReg('later'); h = story();
  t('regular then irregular: story says a change is worth a check', h.includes('became irregular') && h.includes('worth a check'));
  withReg('regular', { miss: 'yes', months: ['2026-08', '2026-09'] }); h = story();
  t('regular but 2 missed months: mixed story', h.includes('recent missed periods'));
  app.setAge(0); app.setScope('cycle');

  section('Registration and login');
  const reset = () => { app.ls._s && Object.keys(app.ls._s).forEach(k => delete app.ls._s[k]); };
  reset(); app.logout();
  let r = await app.Auth.register({ name: 'A', email: 'x@y.com', password: 'abc12345', confirm: 'abc12345', consent: true }); t('short name rejected', r.err === 'aErrName');
  r = await app.Auth.register({ name: 'Asha', email: 'bad', password: 'abc12345', confirm: 'abc12345', consent: true }); t('invalid email rejected', r.err === 'aErrEmail');
  r = await app.Auth.register({ name: 'Asha', email: 'asha@x.com', password: 'abcdefgh', confirm: 'abcdefgh', consent: true }); t('password without a number rejected', r.err === 'aErrPass');
  r = await app.Auth.register({ name: 'Asha', email: 'asha@x.com', password: 'abc12345', confirm: 'abc12346', consent: true }); t('password mismatch rejected', r.err === 'aErrMatch');
  r = await app.Auth.register({ name: 'Asha', email: 'asha@x.com', password: 'abc12345', confirm: 'abc12345', consent: false }); t('missing consent rejected', r.err === 'aErrConsent');
  r = await app.Auth.register({ name: 'Asha Rao', email: 'Asha@X.com', password: 'Pink2026pw', confirm: 'Pink2026pw', consent: true });
  t('valid registration succeeds and normalises email', r.ok && r.user.email === 'asha@x.com');
  const rec = JSON.parse(app.ls.getItem('sakhi_users_v1'))['asha@x.com'];
  t('password is never stored in plain text', !JSON.stringify(rec).includes('Pink2026pw') && rec.hash.length > 20 && rec.salt.length > 10);
  r = await app.Auth.register({ name: 'Asha', email: 'ASHA@x.com', password: 'Pink2026pw', confirm: 'Pink2026pw', consent: true }); t('duplicate email rejected (any case)', r.err === 'aErrTaken');
  app.Auth.logout();
  r = await app.Auth.login({ email: 'asha@x.com', password: 'wrong1234' }); t('wrong password rejected', r.err === 'aErrLogin');
  r = await app.Auth.login({ email: 'nobody@x.com', password: 'wrong1234' }); t('unknown email gives the same error', r.err === 'aErrLogin');
  for (let i = 0; i < 3; i++) await app.Auth.login({ email: 'asha@x.com', password: 'wrong1234' });
  r = await app.Auth.login({ email: 'asha@x.com', password: 'wrong1234' }); t('5th wrong attempt locks the account for 30s', r.err === 'aErrLocked' && r.wait === 30);
  r = await app.Auth.login({ email: 'asha@x.com', password: 'Pink2026pw' }); t('correct password still blocked while locked', r.err === 'aErrLocked');
  const f = JSON.parse(app.ls.getItem('sakhi_fails_v1')); f['asha@x.com'].until = 0; app.ls.setItem('sakhi_fails_v1', JSON.stringify(f));
  r = await app.Auth.login({ email: 'asha@x.com', password: 'Pink2026pw', remember: true }); t('login works once the lock expires', r.ok);

  section('Accounts keep data separate');
  app.startSession(r.user);
  app.setEntries([{ date: '2026-10-20', periodStart: true, flow: 2, pain: 3, energy: 5, mood: 3, syms: ['fatigue'], notes: '' }]); app.persist();
  app.setLastP('2026-09-22');
  app.loadDemo();
  t('sample data in a real account keeps the real entry and flags the sample', app.entries.length > 80 && app.entries.filter(x => !x.sample).length === 1 && app.hasSample());
  app.removeSample();
  t('removing sample data leaves only the real entry', app.entries.length === 1 && !app.hasSample());
  t('a real account starts with no assumed data', true);
  app.logout(); app.guestLogin(); app.loadDemo();
  t('guest can preview 90 days of sample data', app.entries.length === 90);
  app.logout(); app.guestLogin();
  t('guest starts empty and cannot see Asha\'s data', app.user.guest && app.entries.length === 0 && app.lastP === '');
  app.logout();
  r = await app.Auth.register({ name: 'Meera', email: 'meera@x.com', password: 'Rose2026ok', confirm: 'Rose2026ok', consent: true });
  app.startSession(r.user); t('new account starts empty', app.entries.length === 0);
  app.deleteAccount();
  t('deleting an account logs out and removes it', !app.user && !JSON.parse(app.ls.getItem('sakhi_users_v1'))['meera@x.com']);
  r = await app.Auth.login({ email: 'meera@x.com', password: 'Rose2026ok' }); t('deleted account cannot log in', r.err === 'aErrLogin');
  t('other accounts keep their data', !!app.ls.getItem('sakhi_entries_v1_asha@x.com'));

  section('Last period date');
  r = await app.Auth.login({ email: 'asha@x.com', password: 'Pink2026pw' }); app.startSession(r.user);
  t('last period date is remembered per account', app.lastP === '2026-09-22');
  const a1 = app.analyze();
  t('last period date counts as a cycle start', a1.starts.length === 2 && a1.cycles[0] === 28);
  app.setEntries([]); app.setLastP('');
  t('nothing is assumed when no date is given', app.analyze().starts.length === 0 && app.analyze().n === 0);
  app.setEntries([{ date: '2026-10-20', periodStart: true, flow: 2, pain: 3, energy: 5, mood: 3, syms: [], notes: '' }]); app.persist();

  section('Every screen renders in English and Kannada');
  r = await app.Auth.login({ email: 'asha@x.com', password: 'Pink2026pw' }); app.startSession(r.user);
  app.setAge(30);
  let ok = true, err = '';
  try {
    ['log', 'insights', 'report', 'privacy'].forEach(tab => ['en', 'kn'].forEach(l => { app.setTab(tab); app.setLang(l); app.render(); }));
    ['register', 'login'].forEach(mode => ['en', 'kn'].forEach(l => { app.logout(); app.setAuthMode(mode); app.setLang(l); app.render(); }));
  } catch (e) { ok = false; err = e.message; }
  t('no errors across all screens and both languages', ok, err);

  console.log(`\n${pass} passed, ${fail} failed`);
  process.exit(fail ? 1 : 0);
})();
