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
  sleep:{en:'Poor sleep',kn:'ನಿದ್ರೆಯ ತೊಂದರೆ'},
  hot:{en:'Hot flushes / night sweats',kn:'ಬಿಸಿ ಅಲೆ / ರಾತ್ರಿ ಬೆವರುವಿಕೆ'}
};
const UI={
 en:{tagline:'Track symptoms. Spot patterns. Talk to your doctor with confidence.',tLog:'Log',tIns:'Insights',tRep:'Doctor report',tPriv:'Privacy',
  date:'Date',period:'Period started today',flow:'Flow',f0:'None',f1:'Light',f2:'Medium',f3:'Heavy',pain:'Pain',energy:'Energy',mood:'Mood',syms:'Symptoms today',notes:'Notes (optional)',
  save:'Save entry',saved:'Entry saved',demoLoaded:'Sample data loaded',demo:'Load sample data (demo)',clear:'Delete all my data',confirmClear:'Delete all data from this device?',cleared:'All data deleted',
  recent:'Recent entries (tap to edit)',noEntries:'No entries yet. Log how you feel today.',need:'Log today to see your first insights.',
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
  save:'ದಾಖಲೆ ಉಳಿಸಿ',saved:'ದಾಖಲೆ ಉಳಿಸಲಾಗಿದೆ',demoLoaded:'ಮಾದರಿ ಡೇಟಾ ಲೋಡ್ ಆಗಿದೆ',demo:'ಮಾದರಿ ಡೇಟಾ ಲೋಡ್ ಮಾಡಿ (ಡೆಮೊ)',clear:'ನನ್ನ ಎಲ್ಲಾ ಡೇಟಾ ಅಳಿಸಿ',confirmClear:'ಈ ಸಾಧನದಿಂದ ಎಲ್ಲಾ ಡೇಟಾ ಅಳಿಸಬೇಕೇ?',cleared:'ಎಲ್ಲಾ ಡೇಟಾ ಅಳಿಸಲಾಗಿದೆ',
  recent:'ಇತ್ತೀಚಿನ ದಾಖಲೆಗಳು (ಬದಲಿಸಲು ಒತ್ತಿ)',noEntries:'ಇನ್ನೂ ದಾಖಲೆಗಳಿಲ್ಲ. ಇಂದು ನಿಮಗೆ ಹೇಗನಿಸುತ್ತಿದೆ ಎಂದು ದಾಖಲಿಸಿ.',need:'ಮಾದರಿಗಳನ್ನು ನೋಡಲು ಕನಿಷ್ಠ 7 ದಿನ ದಾಖಲಿಸಿ.',
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
  qs:{en:['Should my thyroid be tested?','Could my symptoms be linked to my thyroid?'],kn:['ನನ್ನ ಥೈರಾಯ್ಡ್ ಪರೀಕ್ಷಿಸಬೇಕೇ?','ನನ್ನ ಲಕ್ಷಣಗಳು ಥೈರಾಯ್ಡ್‌ಗೆ ಸಂಬಂಧಿಸಿರಬಹುದೇ?']}},
 teen:{
  name:{en:'Early-cycle years (teen) pattern',kn:'ಆರಂಭಿಕ ಮುಟ್ಟಿನ ವರ್ಷಗಳ (ಹದಿಹರೆಯ) ಮಾದರಿ'},
  desc:{en:'In the first 2 to 3 years after periods start, irregular cycles are common and usually settle. Very long or short cycles, severe pain or heavy bleeding are still worth checking with a doctor.',kn:'ಮುಟ್ಟು ಪ್ರಾರಂಭವಾದ ಮೊದಲ 2-3 ವರ್ಷಗಳಲ್ಲಿ ಅನಿಯಮಿತ ಚಕ್ರ ಸಾಮಾನ್ಯ ಮತ್ತು ಸಾಮಾನ್ಯವಾಗಿ ಸರಿಹೋಗುತ್ತದೆ. ಆದರೆ ತುಂಬಾ ಉದ್ದ ಅಥವಾ ಚಿಕ್ಕ ಚಕ್ರ, ತೀವ್ರ ನೋವು ಅಥವಾ ಹೆಚ್ಚು ರಕ್ತಸ್ರಾವ ಇದ್ದರೆ ವೈದ್ಯರನ್ನು ಕಾಣಿ.'},
  tests:{en:['Doctor review of cycle history','Complete blood count (CBC) if bleeding is heavy','Thyroid test (TSH) if advised'],kn:['ವೈದ್ಯರಿಂದ ಮುಟ್ಟಿನ ಇತಿಹಾಸದ ಪರಿಶೀಲನೆ','ರಕ್ತಸ್ರಾವ ಹೆಚ್ಚಿದ್ದರೆ ರಕ್ತ ಪರೀಕ್ಷೆ (CBC)','ವೈದ್ಯರು ಸೂಚಿಸಿದರೆ ಥೈರಾಯ್ಡ್ (TSH)']},
  qs:{en:['Is my cycle length normal for my age?','Is my bleeding or pain more than expected?','When should I come back for a review?'],kn:['ನನ್ನ ವಯಸ್ಸಿಗೆ ನನ್ನ ಚಕ್ರದ ಅವಧಿ ಸಾಮಾನ್ಯವೇ?','ನನ್ನ ರಕ್ತಸ್ರಾವ ಅಥವಾ ನೋವು ನಿರೀಕ್ಷೆಗಿಂತ ಹೆಚ್ಚೇ?','ಮತ್ತೆ ಯಾವಾಗ ತೋರಿಸಬೇಕು?']}},
 peri:{
  name:{en:'Perimenopause / menopause transition pattern',kn:'ಪೆರಿಮೆನೋಪಾಸ್ / ಋತುಬಂಧದ ಹಂತದ ಮಾದರಿ'},
  desc:{en:'From the 40s, changing cycles with hot flushes, poor sleep or mood changes are commonly discussed with a doctor as the menopause transition. Bleeding after 12 months without a period always needs a check.',kn:'40ರ ನಂತರ ಬದಲಾಗುವ ಮುಟ್ಟು, ಬಿಸಿ ಅಲೆ, ನಿದ್ರೆಯ ತೊಂದರೆ ಅಥವಾ ಮನಸ್ಥಿತಿ ಬದಲಾವಣೆ ಇದ್ದರೆ ಋತುಬಂಧದ ಹಂತವೆಂದು ವೈದ್ಯರೊಂದಿಗೆ ಚರ್ಚಿಸುತ್ತಾರೆ. 12 ತಿಂಗಳ ನಂತರ ರಕ್ತಸ್ರಾವವಾದರೆ ಯಾವಾಗಲೂ ತಪಾಸಣೆ ಅಗತ್ಯ.'},
  tests:{en:['Clinical review of symptoms and cycle history','TSH (thyroid can mimic these symptoms)','FSH / hormone tests only if the doctor advises','Haemoglobin if bleeding is heavy'],kn:['ಲಕ್ಷಣಗಳು ಮತ್ತು ಮುಟ್ಟಿನ ಇತಿಹಾಸದ ಪರಿಶೀಲನೆ','TSH (ಥೈರಾಯ್ಡ್ ಇದೇ ಲಕ್ಷಣ ನೀಡಬಹುದು)','ವೈದ್ಯರು ಹೇಳಿದರೆ ಮಾತ್ರ FSH / ಹಾರ್ಮೋನ್ ಪರೀಕ್ಷೆ','ರಕ್ತಸ್ರಾವ ಹೆಚ್ಚಿದ್ದರೆ ಹಿಮೋಗ್ಲೋಬಿನ್']},
  qs:{en:['Are my symptoms part of perimenopause?','Do I need any tests, or can we manage the symptoms first?','Which bleeding changes need urgent review?'],kn:['ನನ್ನ ಲಕ್ಷಣಗಳು ಪೆರಿಮೆನೋಪಾಸ್‌ನ ಭಾಗವೇ?','ಪರೀಕ್ಷೆ ಬೇಕೇ, ಅಥವಾ ಮೊದಲು ಲಕ್ಷಣಗಳನ್ನು ನಿರ್ವಹಿಸಬಹುದೇ?','ಯಾವ ರಕ್ತಸ್ರಾವ ಬದಲಾವಣೆಗೆ ತುರ್ತು ತಪಾಸಣೆ ಬೇಕು?']}}
};

