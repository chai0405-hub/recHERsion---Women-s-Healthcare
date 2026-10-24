/* Sakhi Health - static data: symptoms, UI strings (EN/KN), pattern definitions */
/* ---------- data & i18n ---------- */
const SYMS={
  irregular:{en:'Irregular periods',kn:'ಅನಿಯಮಿತ ಮುಟ್ಟು'},
  acne:{en:'Acne',kn:'ಮೊಡವೆ'},
  hair:{en:'Excess hair growth',kn:'ಅತಿಯಾದ ಕೂದಲು ಬೆಳವಣಿಗೆ'},
  hairloss:{en:'Hair loss',kn:'ಕೂದಲು ಉದುರುವಿಕೆ'},
  weight:{en:'Weight gain',kn:'ತೂಕ ಹೆಚ್ಚಳ'},
  fatigue:{en:'Fatigue',kn:'ಆಯಾಸ'},
  dizzy:{en:'Dizziness',kn:'ತಲೆತಿರುಗುವಿಕೆ'},
  pale:{en:'Pale skin',kn:'ಮಸುಕಾದ ಚರ್ಮ'},
  cold:{en:'Feeling cold often',kn:'ಆಗಾಗ ಚಳಿ ಅನಿಸುವುದು'},
  pelvic:{en:'Pelvic pain',kn:'ಸೊಂಟದ ಕೆಳಭಾಗದ ನೋವು'},
  painful:{en:'Painful periods',kn:'ನೋವಿನ ಮುಟ್ಟು'},
  bloat:{en:'Bloating',kn:'ಹೊಟ್ಟೆ ಉಬ್ಬರ'},
  headache:{en:'Headache',kn:'ತಲೆನೋವು'},
  palp:{en:'Palpitations',kn:'ಎದೆ ಬಡಿತ ಹೆಚ್ಚಳ'},
  moodsw:{en:'Mood swings',kn:'ಮನಸ್ಥಿತಿ ಬದಲಾವಣೆ'},
  sleep:{en:'Poor sleep',kn:'ನಿದ್ರೆಯ ತೊಂದರೆ'}
};
const UI={
 en:{tagline:'Track symptoms. Spot patterns. Talk to your doctor with confidence.',tLog:'Log',tIns:'Insights',tRep:'Doctor report',tPriv:'Privacy',
  date:'Date',period:'Period started today',flow:'Flow',f0:'None',f1:'Light',f2:'Medium',f3:'Heavy',pain:'Pain',energy:'Energy',mood:'Mood',syms:'Symptoms today',notes:'Notes (optional)',
  save:'Save entry',saved:'Entry saved',demoLoaded:'Demo data loaded',demo:'Load demo data (90 days)',clear:'Delete all my data',confirmClear:'Delete all data from this device?',cleared:'All data deleted',
  recent:'Recent entries (tap to edit)',noEntries:'No entries yet. Log today or load demo data.',need:'Log at least 7 days to see patterns.',
  days:'Days logged',avgCycle:'Avg cycle (days)',avgPain:'Avg pain /10',avgEnergy:'Avg energy /10',trend:'Pain (bars) and energy (line), last 60 days. Red dots = period start.',
  flagged:'Patterns worth discussing with a doctor',others:'Other patterns checked (low match)',match:'signs match',noFlag:'No strong pattern found yet. Keep logging for a clearer picture.',
  tests:'Tests doctors commonly consider',ask:'Questions to ask your doctor',disc:'This is not a diagnosis. It highlights patterns to discuss with a qualified doctor.',
  urgent:'Seek urgent care for very heavy bleeding, fainting, sudden severe pain, or pregnancy-related concerns.',
  rTitle:'Health summary for my doctor',rGen:'Generated on',rPeriod:'Period of data',rCycles:'Cycle summary',rNoCycles:'Not enough period start dates logged yet.',
  rCycleTxt:(n,a,mn,mx)=>`${n} cycles logged. Average ${a} days (shortest ${mn}, longest ${mx}).`,rSymp:'Most frequent symptoms',rSympCol:'Symptom',rPct:'% of days',
  rPainTxt:(a,m,h)=>`Average pain ${a}/10, highest ${m}/10, ${h} day(s) with pain 7 or more.`,rHeavy:'Days with heavy flow',print:'Print / Save PDF',wa:'Share on WhatsApp',
  ptitle:'Your privacy comes first',
  pText:['All entries are stored only on this device, in your browser. Nothing is uploaded to any server.','No tracking. Accounts are created on your device only, and passwords are stored as salted hashes, never as plain text.','You can delete everything at any time with one tap.','Insights come from transparent rules you can see, not a black box, and never replace a doctor.'],
  cyc:(a,r)=>`Cycles average ${a} days, varying by ${r} days`},
 kn:{tagline:'ಲಕ್ಷಣಗಳನ್ನು ದಾಖಲಿಸಿ. ಮಾದರಿಗಳನ್ನು ಗುರುತಿಸಿ. ವೈದ್ಯರೊಂದಿಗೆ ವಿಶ್ವಾಸದಿಂದ ಮಾತನಾಡಿ.',tLog:'ದಾಖಲೆ',tIns:'ಒಳನೋಟಗಳು',tRep:'ವೈದ್ಯರ ವರದಿ',tPriv:'ಗೌಪ್ಯತೆ',
  date:'ದಿನಾಂಕ',period:'ಇಂದು ಮುಟ್ಟು ಪ್ರಾರಂಭವಾಯಿತು',flow:'ರಕ್ತಸ್ರಾವ',f0:'ಇಲ್ಲ',f1:'ಕಡಿಮೆ',f2:'ಮಧ್ಯಮ',f3:'ಹೆಚ್ಚು',pain:'ನೋವು',energy:'ಶಕ್ತಿ',mood:'ಮನಸ್ಥಿತಿ',syms:'ಇಂದಿನ ಲಕ್ಷಣಗಳು',notes:'ಟಿಪ್ಪಣಿಗಳು (ಐಚ್ಛಿಕ)',
  save:'ದಾಖಲೆ ಉಳಿಸಿ',saved:'ದಾಖಲೆ ಉಳಿಸಲಾಗಿದೆ',demoLoaded:'ಮಾದರಿ ಡೇಟಾ ಲೋಡ್ ಆಗಿದೆ',demo:'ಮಾದರಿ ಡೇಟಾ ಲೋಡ್ ಮಾಡಿ (90 ದಿನ)',clear:'ನನ್ನ ಎಲ್ಲಾ ಡೇಟಾ ಅಳಿಸಿ',confirmClear:'ಈ ಸಾಧನದಿಂದ ಎಲ್ಲಾ ಡೇಟಾ ಅಳಿಸಬೇಕೇ?',cleared:'ಎಲ್ಲಾ ಡೇಟಾ ಅಳಿಸಲಾಗಿದೆ',
  recent:'ಇತ್ತೀಚಿನ ದಾಖಲೆಗಳು (ಬದಲಿಸಲು ಒತ್ತಿ)',noEntries:'ಇನ್ನೂ ದಾಖಲೆಗಳಿಲ್ಲ. ಇಂದಿನದನ್ನು ದಾಖಲಿಸಿ ಅಥವಾ ಮಾದರಿ ಡೇಟಾ ಲೋಡ್ ಮಾಡಿ.',need:'ಮಾದರಿಗಳನ್ನು ನೋಡಲು ಕನಿಷ್ಠ 7 ದಿನ ದಾಖಲಿಸಿ.',
  days:'ದಾಖಲಿಸಿದ ದಿನಗಳು',avgCycle:'ಸರಾಸರಿ ಚಕ್ರ (ದಿನ)',avgPain:'ಸರಾಸರಿ ನೋವು /10',avgEnergy:'ಸರಾಸರಿ ಶಕ್ತಿ /10',trend:'ನೋವು (ಕಂಬ) ಮತ್ತು ಶಕ್ತಿ (ಗೆರೆ), ಕಳೆದ 60 ದಿನ. ಕೆಂಪು ಚುಕ್ಕೆ = ಮುಟ್ಟು ಪ್ರಾರಂಭ.',
  flagged:'ವೈದ್ಯರೊಂದಿಗೆ ಚರ್ಚಿಸಬೇಕಾದ ಮಾದರಿಗಳು',others:'ಪರಿಶೀಲಿಸಿದ ಇತರ ಮಾದರಿಗಳು (ಕಡಿಮೆ ಹೊಂದಾಣಿಕೆ)',match:'ಲಕ್ಷಣಗಳು ಹೊಂದುತ್ತವೆ',noFlag:'ಇನ್ನೂ ಬಲವಾದ ಮಾದರಿ ಕಂಡುಬಂದಿಲ್ಲ. ಸ್ಪಷ್ಟ ಚಿತ್ರಕ್ಕಾಗಿ ದಾಖಲಿಸುತ್ತಿರಿ.',
  tests:'ವೈದ್ಯರು ಸಾಮಾನ್ಯವಾಗಿ ಪರಿಗಣಿಸುವ ಪರೀಕ್ಷೆಗಳು',ask:'ವೈದ್ಯರಿಗೆ ಕೇಳಬೇಕಾದ ಪ್ರಶ್ನೆಗಳು',disc:'ಇದು ರೋಗನಿರ್ಣಯವಲ್ಲ. ಅರ್ಹ ವೈದ್ಯರೊಂದಿಗೆ ಚರ್ಚಿಸಬೇಕಾದ ಮಾದರಿಗಳನ್ನು ಇದು ತೋರಿಸುತ್ತದೆ.',
  urgent:'ತುಂಬಾ ಹೆಚ್ಚು ರಕ್ತಸ್ರಾವ, ಮೂರ್ಛೆ, ಹಠಾತ್ ತೀವ್ರ ನೋವು ಅಥವಾ ಗರ್ಭಧಾರಣೆ ಸಂಬಂಧಿತ ಸಮಸ್ಯೆ ಇದ್ದರೆ ತಕ್ಷಣ ವೈದ್ಯಕೀಯ ಸಹಾಯ ಪಡೆಯಿರಿ.',
  rTitle:'ನನ್ನ ವೈದ್ಯರಿಗಾಗಿ ಆರೋಗ್ಯ ಸಾರಾಂಶ',rGen:'ತಯಾರಿಸಿದ ದಿನಾಂಕ',rPeriod:'ಡೇಟಾ ಅವಧಿ',rCycles:'ಮುಟ್ಟಿನ ಚಕ್ರದ ಸಾರಾಂಶ',rNoCycles:'ಸಾಕಷ್ಟು ಮುಟ್ಟು ಪ್ರಾರಂಭ ದಿನಾಂಕಗಳನ್ನು ದಾಖಲಿಸಿಲ್ಲ.',
  rCycleTxt:(n,a,mn,mx)=>`${n} ಚಕ್ರಗಳು ದಾಖಲಾಗಿವೆ. ಸರಾಸರಿ ${a} ದಿನ (ಕನಿಷ್ಠ ${mn}, ಗರಿಷ್ಠ ${mx}).`,rSymp:'ಹೆಚ್ಚು ಬಾರಿ ಕಂಡ ಲಕ್ಷಣಗಳು',rSympCol:'ಲಕ್ಷಣ',rPct:'% ದಿನಗಳು',
  rPainTxt:(a,m,h)=>`ಸರಾಸರಿ ನೋವು ${a}/10, ಗರಿಷ್ಠ ${m}/10, 7 ಅಥವಾ ಹೆಚ್ಚು ನೋವಿದ್ದ ದಿನಗಳು: ${h}.`,rHeavy:'ಹೆಚ್ಚು ರಕ್ತಸ್ರಾವದ ದಿನಗಳು',print:'ಮುದ್ರಿಸಿ / PDF ಉಳಿಸಿ',wa:'WhatsApp ನಲ್ಲಿ ಹಂಚಿ',
  ptitle:'ನಿಮ್ಮ ಗೌಪ್ಯತೆಗೆ ಮೊದಲ ಆದ್ಯತೆ',
  pText:['ಎಲ್ಲಾ ದಾಖಲೆಗಳು ಈ ಸಾಧನದ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಮಾತ್ರ ಸಂಗ್ರಹವಾಗುತ್ತವೆ. ಯಾವುದೇ ಸರ್ವರ್‌ಗೆ ಏನನ್ನೂ ಕಳುಹಿಸಲಾಗುವುದಿಲ್ಲ.','ಟ್ರ್ಯಾಕಿಂಗ್ ಇಲ್ಲ. ಖಾತೆಗಳು ನಿಮ್ಮ ಸಾಧನದಲ್ಲಿ ಮಾತ್ರ ರಚನೆಯಾಗುತ್ತವೆ; ಪಾಸ್‌ವರ್ಡ್‌ಗಳನ್ನು ಸಾಲ್ಟ್ ಹ್ಯಾಶ್ ರೂಪದಲ್ಲಿ ಸಂಗ್ರಹಿಸಲಾಗುತ್ತದೆ, ಸರಳ ಪಠ್ಯದಲ್ಲಿ ಅಲ್ಲ.','ಒಂದೇ ಒತ್ತಿನಲ್ಲಿ ಯಾವಾಗ ಬೇಕಾದರೂ ಎಲ್ಲವನ್ನೂ ಅಳಿಸಬಹುದು.','ಒಳನೋಟಗಳು ನೀವು ನೋಡಬಹುದಾದ ಪಾರದರ್ಶಕ ನಿಯಮಗಳಿಂದ ಬರುತ್ತವೆ; ಇವು ವೈದ್ಯರಿಗೆ ಪರ್ಯಾಯವಲ್ಲ.'],
  cyc:(a,r)=>`ಚಕ್ರ ಸರಾಸರಿ ${a} ದಿನ, ${r} ದಿನಗಳ ವ್ಯತ್ಯಾಸ`}
};
const PATTERNS={
 pcos:{
  name:{en:'PCOS / hormonal pattern',kn:'ಪಿಸಿಓಎಸ್ / ಹಾರ್ಮೋನ್ ಮಾದರಿ'},
  desc:{en:'Irregular cycles together with acne, excess hair, hair loss or weight changes are commonly discussed with a doctor as possible PCOS.',kn:'ಅನಿಯಮಿತ ಮುಟ್ಟು ಮತ್ತು ಮೊಡವೆ, ಅತಿಯಾದ ಕೂದಲು, ಕೂದಲು ಉದುರುವಿಕೆ ಅಥವಾ ತೂಕ ಬದಲಾವಣೆ ಒಟ್ಟಿಗೆ ಇದ್ದರೆ ಪಿಸಿಓಎಸ್ ಬಗ್ಗೆ ವೈದ್ಯರೊಂದಿಗೆ ಚರ್ಚಿಸುವುದು ಸಾಮಾನ್ಯ.'},
  tests:{en:['Hormone panel (LH, FSH, testosterone, prolactin)','TSH (thyroid)','Pelvic ultrasound','Fasting glucose / insulin'],kn:['ಹಾರ್ಮೋನ್ ಪರೀಕ್ಷೆ (LH, FSH, ಟೆಸ್ಟೋಸ್ಟೆರಾನ್, ಪ್ರೊಲ್ಯಾಕ್ಟಿನ್)','TSH (ಥೈರಾಯ್ಡ್)','ಹೊಟ್ಟೆಯ ಕೆಳಭಾಗದ ಅಲ್ಟ್ರಾಸೌಂಡ್','ಉಪವಾಸ ಗ್ಲೂಕೋಸ್ / ಇನ್ಸುಲಿನ್']},
  qs:{en:['Could my irregular cycles point to PCOS?','Which tests should I get, and on which day of my cycle?','How can lifestyle changes or treatment help my symptoms?'],kn:['ನನ್ನ ಅನಿಯಮಿತ ಮುಟ್ಟು ಪಿಸಿಓಎಸ್‌ನ ಲಕ್ಷಣವಾಗಿರಬಹುದೇ?','ಯಾವ ಪರೀಕ್ಷೆಗಳನ್ನು ಮಾಡಿಸಬೇಕು ಮತ್ತು ಮುಟ್ಟಿನ ಯಾವ ದಿನ?','ಜೀವನಶೈಲಿ ಬದಲಾವಣೆ ಅಥವಾ ಚಿಕಿತ್ಸೆ ನನ್ನ ಲಕ್ಷಣಗಳಿಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡುತ್ತದೆ?']}},
 iron:{
  name:{en:'Possible iron deficiency / anaemia pattern',kn:'ರಕ್ತಹೀನತೆ (ಕಬ್ಬಿಣದ ಕೊರತೆ) ಮಾದರಿ'},
  desc:{en:'Heavy bleeding with tiredness, dizziness or paleness is a common reason doctors check iron levels.',kn:'ಹೆಚ್ಚು ರಕ್ತಸ್ರಾವದ ಜೊತೆ ಆಯಾಸ, ತಲೆತಿರುಗುವಿಕೆ ಅಥವಾ ಮಸುಕಾದ ಚರ್ಮ ಇದ್ದರೆ ವೈದ್ಯರು ಕಬ್ಬಿಣದ ಮಟ್ಟ ಪರೀಕ್ಷಿಸುತ್ತಾರೆ.'},
  tests:{en:['Complete blood count (CBC)','Serum ferritin and iron studies','Vitamin B12 / folate'],kn:['ಸಂಪೂರ್ಣ ರಕ್ತ ಪರೀಕ್ಷೆ (CBC)','ಸೀರಮ್ ಫೆರಿಟಿನ್ ಮತ್ತು ಕಬ್ಬಿಣ ಪರೀಕ್ಷೆ','ವಿಟಮಿನ್ B12 / ಫೋಲೇಟ್']},
  qs:{en:['Should my iron and haemoglobin be tested?','Is my bleeding heavier than normal?','What diet or supplements are right for me?'],kn:['ನನ್ನ ಕಬ್ಬಿಣ ಮತ್ತು ಹಿಮೋಗ್ಲೋಬಿನ್ ಪರೀಕ್ಷಿಸಬೇಕೇ?','ನನ್ನ ರಕ್ತಸ್ರಾವ ಸಾಮಾನ್ಯಕ್ಕಿಂತ ಹೆಚ್ಚಿದೆಯೇ?','ನನಗೆ ಯಾವ ಆಹಾರ ಅಥವಾ ಪೂರಕಗಳು ಸೂಕ್ತ?']}},
 endo:{
  name:{en:'Severe period / pelvic pain pattern (possible endometriosis)',kn:'ತೀವ್ರ ಮುಟ್ಟಿನ / ಸೊಂಟದ ನೋವಿನ ಮಾದರಿ (ಎಂಡೋಮೆಟ್ರಿಯೋಸಿಸ್ ಸಾಧ್ಯತೆ)'},
  desc:{en:'Severe or recurring pelvic and period pain is often dismissed, but it deserves a proper evaluation.',kn:'ತೀವ್ರ ಅಥವಾ ಮತ್ತೆ ಮತ್ತೆ ಬರುವ ಸೊಂಟದ ಕೆಳಭಾಗ ಮತ್ತು ಮುಟ್ಟಿನ ನೋವನ್ನು ಅಲಕ್ಷಿಸಬಾರದು; ಸರಿಯಾದ ತಪಾಸಣೆ ಅಗತ್ಯ.'},
  tests:{en:['Pelvic examination','Pelvic / transvaginal ultrasound','Referral to a gynaecologist for further evaluation'],kn:['ಸೊಂಟದ ಕೆಳಭಾಗದ ಪರೀಕ್ಷೆ','ಅಲ್ಟ್ರಾಸೌಂಡ್ ಸ್ಕ್ಯಾನ್','ಹೆಚ್ಚಿನ ತಪಾಸಣೆಗಾಗಿ ಸ್ತ್ರೀರೋಗ ತಜ್ಞರ ಶಿಫಾರಸು']},
  qs:{en:['Could this pain be more than normal period pain?','Which scan or specialist do I need?','What pain management options exist?'],kn:['ಇದು ಸಾಮಾನ್ಯ ಮುಟ್ಟಿನ ನೋವಿಗಿಂತ ಹೆಚ್ಚಿರಬಹುದೇ?','ನನಗೆ ಯಾವ ಸ್ಕ್ಯಾನ್ ಅಥವಾ ತಜ್ಞರು ಬೇಕು?','ನೋವು ನಿರ್ವಹಣೆಗೆ ಯಾವ ಆಯ್ಕೆಗಳಿವೆ?']}},
 thyroid:{
  name:{en:'Possible thyroid pattern',kn:'ಥೈರಾಯ್ಡ್ ಮಾದರಿ'},
  desc:{en:'A mix of tiredness, weight change, feeling cold, hair loss, mood changes or palpitations is a common reason to check thyroid function.',kn:'ಆಯಾಸ, ತೂಕ ಬದಲಾವಣೆ, ಚಳಿ, ಕೂದಲು ಉದುರುವಿಕೆ, ಮನಸ್ಥಿತಿ ಬದಲಾವಣೆ ಅಥವಾ ಎದೆ ಬಡಿತ ಒಟ್ಟಿಗೆ ಇದ್ದರೆ ಥೈರಾಯ್ಡ್ ಪರೀಕ್ಷೆ ಮಾಡಿಸುವುದು ಸಾಮಾನ್ಯ.'},
  tests:{en:['TSH, free T3 / T4','Anti-TPO antibodies (if advised)'],kn:['TSH, ಫ್ರೀ T3 / T4','Anti-TPO ಪರೀಕ್ಷೆ (ವೈದ್ಯರು ಸೂಚಿಸಿದರೆ)']},
  qs:{en:['Should my thyroid be tested?','Could my symptoms be linked to my thyroid?'],kn:['ನನ್ನ ಥೈರಾಯ್ಡ್ ಪರೀಕ್ಷಿಸಬೇಕೇ?','ನನ್ನ ಲಕ್ಷಣಗಳು ಥೈರಾಯ್ಡ್‌ಗೆ ಸಂಬಂಧಿಸಿರಬಹುದೇ?']}}
};
