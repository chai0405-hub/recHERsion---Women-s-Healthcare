/* Sakhi Health - local, privacy-first accounts.
 *
 * IMPORTANT: there is no server. Accounts live in this browser's localStorage.
 * Passwords are never stored: only a salted PBKDF2-SHA256 hash (150k iterations).
 * This keeps each person's data separate on a shared device. It is NOT a
 * replacement for server-side authentication. To go to production, replace the
 * functions in this file with Firebase Auth / Supabase and keep the same API:
 *   Auth.register(), Auth.login(), Auth.guest(), Auth.current(), Auth.logout(),
 *   Auth.remove(), Auth.dataKey()
 */

/* extra UI strings (merged into the main dictionaries from data.js) */
Object.assign(UI.en, {
  aLogin: 'Log in', aRegister: 'Create account', aName: 'Full name', aEmail: 'Email',
  aPass: 'Password', aPass2: 'Confirm password',
  aPassHint: 'At least 8 characters with a letter and a number.',
  aShow: 'Show', aHide: 'Hide', aRemember: 'Keep me signed in on this device',
  aConsent: 'I agree that this app is not medical advice and my data is stored only on this device.',
  aNoAcct: 'New here?', aHaveAcct: 'Already have an account?',
  aGuest: 'Continue as guest (demo)', aLogout: 'Log out', aDelete: 'Delete my account and data',
  aConfirmDelete: 'Delete your account and all its data from this device? This cannot be undone.',
  aLocalNote: 'Your account and data stay on this device only. If you forget your password it cannot be recovered.',
  aWelcome: 'Welcome', aGuestNote: 'Guest session. Data is saved on this device.', aOr: 'or',
  aWait: 'Please wait…', aAccount: 'Account', aStrength: 'Strength',
  aErrName: 'Please enter your name.', aErrEmail: 'Enter a valid email address.',
  aErrPass: 'Password needs 8+ characters, with at least one letter and one number.',
  aErrMatch: 'Passwords do not match.', aErrConsent: 'Please accept to continue.',
  aErrTaken: 'An account with this email already exists.', aErrLogin: 'Incorrect email or password.',
  aErrLocked: 'Too many attempts. Try again in {s} seconds.',
  aErrNoCrypto: 'Secure sign-in needs https or localhost. Open the live link or run a local server. Guest mode still works.',
  aErrStorage: 'Your browser is blocking storage. Turn off private mode and try again.'
});
Object.assign(UI.kn, {
  aLogin: 'ಲಾಗಿನ್', aRegister: 'ಖಾತೆ ತೆರೆಯಿರಿ', aName: 'ಪೂರ್ಣ ಹೆಸರು', aEmail: 'ಇಮೇಲ್',
  aPass: 'ಪಾಸ್‌ವರ್ಡ್', aPass2: 'ಪಾಸ್‌ವರ್ಡ್ ದೃಢೀಕರಿಸಿ',
  aPassHint: 'ಕನಿಷ್ಠ 8 ಅಕ್ಷರಗಳು, ಒಂದು ಅಕ್ಷರ ಮತ್ತು ಒಂದು ಸಂಖ್ಯೆ ಇರಲಿ.',
  aShow: 'ತೋರಿಸಿ', aHide: 'ಮರೆಮಾಡಿ', aRemember: 'ಈ ಸಾಧನದಲ್ಲಿ ನನ್ನನ್ನು ಸೈನ್ ಇನ್ ಆಗಿಡಿ',
  aConsent: 'ಈ ಆ್ಯಪ್ ವೈದ್ಯಕೀಯ ಸಲಹೆ ಅಲ್ಲ ಮತ್ತು ನನ್ನ ಡೇಟಾ ಈ ಸಾಧನದಲ್ಲಿ ಮಾತ್ರ ಸಂಗ್ರಹವಾಗುತ್ತದೆ ಎಂದು ಒಪ್ಪುತ್ತೇನೆ.',
  aNoAcct: 'ಹೊಸಬರೇ?', aHaveAcct: 'ಈಗಾಗಲೇ ಖಾತೆ ಇದೆಯೇ?',
  aGuest: 'ಅತಿಥಿಯಾಗಿ ಮುಂದುವರಿಯಿರಿ (ಡೆಮೊ)', aLogout: 'ಲಾಗ್ ಔಟ್', aDelete: 'ನನ್ನ ಖಾತೆ ಮತ್ತು ಡೇಟಾ ಅಳಿಸಿ',
  aConfirmDelete: 'ಈ ಸಾಧನದಿಂದ ನಿಮ್ಮ ಖಾತೆ ಮತ್ತು ಎಲ್ಲಾ ಡೇಟಾ ಅಳಿಸಬೇಕೇ? ಇದನ್ನು ಹಿಂತಿರುಗಿಸಲಾಗುವುದಿಲ್ಲ.',
  aLocalNote: 'ನಿಮ್ಮ ಖಾತೆ ಮತ್ತು ಡೇಟಾ ಈ ಸಾಧನದಲ್ಲಿ ಮಾತ್ರ ಇರುತ್ತವೆ. ಪಾಸ್‌ವರ್ಡ್ ಮರೆತರೆ ಮರುಪಡೆಯಲು ಸಾಧ್ಯವಿಲ್ಲ.',
  aWelcome: 'ಸ್ವಾಗತ', aGuestNote: 'ಅತಿಥಿ ಸೆಶನ್. ಡೇಟಾ ಈ ಸಾಧನದಲ್ಲಿ ಉಳಿಯುತ್ತದೆ.', aOr: 'ಅಥವಾ',
  aWait: 'ದಯವಿಟ್ಟು ನಿರೀಕ್ಷಿಸಿ…', aAccount: 'ಖಾತೆ', aStrength: 'ಬಲ',
  aErrName: 'ದಯವಿಟ್ಟು ನಿಮ್ಮ ಹೆಸರು ನಮೂದಿಸಿ.', aErrEmail: 'ಮಾನ್ಯ ಇಮೇಲ್ ನಮೂದಿಸಿ.',
  aErrPass: 'ಪಾಸ್‌ವರ್ಡ್ ಕನಿಷ್ಠ 8 ಅಕ್ಷರ, ಒಂದು ಅಕ್ಷರ ಮತ್ತು ಒಂದು ಸಂಖ್ಯೆ ಹೊಂದಿರಬೇಕು.',
  aErrMatch: 'ಪಾಸ್‌ವರ್ಡ್‌ಗಳು ಹೊಂದಿಕೆಯಾಗುತ್ತಿಲ್ಲ.', aErrConsent: 'ಮುಂದುವರಿಯಲು ಒಪ್ಪಿಗೆ ಅಗತ್ಯ.',
  aErrTaken: 'ಈ ಇಮೇಲ್‌ನಲ್ಲಿ ಈಗಾಗಲೇ ಖಾತೆ ಇದೆ.', aErrLogin: 'ಇಮೇಲ್ ಅಥವಾ ಪಾಸ್‌ವರ್ಡ್ ತಪ್ಪಾಗಿದೆ.',
  aErrLocked: 'ಹಲವು ತಪ್ಪು ಪ್ರಯತ್ನಗಳು. {s} ಸೆಕೆಂಡ್ ನಂತರ ಪ್ರಯತ್ನಿಸಿ.',
  aErrNoCrypto: 'ಸುರಕ್ಷಿತ ಸೈನ್-ಇನ್‌ಗೆ https ಅಥವಾ localhost ಬೇಕು. ಲೈವ್ ಲಿಂಕ್ ತೆರೆಯಿರಿ ಅಥವಾ ಲೋಕಲ್ ಸರ್ವರ್ ಚಲಾಯಿಸಿ. ಅತಿಥಿ ಮೋಡ್ ಕೆಲಸ ಮಾಡುತ್ತದೆ.',
  aErrStorage: 'ನಿಮ್ಮ ಬ್ರೌಸರ್ ಸಂಗ್ರಹಣೆಯನ್ನು ನಿರ್ಬಂಧಿಸುತ್ತಿದೆ. ಖಾಸಗಿ ಮೋಡ್ ಆಫ್ ಮಾಡಿ ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.'
});