Object.assign(UI.en,{
  lpTitle:'Last period',lpLabel:'When did your last period start?',lpSave:'Save my answers',lpSaved:'Date saved',
  lpHint:'Used to work out your cycle length. Leave it empty if you are not sure; nothing is assumed.',
  lpAgo:n=>n===0?'Started today':n+' day(s) ago',lpNone:'Not set yet'
});
Object.assign(UI.kn,{
  lpTitle:'ಕೊನೆಯ ಮುಟ್ಟು',lpLabel:'ನಿಮ್ಮ ಕೊನೆಯ ಮುಟ್ಟು ಯಾವಾಗ ಪ್ರಾರಂಭವಾಯಿತು?',lpSave:'ನನ್ನ ಉತ್ತರಗಳನ್ನು ಉಳಿಸಿ',lpSaved:'ದಿನಾಂಕ ಉಳಿಸಲಾಗಿದೆ',
  lpHint:'ನಿಮ್ಮ ಚಕ್ರದ ಅವಧಿ ಲೆಕ್ಕಹಾಕಲು ಬಳಸಲಾಗುತ್ತದೆ. ಖಚಿತವಿಲ್ಲದಿದ್ದರೆ ಖಾಲಿ ಬಿಡಿ; ಏನನ್ನೂ ಊಹಿಸುವುದಿಲ್ಲ.',
  lpAgo:n=>n===0?'ಇಂದು ಪ್ರಾರಂಭವಾಯಿತು':n+' ದಿನಗಳ ಹಿಂದೆ',lpNone:'ಇನ್ನೂ ಹೊಂದಿಸಿಲ್ಲ'
});

