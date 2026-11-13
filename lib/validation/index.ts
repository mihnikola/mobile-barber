/**
 * Form validation rules (Phase 3.4; unified in B23 per user decision 2026-11-13).
 * Pure functions → unit tested in lib/validation/__tests__.
 *
 * One rule per field everywhere in the app:
 *  - email: strict format, no spaces
 *  - password (and its confirmation): ≥8 chars, one uppercase letter, one digit, one special character
 * Messages are localized by the hooks (lib/hooks/useFormFields), not here.
 */

export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
/** ≥8 chars, one uppercase, one digit, one special character (any ASCII punctuation). */
export const STRONG_PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*\d)(?=.*[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]).{8,}$/;

export const isValidEmail = (text: string) => !text.includes(" ") && EMAIL_REGEX.test(text);
export const isStrongPassword = (text: string) => STRONG_PASSWORD_REGEX.test(text);

export type ConfirmPasswordProblem = "mismatch" | "weak" | null;

/** Problem with the confirmation field (both values compared trimmed), or null when valid. */
export function confirmPasswordProblem(password: string, confirm: string): ConfirmPasswordProblem {
  if (password.trim() !== confirm.trim()) return "mismatch";
  if (!isStrongPassword(confirm.trim())) return "weak";
  return null;
}