const Auth = (() => {
  const USERS = 'sakhi_users_v1', SESSION = 'sakhi_session_v1', FAILS = 'sakhi_fails_v1';
  const ITER = 150000, MAX_FAILS = 5, LOCK_SEC = 30;
  const C = globalThis.crypto;
  const canHash = () => !!(C && C.subtle);

  const read = (store, key, fallback) => { try { return JSON.parse(store.getItem(key)) ?? fallback; } catch (e) { return fallback; } };
  const write = (store, key, val) => { try { store.setItem(key, JSON.stringify(val)); return true; } catch (e) { return false; } };
  const users = () => read(localStorage, USERS, {});
  const fails = () => read(localStorage, FAILS, {});

  const b64 = buf => btoa(String.fromCharCode(...new Uint8Array(buf)));
  const unb64 = s => Uint8Array.from(atob(s), c => c.charCodeAt(0));

  async function hash(password, saltB64) {
    const key = await C.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveBits']);
    const bits = await C.subtle.deriveBits({ name: 'PBKDF2', salt: unb64(saltB64), iterations: ITER, hash: 'SHA-256' }, key, 256);
    return b64(bits);
  }
  function same(a, b) { // constant-time string compare
    if (a.length !== b.length) return false;
    let d = 0; for (let i = 0; i < a.length; i++) d |= a.charCodeAt(i) ^ b.charCodeAt(i);
    return d === 0;
  }

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const strongPw = p => p.length >= 8 && /[A-Za-z]/.test(p) && /\d/.test(p);
  const strength = p => (p.length >= 8) + (p.length >= 12) + (/[A-Za-z]/.test(p) && /\d/.test(p)) + /[^A-Za-z0-9]/.test(p);

  function setSession(u, remember) {
    const s = { email: u.email, name: u.name, guest: !!u.guest };
    const ok = write(remember ? localStorage : sessionStorage, SESSION, s);
    try { (remember ? sessionStorage : localStorage).removeItem(SESSION); } catch (e) {}
    return ok;
  }
  function current() {
    const s = read(sessionStorage, SESSION, null) || read(localStorage, SESSION, null);
    if (!s || !s.email) return null;
    if (s.guest) return s;
    return users()[s.email] ? s : null; // session of a deleted account is invalid
  }

  async function register({ name, email, password, confirm, consent }) {
    email = (email || '').trim().toLowerCase(); name = (name || '').trim();
    if (name.length < 2) return { ok: false, err: 'aErrName' };
    if (!EMAIL_RE.test(email)) return { ok: false, err: 'aErrEmail' };
    if (!strongPw(password)) return { ok: false, err: 'aErrPass' };
    if (password !== confirm) return { ok: false, err: 'aErrMatch' };
    if (!consent) return { ok: false, err: 'aErrConsent' };
    if (!canHash()) return { ok: false, err: 'aErrNoCrypto' };
    const all = users();
    if (all[email]) return { ok: false, err: 'aErrTaken' };
    const salt = b64(C.getRandomValues(new Uint8Array(16)));
    all[email] = { name, email, salt, hash: await hash(password, salt), created: Date.now() };
    if (!write(localStorage, USERS, all)) return { ok: false, err: 'aErrStorage' };
    const u = { email, name };
    if (!setSession(u, true)) return { ok: false, err: 'aErrStorage' };
    return { ok: true, user: u };
  }

  async function login({ email, password, remember }) {
    email = (email || '').trim().toLowerCase();
    if (!EMAIL_RE.test(email)) return { ok: false, err: 'aErrEmail' };
    if (!password) return { ok: false, err: 'aErrLogin' };
    if (!canHash()) return { ok: false, err: 'aErrNoCrypto' };
    const f = fails(), rec = f[email] || { n: 0, until: 0 };
    const wait = Math.ceil((rec.until - Date.now()) / 1000);
    if (wait > 0) return { ok: false, err: 'aErrLocked', wait };
    const u = users()[email];
    // always hash, even for unknown emails, so timing does not reveal which emails exist
    const h = await hash(password, u ? u.salt : b64(new Uint8Array(16)));
    if (!u || !same(h, u.hash)) {
      rec.n += 1;
      if (rec.n >= MAX_FAILS) { rec.until = Date.now() + LOCK_SEC * 1000; rec.n = 0; }
      f[email] = rec; write(localStorage, FAILS, f);
      return rec.until > Date.now() ? { ok: false, err: 'aErrLocked', wait: LOCK_SEC } : { ok: false, err: 'aErrLogin' };
    }
    delete f[email]; write(localStorage, FAILS, f);
    const user = { email: u.email, name: u.name };
    if (!setSession(user, remember)) return { ok: false, err: 'aErrStorage' };
    return { ok: true, user };
  }

  function guest() {
    const u = { email: 'guest', name: 'Guest', guest: true };
    setSession(u, false);
    return { ok: true, user: u };
  }
  function logout() {
    try { sessionStorage.removeItem(SESSION); localStorage.removeItem(SESSION); } catch (e) {}
  }
  function remove(email) {
    const all = users(); delete all[email]; write(localStorage, USERS, all);
    try { localStorage.removeItem(dataKey({ email })); } catch (e) {}
    logout();
  }
  const dataKey = u => 'sakhi_entries_v1_' + (u && u.email ? u.email : 'anon');

  return { register, login, guest, logout, remove, current, dataKey, strength, canHash };
})();