Object.assign(UI.en,{
  ageTitle:'About you',ageLabel:'Your date of birth',ageHint:'Age changes what is normal: irregular cycles are common in the first years of periods and in the 40s, so the patterns are read differently.',
  ageNeed:'Add your date of birth on the Log tab first. Cycles mean different things at different ages.',rAge:'Age',ageBad:'Enter a valid date of birth (age 9 to 90)',flowHint:'Pain and energy move with your flow as a starting point. Adjust them to how you really feel.',
  cycTeen:'Cycle irregularity (not used as a PCOS sign in the first 2 to 3 years of periods: irregular cycles are common then)',
  cycMeno:'Cycle irregularity (not used as a PCOS sign at 45+: changing cycles are common in the menopause transition)',
  ageCrit:a=>`Age ${a}`,noPeriod12:'No period for 12+ months'
});
Object.assign(UI.kn,{
  ageTitle:'ನಿಮ್ಮ ಬಗ್ಗೆ',ageLabel:'ನಿಮ್ಮ ಜನ್ಮ ದಿನಾಂಕ',ageHint:'ವಯಸ್ಸಿಗೆ ತಕ್ಕಂತೆ ಸಾಮಾನ್ಯ ಬದಲಾಗುತ್ತದೆ: ಮುಟ್ಟಿನ ಆರಂಭದ ವರ್ಷಗಳಲ್ಲಿ ಮತ್ತು 40ರ ನಂತರ ಅನಿಯಮಿತ ಚಕ್ರ ಸಾಮಾನ್ಯ; ಆದ್ದರಿಂದ ಮಾದರಿಗಳನ್ನು ಬೇರೆ ರೀತಿ ಓದಲಾಗುತ್ತದೆ.',
  ageNeed:'ಮೊದಲು ಲಾಗ್ ಟ್ಯಾಬ್‌ನಲ್ಲಿ ನಿಮ್ಮ ಜನ್ಮ ದಿನಾಂಕ ಸೇರಿಸಿ. ವಯಸ್ಸಿಗೆ ತಕ್ಕಂತೆ ಮುಟ್ಟಿನ ಅರ್ಥ ಬದಲಾಗುತ್ತದೆ.',rAge:'ವಯಸ್ಸು',ageBad:'ಸರಿಯಾದ ಜನ್ಮ ದಿನಾಂಕ ನಮೂದಿಸಿ (ವಯಸ್ಸು 9 ರಿಂದ 90)',flowHint:'ರಕ್ತಸ್ರಾವಕ್ಕೆ ತಕ್ಕಂತೆ ನೋವು ಮತ್ತು ಶಕ್ತಿ ಆರಂಭಿಕವಾಗಿ ಬದಲಾಗುತ್ತದೆ. ನಿಜವಾಗಿ ಹೇಗನಿಸುತ್ತದೆಯೋ ಹಾಗೆ ಹೊಂದಿಸಿ.',
  cycTeen:'ಚಕ್ರದ ಅನಿಯಮಿತತೆ (ಮುಟ್ಟಿನ ಮೊದಲ 2-3 ವರ್ಷಗಳಲ್ಲಿ ಪಿಸಿಓಎಸ್ ಲಕ್ಷಣವಾಗಿ ಬಳಸಲ್ಲ: ಆಗ ಇದು ಸಾಮಾನ್ಯ)',
  cycMeno:'ಚಕ್ರದ ಅನಿಯಮಿತತೆ (45+ ನಲ್ಲಿ ಪಿಸಿಓಎಸ್ ಲಕ್ಷಣವಾಗಿ ಬಳಸಲ್ಲ: ಋತುಬಂಧದ ಹಂತದಲ್ಲಿ ಸಾಮಾನ್ಯ)',
  ageCrit:a=>`ವಯಸ್ಸು ${a}`,noPeriod12:'12+ ತಿಂಗಳು ಮುಟ್ಟಿಲ್ಲ'
});

UI.en.early=n=>`Early read: based on only ${n} day(s) logged. Percentages are not reliable yet and patterns firm up after about 7 days or more. Keep logging, and treat this as a first look.`;
UI.kn.early=n=>`ಆರಂಭಿಕ ನೋಟ: ಕೇವಲ ${n} ದಿನದ ದಾಖಲೆ ಆಧರಿಸಿದೆ. ಶೇಕಡಾವಾರು ಇನ್ನೂ ನಂಬಲರ್ಹವಲ್ಲ; ಸುಮಾರು 7 ದಿನ ಅಥವಾ ಹೆಚ್ಚು ದಾಖಲಿಸಿದಾಗ ಮಾದರಿಗಳು ಸ್ಪಷ್ಟವಾಗುತ್ತವೆ. ಇದನ್ನು ಮೊದಲ ನೋಟವಾಗಿ ಮಾತ್ರ ಪರಿಗಣಿಸಿ.`;

Object.assign(UI.en,{
  cycDay:d=>`Cycle day ${d}`,cycFrom:d=>`Counted from the first day of your last period (${d}).`,
  ph_menstrual:'Menstrual phase',ph_follicular:'Follicular phase',ph_ovulation:'Likely ovulation window',ph_luteal:'Luteal phase',ph_late:'Past your usual cycle length (period may be late)',
  phNote:'Phase is only an estimate from your average cycle length (28 days if unknown).',
  scopeLbl:'Data range',scCycle:'This cycle (from day 1)',scAll:'All logged days',
  noCycStart:'Add your last period start date on the Log tab, so insights can be counted from day 1 of your cycle.'
});
Object.assign(UI.kn,{
  cycDay:d=>`ಚಕ್ರದ ದಿನ ${d}`,cycFrom:d=>`ನಿಮ್ಮ ಕೊನೆಯ ಮುಟ್ಟಿನ ಮೊದಲ ದಿನದಿಂದ (${d}) ಲೆಕ್ಕ.`,
  ph_menstrual:'ಮುಟ್ಟಿನ ಹಂತ',ph_follicular:'ಫಾಲಿಕ್ಯುಲರ್ ಹಂತ',ph_ovulation:'ಅಂಡೋತ್ಪತ್ತಿ ಸಾಧ್ಯತೆಯ ಅವಧಿ',ph_luteal:'ಲ್ಯೂಟಿಯಲ್ ಹಂತ',ph_late:'ನಿಮ್ಮ ಸಾಮಾನ್ಯ ಚಕ್ರ ಅವಧಿ ಮೀರಿದೆ (ಮುಟ್ಟು ತಡವಾಗಿರಬಹುದು)',
  phNote:'ಹಂತವು ನಿಮ್ಮ ಸರಾಸರಿ ಚಕ್ರ ಅವಧಿಯ ಅಂದಾಜು ಮಾತ್ರ (ತಿಳಿಯದಿದ್ದರೆ 28 ದಿನ).',
  scopeLbl:'ಡೇಟಾ ಅವಧಿ',scCycle:'ಈ ಚಕ್ರ (ದಿನ 1 ರಿಂದ)',scAll:'ದಾಖಲಿಸಿದ ಎಲ್ಲಾ ದಿನಗಳು',
  noCycStart:'ಚಕ್ರದ ದಿನ 1 ರಿಂದ ಲೆಕ್ಕ ಹಾಕಲು ಲಾಗ್ ಟ್ಯಾಬ್‌ನಲ್ಲಿ ನಿಮ್ಮ ಕೊನೆಯ ಮುಟ್ಟಿನ ಆರಂಭ ದಿನಾಂಕ ಸೇರಿಸಿ.'
});

