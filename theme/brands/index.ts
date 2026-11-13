import Constants from "expo-constants";

import { atelier } from "./atelier";
import { gentleman } from "./gentleman";
import type { Brand, BrandId } from "./types";

export const brands: Record<BrandId, Brand> = { gentleman, atelier };

/**
 * Active brand, chosen per build: `BRAND=atelier npx expo start` / `eas build` env
 * → app.config.ts `extra.brand`. Unknown or missing → gentleman.
 */
const requested = Constants.expoConfig?.extra?.brand as string | undefined;
export const brand: Brand = (requested && brands[requested as BrandId]) || gentleman;

export type { Brand, BrandId, Palette, Radii, Shadows } from "./types";
