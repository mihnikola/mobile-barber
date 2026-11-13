import type { ViewStyle } from "react-native";

import { lightPalette, type Palette } from "./colors";

const isLight = (colors: Palette) => colors.bg === lightPalette.bg;

/**
 * Design-system shadows (tokens `shadow-card` / `shadow-sheet`).
 * Card: light theme only — the design's 0 1px 2px @6% is close to invisible on phones, so it is
 * slightly stronger here (iOS 1px/3px @8%, Android elevation 2). Dark theme: none, cards separate by tone.
 */
export function cardShadow(colors: Palette): ViewStyle {
  if (!isLight(colors)) return { shadowOpacity: 0, elevation: 0 };
  return {
    shadowColor: "#141414",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  };
}

/** Bottom bars and sheets: shadow upwards (0 -8px 24px), both themes. */
export function sheetShadow(colors: Palette): ViewStyle {
  return {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: isLight(colors) ? 0.08 : 0.5,
    shadowRadius: 24,
    elevation: 12,
  };
}
