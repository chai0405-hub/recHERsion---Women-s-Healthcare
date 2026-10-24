# 🌸 Sakhi Health (ಸಖಿ)

**Track symptoms. Spot patterns. Talk to your doctor with confidence.**

Built for **recHERsion'26** (Engineer NITK 2K26) · Problem Statement 1: Women's Healthcare.

## The problem
Conditions such as PCOS, endometriosis, thyroid disorders and iron deficiency are often diagnosed years late. Symptoms are scattered, easy to forget, and often dismissed in a short appointment.

## The solution
Sakhi Health closes the gap between *"something feels off"* and *"here is what to ask my doctor"*.

1. **Log** daily symptoms in under 30 seconds: period, flow, pain, energy, mood, 16 symptom chips.
2. **Insights** from transparent, rule-based pattern checks (PCOS, iron deficiency or anaemia, severe period pain, thyroid). Every result shows exactly which signs matched.
3. **Doctor report**: a one-page summary with cycle stats, top symptoms, tests doctors commonly consider and questions to ask. Print it, save as PDF, or share on WhatsApp.
4. **English + Kannada** so it reaches women beyond English readers.

## Privacy first
- No backend and no tracking.
- Register / log in with email and password, or continue as a guest.
- Passwords are never stored. Only a salted PBKDF2-SHA256 hash is kept.
- Each account gets its own private data, stored only in the browser (`localStorage`) on the user's own device.
- One tap deletes the account and its data.
- 5 wrong sign-in attempts lock that email for 30 seconds.

## Responsible by design
Sakhi Health **never diagnoses**. It highlights patterns worth discussing with a qualified doctor and shows an urgent-care warning for red-flag symptoms. Rules are open in `js/app.js` (`analyze()`), not a black box.

## Run locally
No build step. Open `index.html` in a browser, then tap **Load demo data (90 days)**.

Or serve it:
```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Project structure
```
sakhi-health/
├── index.html        # page shell
├── css/
│   └── style.css     # styles (mobile-first, print styles for the report)
├── js/
│   ├── data.js       # symptoms, EN/KN strings, pattern definitions
│   ├── auth.js       # register, login, guest, logout, delete account
│   └── app.js        # state, analysis rules, screens
├── README.md
├── LICENSE
└── .gitignore
```

## Accounts: what this is and is not
Accounts are **device-local**: they separate people's data on a shared phone or laptop and keep the app fully private. They are not server-side authentication, so there is no password reset and no sync across devices. For production, replace `js/auth.js` with Firebase Auth or Supabase and keep the same functions (`register`, `login`, `guest`, `current`, `logout`, `remove`, `dataKey`).

Secure sign-in uses the Web Crypto API, which needs **https or localhost** (GitHub Pages is https). Guest mode works anywhere.

## How the pattern rules work
| Pattern | Flagged when |
|---|---|
| PCOS / hormonal | irregular or long cycles AND at least 1 more of: acne, excess hair, hair loss, weight gain |
| Iron deficiency / anaemia | frequent fatigue AND at least 2 more of: heavy flow days, dizziness, pale skin, low energy |
| Severe period / pelvic pain | 2+ days of pain 7/10 or more AND at least 2 more supporting signs |
| Thyroid | 4+ of 7 thyroid-related symptoms occur frequently |

Needs at least 7 logged days.

## Deploy (GitHub Pages)
Repo **Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: `main` / `(root)` → Save.**
Live at `https://<your-username>.github.io/sakhi-health/`

## Roadmap
- Lab report upload with plain-language explanation
- ASHA / health worker mode for rural screening
- Nearby specialist finder
- More conditions and clinician-reviewed rules
- Installable PWA with offline support

## Disclaimer
This is not a medical device and does not provide medical advice or diagnosis. Always consult a qualified doctor.

## License
MIT © 2026 Chaitanya Pawar
