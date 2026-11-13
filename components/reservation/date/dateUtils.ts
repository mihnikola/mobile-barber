import { dayNamesShortEng, monthNamesEng } from "@/helpers/locale-calendar-en";
import { dayNamesShortRs, monthNamesRs } from "@/helpers/locale-calendar-rs";

/** Local "YYYY-MM-DD" (same format the old calendar's `dateString` had). */
export function toDateString(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

/** "YYYY-MM-DD" → local Date at midnight (no UTC shift). */
export function fromDateString(s: string) {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, (m ?? 1) - 1, d ?? 1);
}

export const dayShort = (d: Date, code: string) => (code === "en" ? dayNamesShortEng : dayNamesShortRs)[d.getDay()];
export const monthName = (d: Date, code: string) => (code === "en" ? monthNamesEng : monthNamesRs)[d.getMonth()];

/** Summary-bar date: "uto, 6. okt" (sr) / "Tue, Oct 6" (en). */
export function shortDateLabel(d: Date, code: string) {
  const month = monthName(d, code).slice(0, 3);
  return code === "en"
    ? `${dayShort(d, code)}, ${month} ${d.getDate()}`
    : `${dayShort(d, code).toLowerCase()}, ${d.getDate()}. ${month.toLowerCase()}`;
}
