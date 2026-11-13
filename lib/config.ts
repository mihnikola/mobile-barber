/**
 * App-level configuration constants (Phase 3.6).
 *
 * Google OAuth client IDs are public identifiers shipped inside every app binary, not secrets
 * (D-011) — kept here instead of env vars so EAS builds can't break on a missing variable.
 * The iOS URL scheme in app.config.ts must stay in sync with `iosClientId` (reversed form).
 */
export const googleSignInConfig = {
  webClientId: "284831110803-0v5h2374cjlsfjsuhn11dbr4f3p1n0pm.apps.googleusercontent.com",
  iosClientId: "284831110803-u696dssmapohte49619rhmsdlselgmfg.apps.googleusercontent.com",
} as const;

/**
 * Brand shown on the home screen (design `ds-brandrow`: 40px mark + wordmark).
 * Placeholder name for now — replace when the salon's real name / mark are decided.
 */
export const brand = {
  name: "GENTLEMAN",
  mark: "G",
} as const;
