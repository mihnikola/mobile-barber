/**
 * Typography tokens.
 *
 * Font files are Barlow Condensed (loaded in app/_layout.tsx). They were previously
 * registered under the misleading alias "OldStandard-*".
 */
export const fonts = {
  regular: "BarlowCondensed-Regular",
  bold: "BarlowCondensed-Bold",
  italic: "BarlowCondensed-Italic",
} as const;

/**
 * Font size scale. Covers the sizes used today (most frequent: 14, 16, 18, 20, 22).
 * Literal sizes are replaced by these in Phase 2 together with the AppText variants.
 */
export const fontSize = {
  xxs: 9,
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 22,
  h3: 25,
  h2: 28,
  h1: 32,
  display: 40,
} as const;
