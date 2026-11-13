import type { ViewStyle } from "react-native";

import { brand } from "./brands";
import { lightPalette, type Palette } from "./colors";

const isLight = (colors: Palette) => colors === lightPalette;

/**
 * Card shadow of the active brand (`shadow-card`): light theme only — in dark the cards separate by
 * tone. Brands with `cardBorder` (Atelier) also get a hairline `line` border in both themes.
 */
export function cardShadow(colors: Palette): ViewStyle {
  const { card, color, cardBorder } = brand.shadows;
  const border: ViewStyle = cardBorder ? { borderWidth: 1, borderColor: colors.line } : {};
  if (!isLight(colors)) return { ...border, shadowOpacity: 0, elevation: 0 };
  return {
    ...border,
    shadowColor: color,
    shadowOffset: { width: 0, height: card.offsetY },
    shadowOpacity: card.opacity,
    shadowRadius: card.radius,
    elevation: card.elevation,
  };
}

/** Bottom bars and sheets (`shadow-sheet`): shadow upwards, both themes. */
export function sheetShadow(colors: Palette): ViewStyle {
  const { sheet, color } = brand.shadows;
  const light = isLight(colors);
  return {
    shadowColor: light ? color : "#000000",
    shadowOffset: { width: 0, height: sheet.offsetY },
    shadowOpacity: light ? sheet.opacityLight : sheet.opacityDark,
    shadowRadius: sheet.radius,
    elevation: sheet.elevation,
  };
}
