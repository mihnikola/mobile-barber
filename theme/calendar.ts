import type { Palette } from "./colors";
import { fonts } from "./typography";

/** Theme for react-native-calendars for the current palette (Phase 5.1: theme-aware). */
export const getCalendarTheme = (colors: Palette) => ({
  textDayFontFamily: fonts.bold,
  textSectionTitleFontFamily: fonts.bold,
  monthTextColor: colors.text,
  backgroundColor: colors.background,
  calendarBackground: colors.background,
  textSectionTitleColor: colors.text,
  selectedDayBackgroundColor: colors.text,
  selectedDayTextColor: colors.text,
  todayTextColor: colors.text,
  dayTextColor: colors.text,
  textMonthFontFamily: fonts.bold,
  textDisabledColor: colors.textMuted,
});
