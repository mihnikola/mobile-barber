/**
 * Date / time formatting (Phase 3.5, moved from helpers/index.js; logic unchanged, duplicated
 * month tables merged). All functions are pure: pass the language code (`localization.code`).
 * Tested in lib/date/__tests__.
 */
import { dayNamesEng } from "@/helpers/locale-calendar-en";
import { dayNamesRs } from "@/helpers/locale-calendar-rs";

const MONTHS_SR = ["januar", "februar", "mart", "april", "maj", "jun", "jul", "avgust", "septembar", "oktobar", "novembar", "decembar"];
const MONTHS_EN = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
const MONTHS_SHORT = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const weekdaysFor = (code: string): string[] => (code === "en" ? dayNamesEng : dayNamesRs);

/** "15. Mart 2025." ("sr" → Serbian month names, anything else → English). */
function formatDayMonthYear(day: string, month: string, year: string, code: string) {
  const monthName = (code === "sr" ? MONTHS_SR : MONTHS_EN)[parseInt(month, 10) - 1];
  return `${day}. ${capitalize(monthName)} ${year}.`;
}

/** "09:30" + 45 (+ extra) minutes → "10:15". */
export function addMinutesToTime(inputTime: string, minutesToAdd: number, otherServiceDuration = 0) {
  const [hours, minutes] = inputTime?.split(":") as [string, string];
  const date = new Date();
  date.setHours(Number(hours), Number(minutes), 0, 0);
  // same evaluation order as before (matters if a duration ever arrives as a string)
  const total = otherServiceDuration + minutesToAdd;
  date.setMinutes(date.getMinutes() + total);
  if (Number.isNaN(date.getTime())) return ""; // missing time/duration: no "NaN:NaN" (Phase 5.7)
  return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
}

/** "16:00" + "16:50" → "16:00 – 16:50"; a missing end shows only the start (Phase 5.7). */
export function formatTimeRange(start?: string | null, end?: string | null) {
  if (!start) return "";
  return end ? `${start} – ${end}` : start;
}

/** "15. 03. 2025" → "MAR". */
export function convertToMonthName(dateString: string) {
  const monthNumber = Number(dateString.split(".")[1].trim());
  return MONTHS_SHORT[monthNumber - 1];
}

/** "15/03/2025, 10:00" → "2025-03-15". */
export function convertDayInitalValue(data: string) {
  const [day, month, year] = data.split(",")[0].split("/");
  return `${year}-${month}-${day}`;
}

/** "15. 03. 2025" → "15". */
export function convertToDay(dateString: string) {
  return dateString.split(".")[0];
}

/** "15.03.2025 9:5" → "09:05". */
export function convertToDayTime(dateString: string) {
  const time = dateString.split(" ")[1];
  const [hours, minutes] = time.split(":");
  const hh = hours.length === 1 ? "0" + hours : hours;
  const mm = minutes.length === 1 ? "0" + minutes : minutes;
  return `${hh}:${mm}`;
}

/** Device UTC offset as "+2", "-5" or "+0". */
export function getCurrentUTCOffset() {
  const offsetHours = -new Date().getTimezoneOffset() / 60;
  if (offsetHours > 0) return `+${offsetHours}`;
  if (offsetHours < 0) return `${offsetHours}`;
  return "+0";
}

/** Current time at the given offset ("+2") as "YYYY-MM-DDTHH:mm:ss". */
export function getTimeForUTCOffset(offsetHours: string) {
  const now = new Date();
  const hoursValue = parseInt(offsetHours.substring(1));
  const shift = offsetHours.includes("-") ? -hoursValue : hoursValue;
  const target = new Date(
    Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      now.getUTCHours() + shift,
      now.getUTCMinutes(),
      now.getUTCSeconds(),
      now.getUTCMilliseconds(),
    ),
  );
  const p = (n: number) => n.toString().padStart(2, "0");
  return `${target.getUTCFullYear()}-${p(target.getUTCMonth() + 1)}-${p(target.getUTCDate())}T${p(target.getUTCHours())}:${p(target.getUTCMinutes())}:${p(target.getUTCSeconds())}`;
}

/** Date → "<serbian weekday> DD-MM-YYYY" (calendar event title). */
export function convertNameAndDate(value: string | number | Date) {
  const date = new Date(value);
  const dayNameSr = date.toLocaleDateString("sr-RS", { weekday: "long" });
  return `${dayNameSr} ${String(date.getDate()).padStart(2, "0")}-${String(date.getMonth() + 1).padStart(2, "0")}-${date.getFullYear()}`;
}

/** "15. 03. 2025" → "Subota 15. Mart 2025." */
export function convertDateDetails(dateStr: string, code: string) {
  const [day, month, year] = dateStr.split(".").map((s) => s.trim());
  const dateObj = new Date(Number(year), Number(month) - 1, Number(day));
  return `${weekdaysFor(code)[dateObj.getDay()]} ${formatDayMonthYear(day, month, year, code)}`;
}

/** ISO/date value → "Subota 15. Mart 2025." (weekday and date both in local time — B24 fixed). */
export function convertDate(item: string | number | Date, code: string) {
  const date = new Date(item);
  const year = String(date.getFullYear());
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${weekdaysFor(code)[date.getDay()]} ${formatDayMonthYear(day, month, year, code)}`;
}
