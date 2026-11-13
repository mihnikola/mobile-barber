/**
 * Typography tokens of the active brand (theme/brands → type).
 *
 * Gentleman: Barlow Condensed display (uppercase) + Inter. Atelier: Fraunces display (serif, italic
 * screen titles) + DM Sans. Font files live in assets/fonts; file names = family keys = PostScript
 * names, so the same name works on iOS and Android. Registered in app/_layout.tsx via `fontAssets`.
 */
import type { TextStyle } from "react-native";

import { brand } from "./brands";
import type { DisplayStyle } from "./brands/types";

const t = brand.type;

export const fonts = {
  displaySemiBold: t.fonts.display,
  displayBold: t.fonts.displayBold,
  displayItalic: t.fonts.displayItalic,
  sans: t.fonts.sans,
  sansMedium: t.fonts.sansMedium,
  sansSemiBold: t.fonts.sansSemiBold,
  sansBold: t.fonts.sansBold,
};

/** Font files of the active brand only (name → asset). */
export const fontAssets = t.files;

const px = (size: number, em: number) => Math.round(size * em * 100) / 100;

/**
 * Case + tracking for display text set by hand (`fontFamily: fonts.displaySemiBold`) at `size`.
 * `uppercaseTracking` (em) overrides the brand's tracking where the uppercase design asks for more
 * (e.g. wordmark .08em); a sentence-case brand gets no tracking.
 */
export const displayText = (size: number, uppercaseTracking?: number): TextStyle => ({
  textTransform: t.displayCase,
  letterSpacing: t.displayCase === "uppercase" ? px(size, uppercaseTracking ?? t.displayTracking) : 0,
});

/** Case + tracking for buttons and segmented tabs (Gentleman uppercase, Atelier sentence case). */
export const buttonText = (size: number, uppercaseTracking?: number): TextStyle => ({
  textTransform: t.buttonCase,
  letterSpacing: t.buttonCase === "uppercase" ? px(size, uppercaseTracking ?? t.buttonTracking) : 0,
});

const display = (s: DisplayStyle): TextStyle => ({
  fontFamily: s.italic ? t.fonts.displayItalic : s.bold ? t.fonts.displayBold : t.fonts.display,
  fontSize: s.fontSize,
  lineHeight: s.lineHeight,
  ...displayText(s.fontSize),
});

/**
 * Design-system type scale (tokens.json → type.groups). Display styles come from the brand;
 * text styles are the same in both brands (only the sans family differs).
 */
export const typeScale = {
  displayXl: display(t.scale.displayXl),
  displayLg: display(t.scale.displayLg),
  displayMd: display(t.scale.displayMd),
  title: { fontFamily: fonts.sansSemiBold, fontSize: 20, lineHeight: 26 },
  bodyLg: { fontFamily: fonts.sans, fontSize: 17, lineHeight: 24 },
  body: { fontFamily: fonts.sans, fontSize: 16, lineHeight: 22 },
  bodyStrong: { fontFamily: fonts.sansSemiBold, fontSize: 16, lineHeight: 22 },
  bodySm: { fontFamily: fonts.sans, fontSize: 14, lineHeight: 20 },
  label: { fontFamily: fonts.sansSemiBold, fontSize: 13, lineHeight: 16 },
  caption: { fontFamily: fonts.sansMedium, fontSize: 12, lineHeight: 16 },
} satisfies Record<string, TextStyle>;

export type TypeStyle = keyof typeof typeScale;
