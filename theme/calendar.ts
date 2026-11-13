import { colors } from "./colors";
import { fonts } from "./typography";

/** Theme for react-native-calendars (moved from helpers/index.js in Phase 3.5). */
export const calendarTheme = {
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
};
