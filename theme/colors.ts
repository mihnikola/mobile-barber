/**
 * Color palettes (Phase 5.1: light + dark, D-024).
 *
 * Two kinds of keys:
 *  - design-system tokens (bg, surface, ink, accent …) — use these in restyled code
 *  - Phase 1 role names (legacy, one per old value) — still used by screens not yet restyled
 * During the redesign:
 *  - `darkPalette` = exactly today's colors (the app looks unchanged in dark mode)
 *  - `lightPalette` = the same roles mapped onto the design system's light tokens
 *    (Gentleman Barber DS: bg #f5f4f1, surface #ffffff, ink #141414, accent #b42318 …)
 * Screens are restyled onto design-token names in 5.5/5.6; legacy keys are removed then.
 *
 * Components read colors through `useTheme()` / `makeStyles()` (theme/ThemeProvider.tsx),
 * never by importing a palette directly.
 */
export const darkPalette = {
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
  surfaceItem: "#232126",
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
  /** RN named color "lightgray" */
  textLight: "#D3D3D3",

  /** Dimmed backdrop behind modals */
  overlay: "rgba(0, 0, 0, 0.88)",

  // Icons
  icon: "#687076",
  iconMuted: "#8A8888",

  // States
  disabled: "#5E5C5A",

  // Accents & status
  gold: "#FFD700",
  /** RN named color "yellow" */
  yellow: "#FFFF00",
  danger: "#F0705F", // design token (was #FF0000)
  dangerBright: "#FF3B30",
  link: "#00AEEF",
  linkAlt: "#2E78B7",
  brandBlue: "#4285A0",
  tint: "#0A7EA4",

  // Switch (settings toggle)
  switchTrackOff: "#767577",
  switchTrackOn: "#81B0FF",
  switchThumbOn: "#F5DD4B",
  switchThumbOff: "#F4F3F4",

  // ── Design system tokens (Gentleman Barber DS, dark) ──
  bg: "#0F0F0F",
  surface: "#1A1A1A",
  surfaceSunken: "#242424",
  line: "#2E2E2E",
  lineStrong: "#6B6862",
  ink: "#F2F0EB",
  inkMuted: "#A8A49C",
  inkFaint: "#8A867E",
  primary: "#F2F0EB",
  onPrimary: "#141414",
  accent: "#F0705F",
  accentSoft: "#3A1612",
  star: "#F2F0EB",
  success: "#6FCF97",
  successSoft: "#12301E",
  warning: "#F2B85C",
  warningSoft: "#33240A",
  dangerSoft: "#3A1612",
  focus: "#F0705F",
  scrim: "#000000B3",
};

export type Palette = { [K in keyof typeof darkPalette]: string };
export type ColorToken = keyof Palette;

/** Same roles on the design system's light tokens (provisional until 5.5/5.6 restyle). */
export const lightPalette: Palette = {
  white: "#FFFFFF",
  black: "#141414", // primary
  transparent: "transparent",

  background: "#F5F4F1", // bg
  backgroundDeep: "#EBE9E4", // surface-sunken
  surfaceMenu: "#FFFFFF",
  surfaceInput: "#FFFFFF",
  surfaceCard: "#FFFFFF",
  surfaceHome: "#FFFFFF",
  surfaceItem: "#FFFFFF",
  surfaceAvatar: "#EBE9E4",
  surfaceRaised: "#EBE9E4",
  surfaceIcon: "#EBE9E4",
  surfaceModal: "#FFFFFF",
  buttonDate: "#8C887F", // line-strong

  divider: "#DCD9D2", // line
  dividerStrong: "#DCD9D2",
  borderIcon: "#8C887F",
  borderAvatar: "#8C887F",

  text: "#141414", // ink
  textTertiary: "#5C5952", // ink-muted
  textInactive: "#5C5952",
  textSecondary: "#5C5952",
  textDeactivated: "#7A766E", // ink-faint
  placeholder: "#7A766E",
  textMuted: "#7A766E",
  textSubtle: "#7A766E",
  textOnLight: "#141414",
  textDark: "#141414",
  textLight: "#5C5952",

  overlay: "#14141499", // scrim

  icon: "#5C5952",
  iconMuted: "#7A766E",

  disabled: "#DCD9D2",

  gold: "#B42318", // accent (design: one accent colour)
  yellow: "#8A5300", // warning
  danger: "#B42318",
  dangerBright: "#B42318",
  link: "#B42318",
  linkAlt: "#B42318",
  brandBlue: "#141414",
  tint: "#B42318",

  switchTrackOff: "#8C887F",
  switchTrackOn: "#141414",
  switchThumbOn: "#FFFFFF",
  switchThumbOff: "#FFFFFF",

  // ── Design system tokens (Gentleman Barber DS, light) ──
  bg: "#F5F4F1",
  surface: "#FFFFFF",
  surfaceSunken: "#EBE9E4",
  line: "#DCD9D2",
  lineStrong: "#8C887F",
  ink: "#141414",
  inkMuted: "#5C5952",
  inkFaint: "#7A766E",
  primary: "#141414",
  onPrimary: "#FFFFFF",
  accent: "#B42318",
  accentSoft: "#FBE9E6",
  star: "#141414",
  success: "#1E6B3A",
  successSoft: "#E3F2E8",
  warning: "#8A5300",
  warningSoft: "#FCEFD7",
  dangerSoft: "#FBE9E6",
  focus: "#B42318",
  scrim: "#14141499",
};

export const palettes = { dark: darkPalette, light: lightPalette } as const;
export type ColorScheme = keyof typeof palettes;

/**
 * @deprecated Static dark palette for code that runs outside React (none should remain after 5.1).
 * Inside components use `useTheme().colors` or `makeStyles`.
 */
export const colors = darkPalette;
