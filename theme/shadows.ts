import type { ViewStyle } from "react-native";

import { brand } from "./brands";
import { lightPalette, type Palette } from "./colors";

const isLight = (colors: Palette) => colors === lightPalette;

/** "#5A2741" + 0.06 → "rgba(90, 39, 65, 0.06)" */
const rgba = (hex: string, alpha: number) => {
  const n = parseInt(hex.replace("#", "").slice(0, 6), 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`;
};

/*
 * Shadows use CSS-style `boxShadow` (RN 0.76+, both platforms), not Android `elevation`:
 * elevation shadows are drawn outside the view's own layer, so during the bottom-tab cross-fade
 * they showed up as dark boxes fading out separately from the cards. boxShadow fades with the view.
 */

/**
 * Card shadow of the active brand (`shadow-card`): light theme only — in dark the cards separate by
 * tone. Brands with `cardBorder` (Atelier) also get a hairline `line` border in both themes.
 */
export function cardShadow(colors: Palette): ViewStyle {
  const { card, color, cardBorder } = brand.shadows;
  const border: ViewStyle = cardBorder ? { borderWidth: 1, borderColor: colors.line } : {};
  if (!isLight(colors)) return border;
  return { ...border, boxShadow: `0 ${card.offsetY}px ${card.radius}px ${rgba(color, card.opacity)}` };
}

/** Bottom bars and sheets (`shadow-sheet`): shadow upwards, both themes. */
export function sheetShadow(colors: Palette): ViewStyle {
  const { sheet, color } = brand.shadows;
  const light = isLight(colors);
  const shade = light ? rgba(color, sheet.opacityLight) : rgba("#000000", sheet.opacityDark);
  return { boxShadow: `0 ${sheet.offsetY}px ${sheet.radius}px ${shade}` };
}