Object.assign(UI.en,{
  lpUnknown:'I do not remember the date',missTitle:'Missed periods in the last 6 months',missNo:'No missed periods',missYes:'Yes, I missed some',missUnsure:'Not sure / do not remember',
  missWhich:'Which months did you miss a period?',missHint:'These answers count towards the insights. If you do not remember, choose Not sure: nothing is guessed.',
  profNeed:'Answer the About you questions on the Log tab first: date of birth, age at your first period, health conditions a doctor has told you about, when your last period started, and any missed periods. "Not sure" is a fine answer.',
  missedTxt:n=>`Missed periods in ${n} of the last 6 months`,gapTxt:d=>`${d} days since the last period started`,cycShort:'Cycle regularity',rMissed:'Missed periods (last 6 months)'
});
Object.assign(UI.kn,{
  lpUnknown:'ದಿನಾಂಕ ನೆನಪಿಲ್ಲ',missTitle:'ಕಳೆದ 6 ತಿಂಗಳಲ್ಲಿ ತಪ್ಪಿದ ಮುಟ್ಟು',missNo:'ಯಾವುದೂ ತಪ್ಪಿಲ್ಲ',missYes:'ಹೌದು, ಕೆಲವು ತಪ್ಪಿವೆ',missUnsure:'ಖಚಿತವಿಲ್ಲ / ನೆನಪಿಲ್ಲ',
  missWhich:'ಯಾವ ತಿಂಗಳುಗಳಲ್ಲಿ ಮುಟ್ಟು ತಪ್ಪಿತು?',missHint:'ಈ ಉತ್ತರಗಳು ಇನ್ಸೈಟ್‌ಗಳ ಲೆಕ್ಕದಲ್ಲಿ ಸೇರುತ್ತವೆ. ನೆನಪಿಲ್ಲದಿದ್ದರೆ "ಖಚಿತವಿಲ್ಲ" ಆರಿಸಿ: ಏನನ್ನೂ ಊಹಿಸುವುದಿಲ್ಲ.',
  profNeed:'ಮೊದಲು ಲಾಗ್ ಟ್ಯಾಬ್‌ನ "ನಿಮ್ಮ ಬಗ್ಗೆ" ಪ್ರಶ್ನೆಗಳಿಗೆ ಉತ್ತರಿಸಿ: ಜನ್ಮ ದಿನಾಂಕ, ಮೊದಲ ಮುಟ್ಟಿನ ವಯಸ್ಸು, ವೈದ್ಯರು ಹೇಳಿದ ಆರೋಗ್ಯ ಸಮಸ್ಯೆಗಳು, ಕೊನೆಯ ಮುಟ್ಟಿನ ದಿನ ಮತ್ತು ತಪ್ಪಿದ ಮುಟ್ಟು. "ಖಚಿತವಿಲ್ಲ" ಎಂಬುದೂ ಸರಿಯಾದ ಉತ್ತರ.',
  missedTxt:n=>`ಕಳೆದ 6 ತಿಂಗಳಲ್ಲಿ ${n} ತಿಂಗಳು ಮುಟ್ಟು ತಪ್ಪಿದೆ`,gapTxt:d=>`ಕೊನೆಯ ಮುಟ್ಟು ಪ್ರಾರಂಭವಾಗಿ ${d} ದಿನ`,cycShort:'ಚಕ್ರದ ಕ್ರಮಬದ್ಧತೆ',rMissed:'ತಪ್ಪಿದ ಮುಟ್ಟು (ಕಳೆದ 6 ತಿಂಗಳು)'
});

