/**
 * Color tokens — the single source of truth for every color in the app.
 *
 * Phase 1 rule (D-002): values are copied 1:1 from what screens used before, so the
 * app looks identical. Several tokens are near-duplicates (e.g. 5 dark surfaces);
 * they are merged in Phase 5 when the new visual style is applied.
 *
 * App is dark-only (D-004).
 */
export const colors = {
  // Base
  white: "#FFFFFF",
  black: "#000000",
  transparent: "transparent",

  // Backgrounds & surfaces (darkest → lightest)
  background: "#020202",
  backgroundDeep: "#0A0B0E",
  surfaceMenu: "#1A1A1A",
  surfaceInput: "#1C1C1E",
  surfaceCard: "#1E1E1E",
  surfaceHome: "#222224",
  surface: "#232126",
  surfaceAvatar: "#242424",
  surfaceRaised: "#333333",
  surfaceIcon: "#3A3A3A",
  surfaceModal: "#414040",
  buttonDate: "#8B8B8B",

  // Borders & dividers
  divider: "#333333",
  dividerStrong: "#414141",
  borderIcon: "#4A4A4A",
  borderAvatar: "#CCCCCC",

  // Text (brightest → dimmest)
  text: "#FFFFFF",
  textTertiary: "#B0B0B0",
  textInactive: "#A7A7A7",
  textSecondary: "#9CA3AF",
  textDeactivated: "#919191",
  placeholder: "#888888",
  /** RN named color "grey"/"gray" */
  textMuted: "#808080",
  textSubtle: "#707070",
  textOnLight: "#000000",
  textDark: "#11181C",

  // Icons
  icon: "#687076",
  iconMuted: "#8A8888",

  // States
  disabled: "#5E5C5A",

  // Accents & status
  gold: "#FFD700",
  /** RN named color "yellow" */
  yellow: "#FFFF00",
  /** RN named color "red" */
  danger: "#FF0000",
  dangerSoft: "#FF3B30",
  link: "#00AEEF",
  linkAlt: "#2E78B7",
  brandBlue: "#4285A0",
  tint: "#0A7EA4",

  // Switch (settings toggle)
  switchTrackOff: "#767577",
  switchTrackOn: "#81B0FF",
  switchThumbOn: "#F5DD4B",
  switchThumbOff: "#F4F3F4",
} as const;

export type ColorToken = keyof typeof colors;
