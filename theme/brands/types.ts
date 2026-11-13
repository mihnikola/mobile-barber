/** Color tokens of one theme (design system tokens.json → color). */
export type Palette = {
  bg: string;
  surface: string;
  surfaceSunken: string;
  line: string;
  lineStrong: string;
  ink: string;
  inkMuted: string;
  inkFaint: string;
  primary: string;
  onPrimary: string;
  accent: string;
  accentSoft: string;
  /** Decorative tint for image/avatar placeholders (Atelier); Gentleman maps it to surfaceSunken. */
  blush: string;
  star: string;
  success: string;
  successSoft: string;
  warning: string;
  warningSoft: string;
  danger: string;
  dangerSoft: string;
  focus: string;
  scrim: string;
  transparent: string;
};

/** Corner radii (tokens.json → radius) + the per-brand choices for buttons, avatars and checkboxes. */
export type Radii = {
  xs: number;
  /** inputs, time slots */
  sm: number;
  /** date tiles, thumbnails, icon tiles */
  md: number;
  /** cards, lists, dialogs */
  lg: number;
  pill: number;
  button: number;
  avatar: number;
  check: number;
};

/** Shadows (tokens.json → shadow) as React Native props; dark-theme card shadow is "none" in both brands. */
export type Shadows = {
  color: string;
  card: { offsetY: number; radius: number; opacity: number; elevation: number };
  sheet: { offsetY: number; radius: number; opacityLight: number; opacityDark: number; elevation: number };
  /** Atelier cards also get a hairline `line` border. */
  cardBorder: boolean;
};

export type Brand = {
  id: BrandId;
  /** Human name (working name until the client's real one). */
  name: string;
  palettes: { light: Palette; dark: Palette };
  radii: Radii;
  shadows: Shadows;
};

export type BrandId = "gentleman" | "atelier";