Object.assign(UI.en,{
  menLabel:'At what age did your first period start?',menUnknown:'I do not remember',menHint:'Some start at 11, others at 15 or 16. A late or early start, and the years since, change how your cycle and symptoms are read.',menBad:'Enter an age between 8 and 20 (not above your current age)',
  condTitle:'Has a doctor ever told you that you have any of these?',cd_thyroid:'Thyroid problem',cd_pcos:'PCOS / PCOD',cd_anaemia:'Anaemia',cd_diabetes:'Diabetes',cd_endo:'Endometriosis',cd_none:'None of these',cd_unsure:'Not sure',
  famTitle:'Does a mother or sister have PCOS, a thyroid problem or diabetes?',fam_yes:'Yes',fam_no:'No',fam_unsure:'Not sure',
  yourProfile:'Your profile',menShort:'First period at age',condShort:'Diagnosed earlier',famShort:'Family history',yrsAgo:y=>y+' years ago',
  knownCrit:'Already diagnosed by a doctor',lateMen:a=>a>0?`First period late, at age ${a} (15 or later)`:'First period at 15 or later',earlyMen:a=>a>0?`First period early, at age ${a} (before 12)`:'First period before 12',famCrit:'Family history (mother or sister)',
  earlyYrs:y=>`Periods started ${y} year(s) ago (first 2 years)`,
  knownNote:'You told us a doctor already diagnosed this. Use this card to track how your symptoms behave and to discuss control and follow-up with your doctor.',
  whyTitle:'In plain words:',
  whyTxt:(age,men,yrs,miss,m,t,list)=>`You are ${age}${men?`, your periods started at ${men}${yrs!==null?` (${yrs} years ago)`:''}`:''}${miss?`, and you missed ${miss} of the last 6 periods`:''}. ${m} of ${t} signs for this pattern match${list.length?': '+list.join('; '):''}. Doctors often look at this combination, so take this page to your appointment.`
});
Object.assign(UI.kn,{
  menLabel:'ನಿಮ್ಮ ಮೊದಲ ಮುಟ್ಟು ಯಾವ ವಯಸ್ಸಿನಲ್ಲಿ ಪ್ರಾರಂಭವಾಯಿತು?',menUnknown:'ನೆನಪಿಲ್ಲ',menHint:'ಕೆಲವರಿಗೆ 11ಕ್ಕೆ, ಕೆಲವರಿಗೆ 15-16ಕ್ಕೆ ಪ್ರಾರಂಭ. ಬೇಗ ಅಥವಾ ತಡವಾಗಿ ಪ್ರಾರಂಭ ಮತ್ತು ಅಂದಿನಿಂದ ಕಳೆದ ವರ್ಷಗಳು ನಿಮ್ಮ ಚಕ್ರ ಮತ್ತು ಲಕ್ಷಣಗಳ ಅರ್ಥ ಬದಲಿಸುತ್ತವೆ.',menBad:'8 ರಿಂದ 20 ರ ನಡುವಿನ ವಯಸ್ಸು ನಮೂದಿಸಿ (ಈಗಿನ ವಯಸ್ಸಿಗಿಂತ ಹೆಚ್ಚಿರಬಾರದು)',
  condTitle:'ಈ ಯಾವುದಾದರೂ ಇದೆ ಎಂದು ವೈದ್ಯರು ಎಂದಾದರೂ ಹೇಳಿದ್ದಾರೆಯೇ?',cd_thyroid:'ಥೈರಾಯ್ಡ್ ತೊಂದರೆ',cd_pcos:'ಪಿಸಿಓಎಸ್ / ಪಿಸಿಓಡಿ',cd_anaemia:'ರಕ್ತಹೀನತೆ',cd_diabetes:'ಮಧುಮೇಹ',cd_endo:'ಎಂಡೋಮೆಟ್ರಿಯೋಸಿಸ್',cd_none:'ಇವುಗಳಲ್ಲಿ ಯಾವುದೂ ಇಲ್ಲ',cd_unsure:'ಖಚಿತವಿಲ್ಲ',
  famTitle:'ತಾಯಿ ಅಥವಾ ಸಹೋದರಿಗೆ ಪಿಸಿಓಎಸ್, ಥೈರಾಯ್ಡ್ ಅಥವಾ ಮಧುಮೇಹ ಇದೆಯೇ?',fam_yes:'ಹೌದು',fam_no:'ಇಲ್ಲ',fam_unsure:'ಖಚಿತವಿಲ್ಲ',
  yourProfile:'ನಿಮ್ಮ ಪ್ರೊಫೈಲ್',menShort:'ಮೊದಲ ಮುಟ್ಟಿನ ವಯಸ್ಸು',condShort:'ಈ ಮೊದಲು ಪತ್ತೆಯಾದದ್ದು',famShort:'ಕುಟುಂಬದ ಇತಿಹಾಸ',yrsAgo:y=>y+' ವರ್ಷ ಹಿಂದೆ',
  knownCrit:'ವೈದ್ಯರು ಈಗಾಗಲೇ ಪತ್ತೆ ಮಾಡಿದ್ದಾರೆ',lateMen:a=>a>0?`ಮೊದಲ ಮುಟ್ಟು ತಡವಾಗಿ, ${a} ವಯಸ್ಸಿನಲ್ಲಿ (15 ಅಥವಾ ನಂತರ)`:'ಮೊದಲ ಮುಟ್ಟು 15 ಅಥವಾ ನಂತರ',earlyMen:a=>a>0?`ಮೊದಲ ಮುಟ್ಟು ಬೇಗ, ${a} ವಯಸ್ಸಿನಲ್ಲಿ (12ಕ್ಕಿಂತ ಮೊದಲು)`:'ಮೊದಲ ಮುಟ್ಟು 12ಕ್ಕಿಂತ ಮೊದಲು',famCrit:'ಕುಟುಂಬದ ಇತಿಹಾಸ (ತಾಯಿ ಅಥವಾ ಸಹೋದರಿ)',
  earlyYrs:y=>`ಮುಟ್ಟು ಪ್ರಾರಂಭವಾಗಿ ${y} ವರ್ಷ (ಮೊದಲ 2 ವರ್ಷ)`,
  knownNote:'ವೈದ್ಯರು ಇದನ್ನು ಈಗಾಗಲೇ ಪತ್ತೆ ಮಾಡಿದ್ದಾರೆ ಎಂದು ನೀವು ಹೇಳಿದ್ದೀರಿ. ನಿಮ್ಮ ಲಕ್ಷಣಗಳ ಬದಲಾವಣೆ ಗಮನಿಸಲು ಮತ್ತು ನಿಯಂತ್ರಣ ಹಾಗೂ ಫಾಲೋ-ಅಪ್ ಬಗ್ಗೆ ವೈದ್ಯರೊಂದಿಗೆ ಚರ್ಚಿಸಲು ಇದನ್ನು ಬಳಸಿ.',
  whyTitle:'ಸರಳವಾಗಿ ಹೇಳಬೇಕೆಂದರೆ:',
  whyTxt:(age,men,yrs,miss,m,t,list)=>`ನಿಮ್ಮ ವಯಸ್ಸು ${age}${men?`, ಮುಟ್ಟು ${men} ವಯಸ್ಸಿಗೆ ಪ್ರಾರಂಭವಾಯಿತು${yrs!==null?` (${yrs} ವರ್ಷ ಹಿಂದೆ)`:''}`:''}${miss?`, ಕಳೆದ 6 ಮುಟ್ಟಿನಲ್ಲಿ ${miss} ತಪ್ಪಿದೆ`:''}. ಈ ಮಾದರಿಯ ${t} ಲಕ್ಷಣಗಳಲ್ಲಿ ${m} ಹೊಂದಿಕೆಯಾಗಿದೆ${list.length?': '+list.join('; '):''}. ವೈದ್ಯರು ಈ ಸಂಯೋಜನೆಯನ್ನು ಗಮನಿಸುತ್ತಾರೆ; ಈ ಪುಟವನ್ನು ನಿಮ್ಮ ಭೇಟಿಗೆ ಕೊಂಡೊಯ್ಯಿರಿ.`
});

