import { brand } from "@/theme/brands";

/**
 * Brand-specific wording on top of the base locales (D-025). Only the keys listed here change;
 * Gentleman (staffWord "barbers") uses the base texts as they are.
 */
const TEAM = {
  sr: {
    TABS: { BARBERS: "Tim" },
    BARBERS: { title: "Izaberi stilistkinju", notFound: "Trenutno nema slobodnih članica tima" },
  },
  en: {
    TABS: { BARBERS: "Team" },
    BARBERS: { title: "Choose your stylist", notFound: "No team members available right now" },
  },
} as const;

type Section = Record<string, unknown>;

/** Returns the locale with the active brand's wording applied (shallow merge per section). */
export function withBrandWording<T extends Record<string, unknown>>(locale: T, code: "sr" | "en"): T {
  if (brand.details.staffWord !== "team") return locale;
  const overrides = TEAM[code] as Record<string, Section>;
  const out: Record<string, unknown> = { ...locale };
  for (const [section, values] of Object.entries(overrides)) {
    out[section] = { ...(locale[section] as Section), ...values };
  }
  return out as T;
}
