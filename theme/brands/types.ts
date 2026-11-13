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

/** One display style of the type scale (tokens.json → type.groups Display). */
export type DisplayStyle = { fontSize: number; lineHeight: number; bold?: boolean; italic?: boolean };

/**
 * Typography of a brand: font family names (= registered keys = PostScript names), the files,
 * and how display text is set (case, tracking) — Gentleman: uppercase condensed, Atelier: serif, italic titles.
 */
export type Typography = {
  fonts: {
    display: string;
    displayBold: string;
    /** Italic display face (Atelier screen titles); same as display when the brand has none. */
    displayItalic: string;
    sans: string;
    sansMedium: string;
    sansSemiBold: string;
    sansBold: string;
  };
  /** Font family name → bundled file (require). */
  files: Record<string, number>;
  displayCase: "uppercase" | "none";
  /** letterSpacing as a fraction of the font size (0.01em → 0.01). */
  displayTracking: number;
  scale: { displayXl: DisplayStyle; displayLg: DisplayStyle; displayMd: DisplayStyle };
  /** Buttons and segmented tabs (Gentleman: uppercase with tracking). */
  buttonCase: "uppercase" | "none";
  buttonTracking: number;
};

/** Wording / icon details that differ per brand. */
export type BrandDetails = {
  /** Icon for "book" (tab bar, hero): scissors for barbers, sparkle for the salon. */
  bookIcon: "scissors" | "sparkle";
  /** Staff wording: "barbers" (Frizeri) or "team" (Tim). */
  staffWord: "barbers" | "team";
};

export type Brand = {
  id: BrandId;
  /** Human name (working name until the client's real one). */
  name: string;
  palettes: { light: Palette; dark: Palette };
  radii: Radii;
  shadows: Shadows;
  type: Typography;
  details: BrandDetails;
};

export type BrandId = "gentleman" | "atelier";