Object.assign(UI.en,{
  baseTitle:'Your last 3 months',baseHint:'Tell us what the last 3 months were like, from memory. This gives you insights from day 1, and your daily logs take over as they build up.',
  baseLen:'Usual cycle length in days (leave empty if not sure)',baseReg:'Since your first period, how have your periods been?',reg_regular:'Regular since my first period',reg_later:'Regular at first, irregular later',reg_start:'Irregular since the start',reg_unsure:'Not sure',
  baseFlow:'Usual flow',bf_light:'Light',bf_medium:'Medium',bf_heavy:'Heavy',basePain:'Usual period pain',baseSyms:'How often did you have each of these?',
  lvl_0:'Never',lvl_1:'Sometimes',lvl_2:'Often',lvl1:'sometimes',lvl2:'often',lenBad:'Cycle length should be between 15 and 90 days',
  cycSelf:(l,r)=>`Usual cycle length ${l} days${r==='irregular'?', often irregular':''} (your answer)`,
  earlyBase:n=>`Early read: based on your last-3-months answers${n?` and ${n} logged day(s)`:''}. Daily logs make this more accurate over time, so keep logging.`,
  baseOnly:'Based on self-reported history (no daily logs yet)'
});
Object.assign(UI.kn,{
  baseTitle:'ಕಳೆದ 3 ತಿಂಗಳು',baseHint:'ಕಳೆದ 3 ತಿಂಗಳು ಹೇಗಿತ್ತು ಎಂದು ನೆನಪಿನಿಂದ ಹೇಳಿ. ಇದರಿಂದ ಮೊದಲ ದಿನದಿಂದಲೇ ಇನ್ಸೈಟ್ ಸಿಗುತ್ತದೆ; ದೈನಂದಿನ ದಾಖಲೆ ಬೆಳೆದಂತೆ ಅದೇ ಮುಖ್ಯವಾಗುತ್ತದೆ.',
  baseLen:'ಸಾಮಾನ್ಯ ಚಕ್ರದ ಅವಧಿ (ದಿನಗಳು; ಖಚಿತವಿಲ್ಲದಿದ್ದರೆ ಖಾಲಿ ಬಿಡಿ)',baseReg:'ಮೊದಲ ಮುಟ್ಟಿನಿಂದ ಇಲ್ಲಿಯವರೆಗೆ ನಿಮ್ಮ ಮುಟ್ಟು ಹೇಗಿತ್ತು?',reg_regular:'ಮೊದಲಿನಿಂದ ಕ್ರಮಬದ್ಧ',reg_later:'ಮೊದಲು ಕ್ರಮಬದ್ಧ, ನಂತರ ಅನಿಯಮಿತ',reg_start:'ಆರಂಭದಿಂದಲೇ ಅನಿಯಮಿತ',reg_unsure:'ಖಚಿತವಿಲ್ಲ',
  baseFlow:'ಸಾಮಾನ್ಯ ರಕ್ತಸ್ರಾವ',bf_light:'ಕಡಿಮೆ',bf_medium:'ಮಧ್ಯಮ',bf_heavy:'ಹೆಚ್ಚು',basePain:'ಸಾಮಾನ್ಯ ಮುಟ್ಟಿನ ನೋವು',baseSyms:'ಇವು ಎಷ್ಟು ಬಾರಿ ಇದ್ದವು?',
  lvl_0:'ಎಂದೂ ಇಲ್ಲ',lvl_1:'ಕೆಲವೊಮ್ಮೆ',lvl_2:'ಆಗಾಗ',lvl1:'ಕೆಲವೊಮ್ಮೆ',lvl2:'ಆಗಾಗ',lenBad:'ಚಕ್ರದ ಅವಧಿ 15 ರಿಂದ 90 ದಿನಗಳ ನಡುವೆ ಇರಬೇಕು',
  cycSelf:(l,r)=>`ಸಾಮಾನ್ಯ ಚಕ್ರದ ಅವಧಿ ${l} ದಿನ${r==='irregular'?', ಆಗಾಗ ಅನಿಯಮಿತ':''} (ನಿಮ್ಮ ಉತ್ತರ)`,
  earlyBase:n=>`ಆರಂಭಿಕ ನೋಟ: ನಿಮ್ಮ ಕಳೆದ 3 ತಿಂಗಳ ಉತ್ತರಗಳನ್ನು${n?` ಮತ್ತು ${n} ದಿನದ ದಾಖಲೆಯನ್ನು`:''} ಆಧರಿಸಿದೆ. ದೈನಂದಿನ ದಾಖಲೆಗಳಿಂದ ಇದು ಹೆಚ್ಚು ನಿಖರವಾಗುತ್ತದೆ; ದಾಖಲಿಸುತ್ತಿರಿ.`,
  baseOnly:'ನೀವು ಹೇಳಿದ ಇತಿಹಾಸದ ಆಧಾರ (ದೈನಂದಿನ ದಾಖಲೆ ಇನ್ನೂ ಇಲ್ಲ)'
});

