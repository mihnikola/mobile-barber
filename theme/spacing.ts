import { brand } from "./brands";

/** 4-pt spacing scale (same in every brand). */
export const spacing = {
  none: 0,
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
} as const;

/**
 * Corner radii of the active brand: `sm` inputs/slots · `md` tiles/thumbnails · `lg` cards/lists/dialogs ·
 * `button` / `avatar` / `check` per brand (Gentleman 8/12/4, Atelier pills).
 */
export const radii = brand.radii;
