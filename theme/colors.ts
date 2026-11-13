/**
 * Color palettes of the active brand (theme/brands, chosen per build via BRAND → app.config.ts).
 * Components read colors through `useTheme()` / `makeStyles()` (theme/ThemeProvider.tsx).
 */
import { brand } from "./brands";
import type { Palette } from "./brands/types";

export type { Palette };
export type ColorToken = keyof Palette;

export const darkPalette: Palette = brand.palettes.dark;
export const lightPalette: Palette = brand.palettes.light;

export const palettes = { dark: darkPalette, light: lightPalette } as const;
export type ColorScheme = keyof typeof palettes;

/**
 * @deprecated Static dark palette for code that runs outside React.
 * Inside components use `useTheme().colors` or `makeStyles`.
 */
export const colors = darkPalette;