Object.assign(UI.en,{
  exTitle:'Quick demo for judges',exNote:'Opens a guest session with a made-up example profile and goes straight to the insights. Not a real person. Nothing is saved after you log out.',
  exPcos:'PCOS-like example',exIron:'Anaemia-like example',exPeri:'Perimenopause example',
  closest:'Closest match:',noFlagTip:'Nothing crosses the threshold yet. Add more detail in "Your last 3 months" or keep logging to sharpen this.'
});
Object.assign(UI.kn,{
  exTitle:'ತೀರ್ಪುಗಾರರಿಗೆ ತ್ವರಿತ ಡೆಮೊ',exNote:'ಕಾಲ್ಪನಿಕ ಉದಾಹರಣೆ ಪ್ರೊಫೈಲ್‌ನೊಂದಿಗೆ ಅತಿಥಿ ಸೆಷನ್ ತೆರೆದು ನೇರವಾಗಿ ಇನ್ಸೈಟ್‌ಗೆ ಹೋಗುತ್ತದೆ. ನಿಜವಾದ ವ್ಯಕ್ತಿಯಲ್ಲ. ಲಾಗ್‌ಔಟ್ ನಂತರ ಏನೂ ಉಳಿಯುವುದಿಲ್ಲ.',
  exPcos:'ಪಿಸಿಓಎಸ್-ಮಾದರಿ ಉದಾಹರಣೆ',exIron:'ರಕ್ತಹೀನತೆ-ಮಾದರಿ ಉದಾಹರಣೆ',exPeri:'ಪೆರಿಮೆನೋಪಾಸ್ ಉದಾಹರಣೆ',
  closest:'ಹತ್ತಿರದ ಹೊಂದಾಣಿಕೆ:',noFlagTip:'ಇನ್ನೂ ಯಾವುದೂ ಮಿತಿ ತಲುಪಿಲ್ಲ. "ಕಳೆದ 3 ತಿಂಗಳು" ವಿಭಾಗದಲ್ಲಿ ಹೆಚ್ಚು ವಿವರ ಸೇರಿಸಿ ಅಥವಾ ದಾಖಲಿಸುತ್ತಿರಿ.'
});

