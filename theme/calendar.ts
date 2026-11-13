import type { Palette } from "./colors";
import { fonts } from "./typography";

/** Theme for react-native-calendars for the current palette (Phase 5.1: theme-aware). */
export const getCalendarTheme = (colors: Palette) => ({
  textDayFontFamily: fonts.sansSemiBold,
  textSectionTitleFontFamily: fonts.sansSemiBold,
  monthTextColor: colors.ink,
  backgroundColor: colors.bg,
  calendarBackground: colors.bg,
  textSectionTitleColor: colors.ink,
  selectedDayBackgroundColor: colors.primary,
  selectedDayTextColor: colors.onPrimary,
  todayTextColor: colors.accent,
  dayTextColor: colors.ink,
  textMonthFontFamily: fonts.displaySemiBold,
  textDisabledColor: colors.inkFaint,
});
