/**
 * Color palettes — Gentleman Barber design system tokens (tokens.json), dark + light (D-024).
 * Components read colors through `useTheme()` / `makeStyles()` (theme/ThemeProvider.tsx).
 */
export const darkPalette = {
  bg: "#0F0F0F", // screen background
  surface: "#1A1A1A", // cards, lists, sheets (on bg)
  surfaceSunken: "#242424", // sunken surfaces: thumbnails, inactive chips, disabled
  line: "#2E2E2E", // hairline dividers
  lineStrong: "#6B6862", // control borders (3:1)
  ink: "#F2F0EB", // primary text and icons
  inkMuted: "#A8A49C", // secondary text
  inkFaint: "#8A867E", // disabled / placeholder
  primary: "#F2F0EB", // main button, selected date/slot/tab
  onPrimary: "#141414", // text/icons on primary
  accent: "#F0705F", // brand accent (barber-pole red): active nav, availability, price in summary
  accentSoft: "#3A1612", // tinted background behind accent text
  star: "#F2F0EB", // filled rating stars (monochrome brand)
  success: "#6FCF97", // Potvrđeno text
  successSoft: "#12301E", // Potvrđeno background
  warning: "#F2B85C", // Na čekanju text
  warningSoft: "#33240A", // Na čekanju background
  danger: "#F0705F", // destructive actions, Otkazano, errors
  dangerSoft: "#3A1612", // Otkazano background
  focus: "#F0705F", // focus rings / focused field border
  scrim: "#000000B3", // backdrop behind dialogs
  transparent: "transparent",
};

export type Palette = { [K in keyof typeof darkPalette]: string };
export type ColorToken = keyof Palette;

export const lightPalette: Palette = {
  bg: "#F5F4F1", // screen background
  surface: "#FFFFFF", // cards, lists, sheets (on bg)
  surfaceSunken: "#EBE9E4", // sunken surfaces: thumbnails, inactive chips, disabled
  line: "#DCD9D2", // hairline dividers
  lineStrong: "#8C887F", // control borders (3:1)
  ink: "#141414", // primary text and icons
  inkMuted: "#5C5952", // secondary text
  inkFaint: "#7A766E", // disabled / placeholder
  primary: "#141414", // main button, selected date/slot/tab
  onPrimary: "#FFFFFF", // text/icons on primary
  accent: "#B42318", // brand accent (barber-pole red): active nav, availability, price in summary
  accentSoft: "#FBE9E6", // tinted background behind accent text
  star: "#141414", // filled rating stars (monochrome brand)
  success: "#1E6B3A", // Potvrđeno text
  successSoft: "#E3F2E8", // Potvrđeno background
  warning: "#8A5300", // Na čekanju text
  warningSoft: "#FCEFD7", // Na čekanju background
  danger: "#B42318", // destructive actions, Otkazano, errors
  dangerSoft: "#FBE9E6", // Otkazano background
  focus: "#B42318", // focus rings / focused field border
  scrim: "#14141499", // backdrop behind dialogs
  transparent: "transparent",
};

export const palettes = { dark: darkPalette, light: lightPalette } as const;
export type ColorScheme = keyof typeof palettes;

/**
 * @deprecated Static dark palette for code that runs outside React.
 * Inside components use `useTheme().colors` or `makeStyles`.
 */
export const colors = darkPalette;