Object.assign(UI.en,{
  irrAge:'About what age did they become irregular? (optional)',storyTitle:'Your cycle story',
  story_regular:'Regular since your first period',story_later:'Regular at first, then became irregular',story_start:'Irregular since the start',story_mixed:'Regular, but with recent missed periods',
  storyTxt_regular:()=>'Regular cycles over the years make ovulation-related problems such as PCOS less likely, so the other signs below count for less. Keep tracking: a new change is worth noting.',
  storyTxt_later:a=>`Cycles that were regular and then changed${a?` around age ${a}`:''} are worth a check. Common reasons doctors look at are thyroid changes, PCOS, weight or stress changes, and (if relevant) pregnancy.`,
  storyTxt_start:()=>'Long-standing irregular cycles are a common reason doctors check for PCOS or thyroid problems, especially together with acne, excess hair, hair loss or weight changes.',
  storyTxt_mixed:()=>'Your cycles have been regular, but recent missed periods are a change. Doctors usually ask about stress, weight change, thyroid and pregnancy first.',
  storyCtx_teen:'Irregular cycles are common in the first 2 to 3 years after periods start, so this alone is usually not a worry.',
  storyCtx_meno:'At this age irregular cycles are often part of the menopause transition, so this is read differently from PCOS.'
});
Object.assign(UI.kn,{
  irrAge:'ಸುಮಾರು ಯಾವ ವಯಸ್ಸಿನಲ್ಲಿ ಅನಿಯಮಿತವಾಯಿತು? (ಐಚ್ಛಿಕ)',storyTitle:'ನಿಮ್ಮ ಮುಟ್ಟಿನ ಕಥೆ',
  story_regular:'ಮೊದಲ ಮುಟ್ಟಿನಿಂದ ಕ್ರಮಬದ್ಧ',story_later:'ಮೊದಲು ಕ್ರಮಬದ್ಧ, ನಂತರ ಅನಿಯಮಿತ',story_start:'ಆರಂಭದಿಂದಲೇ ಅನಿಯಮಿತ',story_mixed:'ಕ್ರಮಬದ್ಧ, ಆದರೆ ಇತ್ತೀಚೆಗೆ ಮುಟ್ಟು ತಪ್ಪಿದೆ',
  storyTxt_regular:()=>'ವರ್ಷಗಳಿಂದ ಕ್ರಮಬದ್ಧ ಮುಟ್ಟು ಇದ್ದರೆ ಪಿಸಿಓಎಸ್‌ನಂತಹ ಅಂಡೋತ್ಪತ್ತಿ ಸಮಸ್ಯೆಗಳ ಸಾಧ್ಯತೆ ಕಡಿಮೆ; ಆದ್ದರಿಂದ ಕೆಳಗಿನ ಇತರ ಲಕ್ಷಣಗಳ ತೂಕ ಕಡಿಮೆ. ಹೊಸ ಬದಲಾವಣೆ ಕಂಡರೆ ಗಮನಿಸಿ.',
  storyTxt_later:a=>`ಕ್ರಮಬದ್ಧವಾಗಿದ್ದ ಮುಟ್ಟು${a?` ಸುಮಾರು ${a} ವಯಸ್ಸಿನಲ್ಲಿ`:''} ಬದಲಾದರೆ ತಪಾಸಣೆ ಮಾಡಿಸಿ. ವೈದ್ಯರು ಥೈರಾಯ್ಡ್ ಬದಲಾವಣೆ, ಪಿಸಿಓಎಸ್, ತೂಕ ಅಥವಾ ಒತ್ತಡದ ಬದಲಾವಣೆ ಮತ್ತು (ಅನ್ವಯಿಸಿದರೆ) ಗರ್ಭಧಾರಣೆಯನ್ನು ಪರಿಶೀಲಿಸುತ್ತಾರೆ.`,
  storyTxt_start:()=>'ದೀರ್ಘಕಾಲದ ಅನಿಯಮಿತ ಮುಟ್ಟು ಇದ್ದರೆ, ವಿಶೇಷವಾಗಿ ಮೊಡವೆ, ಅತಿಯಾದ ಕೂದಲು, ಕೂದಲು ಉದುರುವಿಕೆ ಅಥವಾ ತೂಕ ಬದಲಾವಣೆ ಜೊತೆಗಿದ್ದರೆ, ವೈದ್ಯರು ಪಿಸಿಓಎಸ್ ಅಥವಾ ಥೈರಾಯ್ಡ್ ಪರೀಕ್ಷಿಸುತ್ತಾರೆ.',
  storyTxt_mixed:()=>'ನಿಮ್ಮ ಮುಟ್ಟು ಕ್ರಮಬದ್ಧವಾಗಿತ್ತು, ಆದರೆ ಇತ್ತೀಚಿನ ತಪ್ಪಿದ ಮುಟ್ಟು ಬದಲಾವಣೆ. ವೈದ್ಯರು ಮೊದಲು ಒತ್ತಡ, ತೂಕ ಬದಲಾವಣೆ, ಥೈರಾಯ್ಡ್ ಮತ್ತು ಗರ್ಭಧಾರಣೆ ಬಗ್ಗೆ ಕೇಳುತ್ತಾರೆ.',
  storyCtx_teen:'ಮುಟ್ಟು ಪ್ರಾರಂಭವಾದ ಮೊದಲ 2-3 ವರ್ಷಗಳಲ್ಲಿ ಅನಿಯಮಿತ ಮುಟ್ಟು ಸಾಮಾನ್ಯ; ಇದೊಂದೇ ಕಾರಣಕ್ಕೆ ಸಾಮಾನ್ಯವಾಗಿ ಚಿಂತೆ ಬೇಡ.',
  storyCtx_meno:'ಈ ವಯಸ್ಸಿನಲ್ಲಿ ಅನಿಯಮಿತ ಮುಟ್ಟು ಹೆಚ್ಚಾಗಿ ಋತುಬಂಧದ ಹಂತದ ಭಾಗ; ಆದ್ದರಿಂದ ಇದನ್ನು ಪಿಸಿಓಎಸ್‌ಗಿಂತ ಬೇರೆಯಾಗಿ ಓದಲಾಗುತ್ತದೆ.'
});

Object.assign(UI.en,{
  demoConfirm:'Add 90 days of made-up sample entries to this account for a demo? Your real entries are kept, and sample days can be removed any time.',
  removeSample:'Remove sample data',sampleRemoved:'Sample data removed',
  sampleBanner:'Sample data included.',sampleBannerTxt:'Some days shown here are made-up demo entries, not real health data.'
});
Object.assign(UI.kn,{
  demoConfirm:'ಡೆಮೊಗಾಗಿ ಈ ಖಾತೆಗೆ 90 ದಿನಗಳ ಕಾಲ್ಪನಿಕ ಮಾದರಿ ದಾಖಲೆಗಳನ್ನು ಸೇರಿಸಬೇಕೇ? ನಿಮ್ಮ ನಿಜವಾದ ದಾಖಲೆಗಳು ಉಳಿಯುತ್ತವೆ; ಮಾದರಿ ದಿನಗಳನ್ನು ಯಾವಾಗ ಬೇಕಾದರೂ ತೆಗೆಯಬಹುದು.',
  removeSample:'ಮಾದರಿ ಡೇಟಾ ತೆಗೆಯಿರಿ',sampleRemoved:'ಮಾದರಿ ಡೇಟಾ ತೆಗೆಯಲಾಗಿದೆ',
  sampleBanner:'ಮಾದರಿ ಡೇಟಾ ಸೇರಿದೆ.',sampleBannerTxt:'ಇಲ್ಲಿ ತೋರಿಸಿದ ಕೆಲವು ದಿನಗಳು ಕಾಲ್ಪನಿಕ ಡೆಮೊ ದಾಖಲೆಗಳು, ನಿಜವಾದ ಆರೋಗ್ಯ ಡೇಟಾ ಅಲ್ಲ.'
});
