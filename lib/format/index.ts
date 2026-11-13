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
