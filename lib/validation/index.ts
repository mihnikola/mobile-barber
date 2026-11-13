/**
 * Form validation rules (Phase 3.4). Pure functions → unit tested in lib/validation/__tests__.
 *
 * Rules are copied 1:1 from the old per-screen hooks. They are NOT consistent with each other
 * (B23) — e.g. `isStrongPassword` accepts any special character, `isStrongConfirmPassword` only
 * #@$!%*?& and only letters/digits otherwise. Unifying them is a product decision.
 */

/** Strict email (register / forgot password). */
export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
/** Loose email (change-password flow). */
export const EMAIL_LOOSE_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
/** ≥8 chars, one uppercase, one digit, one special character (any ASCII punctuation). */
export const STRONG_PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*\d)(?=.*[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]).{8,}$/;
/** ≥8 chars, one uppercase, one digit, one of #@$!%*?&, only letters/digits/those specials. */
export const STRONG_CONFIRM_PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*\d)(?=.*[#@$!%*?&])[A-Za-z\d#@$!%*?&]{8,}$/;

export const isValidEmail = (text: string) => !text.includes(" ") && EMAIL_REGEX.test(text);
export const isEmailLike = (text: string) => EMAIL_LOOSE_REGEX.test(text);
export const isStrongPassword = (text: string) => STRONG_PASSWORD_REGEX.test(text);
export const isStrongConfirmPassword = (text: string) => STRONG_CONFIRM_PASSWORD_REGEX.test(text);

/** Messages of the confirm-password check (still English-only, as before — B23). */
export const CONFIRM_PASSWORD_MESSAGES = {
  mismatch: "Passwords do not match.",
  weak: "At least 8 characters long, one uppercase letter, one number, and one special character.",
} as const;

/** Error for the confirm field, or "" when valid. Compares against the raw (untrimmed) input, as before. */
export function confirmPasswordError(password: string, confirmRaw: string): string {
  if (password !== confirmRaw) return CONFIRM_PASSWORD_MESSAGES.mismatch;
  if (!isStrongConfirmPassword(confirmRaw)) return CONFIRM_PASSWORD_MESSAGES.weak;
  return "";
}
