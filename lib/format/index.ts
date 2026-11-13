/** Small display formatters (Phase 3.5, moved from helpers/index.js). */

/** 4.25 → 4.3 (one decimal). `undefined` → NaN, as before. */
export const roundValue = (rating?: number) => Number(rating?.toFixed(1));

/** "Marko Marković" → "MM", "Ana" → "AN", 3+ words → first two letters of the first word. */
export const getInitialsName = (name?: string | null) => {
  if (!name) return undefined;
  const words = name.trim().split(/\s+/);
  if (words.length > 2) return words[0].substring(0, 2).toUpperCase();
  if (words.length === 2) return (words[0][0] + words[1][0]).toUpperCase();
  if (words.length === 1 && words[0] !== "") return words[0].substring(0, 2).toUpperCase();
  return "";
};

/* ---------- Display formats (Phase 5.7): never show NaN / undefined ---------- */

const isNum = (v: unknown): v is number | string => v !== null && v !== "" && Number.isFinite(Number(v));

/** 30 → "30 min"; missing / invalid → "". */
export const formatDuration = (minutes?: number | string | null) => (isNum(minutes) ? `${Number(minutes)} min` : "");

/**
 * 1200 → "1.200 RSD" (sr) / "1,200 RSD" (en); missing / invalid → "".
 * Grouping done by hand: Hermes' Intl number support varies by build.
 */
export const formatPrice = (value?: number | string | null, code: string = "sr") => {
  if (!isNum(value)) return "";
  const n = Math.round(Number(value));
  const sep = code === "en" ? "," : ".";
  const grouped = String(Math.abs(n)).replace(/\B(?=(\d{3})+(?!\d))/g, sep);
  return `${n < 0 ? "-" : ""}${grouped} RSD`;
};

/** 4.25 → "4.3"; no rating yet → "–". */
export const formatRating = (rating?: number | string | null) => (isNum(rating) ? String(roundValue(Number(rating))) : "–");
