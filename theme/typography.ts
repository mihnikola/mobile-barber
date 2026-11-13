/**
 * Typography tokens.
 *
 * Display: Barlow Condensed (headings, uppercase). Text: Inter (Phase 5.2, D-024).
 * All families are registered in app/_layout.tsx under the names below.
 */
import type { TextStyle } from "react-native";

export const fonts = {
  // Barlow Condensed — the app's original font (used everywhere until screens are restyled)
  regular: "BarlowCondensed-Regular",
  bold: "BarlowCondensed-Bold",
  italic: "BarlowCondensed-Italic",
  // Design system
  displaySemiBold: "BarlowCondensed-SemiBold",
  displayBold: "BarlowCondensed-Bold",
  sans: "Inter-Regular",
  sansMedium: "Inter-Medium",
  sansSemiBold: "Inter-SemiBold",
  sansBold: "Inter-Bold",
} as const;

/** Font files to load (name → asset). */
export const fontAssets = {
  [fonts.regular]: require("../assets/fonts/BarlowCondensed-Regular.ttf"),
  [fonts.bold]: require("../assets/fonts/BarlowCondensed-Bold.ttf"),
  [fonts.italic]: require("../assets/fonts/BarlowCondensed-Italic.ttf"),
  [fonts.displaySemiBold]: require("@expo-google-fonts/barlow-condensed/600SemiBold/BarlowCondensed_600SemiBold.ttf"),
  [fonts.sans]: require("@expo-google-fonts/inter/400Regular/Inter_400Regular.ttf"),
  [fonts.sansMedium]: require("@expo-google-fonts/inter/500Medium/Inter_500Medium.ttf"),
  [fonts.sansSemiBold]: require("@expo-google-fonts/inter/600SemiBold/Inter_600SemiBold.ttf"),
  [fonts.sansBold]: require("@expo-google-fonts/inter/700Bold/Inter_700Bold.ttf"),
};

/**
 * Legacy font size scale (Phase 1). Kept for screens not yet restyled.
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

/**
 * Design-system type scale (Gentleman Barber DS `tokens.json` → type.groups).
 * Display styles are uppercase Barlow Condensed; text styles are Inter.
 * letterSpacing 0.01em → px.
 */
export const typeScale = {
  displayXl: { fontFamily: fonts.displayBold, fontSize: 44, lineHeight: 44, letterSpacing: 0.44, textTransform: "uppercase" },
  displayLg: { fontFamily: fonts.displaySemiBold, fontSize: 34, lineHeight: 36, letterSpacing: 0.34, textTransform: "uppercase" },
  displayMd: { fontFamily: fonts.displaySemiBold, fontSize: 22, lineHeight: 26, letterSpacing: 0.22, textTransform: "uppercase" },
  title: { fontFamily: fonts.sansSemiBold, fontSize: 20, lineHeight: 26 },
  bodyLg: { fontFamily: fonts.sans, fontSize: 17, lineHeight: 24 },
  body: { fontFamily: fonts.sans, fontSize: 16, lineHeight: 22 },
  bodyStrong: { fontFamily: fonts.sansSemiBold, fontSize: 16, lineHeight: 22 },
  bodySm: { fontFamily: fonts.sans, fontSize: 14, lineHeight: 20 },
  label: { fontFamily: fonts.sansSemiBold, fontSize: 13, lineHeight: 16 },
  caption: { fontFamily: fonts.sansMedium, fontSize: 12, lineHeight: 16 },
} as const satisfies Record<string, TextStyle>;

export type TypeStyle = keyof typeof typeScale;
