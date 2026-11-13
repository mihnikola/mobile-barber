import React, { useMemo, useState } from "react";
import { View } from "react-native";

import { useLocalization } from "@/context/LocalizationContext";
import { fonts, makeStyles, radii } from "@/theme";
import { AppText, Icon, Pressable } from "@/components/ui";
import { dayShort, fromDateString, monthName, toDateString } from "./dateUtils";

/** How far ahead the strip goes (the old month calendar showed this month + 2). */
const MAX_WEEK_OFFSET = 9;

type Props = {
  /** Selected day, "YYYY-MM-DD". */
  selected?: string;
  onSelect: (dateString: string) => void;
};

/**
 * Week strip (design system `DatePicker`): 7 days starting today, arrows move by a week.
 * Sundays are crossed out and can't be picked (salon closed, as before). Past days are not shown.
 */
export default function WeekStrip({ selected, onSelect }: Props) {
  const styles = useStyles();
  const { localization } = useLocalization();
  const code = localization.code;
  const [weekOffset, setWeekOffset] = useState(0);

  const days = useMemo(() => {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    start.setDate(start.getDate() + weekOffset * 7);
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      return d;
    });
  }, [weekOffset]);

  // header shows the month of the selected day when it's in view, otherwise of the first visible day
  const selectedDate = selected ? fromDateString(selected) : undefined;
  const inView = selectedDate && days.some((d) => toDateString(d) === selected);
  const labelDate = inView && selectedDate ? selectedDate : days[0];
  const label = `${monthName(labelDate, code)} ${labelDate.getFullYear()}`;

  const canPrev = weekOffset > 0;
  const canNext = weekOffset < MAX_WEEK_OFFSET;

  return (
    <View>
      <View style={styles.header}>
        <AppText style={styles.month}>{label}</AppText>
        <View style={styles.nav}>
          <Pressable
            accessibilityLabel="Previous week"
            disabled={!canPrev}
            onPress={() => setWeekOffset((w) => Math.max(0, w - 1))}
            style={[styles.navBtn, !canPrev && styles.navBtnDisabled]}
          >
            <Icon name="back" size={18} color={canPrev ? "ink" : "inkFaint"} />
          </Pressable>
          <Pressable
            accessibilityLabel="Next week"
            disabled={!canNext}
            onPress={() => setWeekOffset((w) => Math.min(MAX_WEEK_OFFSET, w + 1))}
            style={[styles.navBtn, !canNext && styles.navBtnDisabled]}
          >
            <Icon name="chevronRight" size={18} color={canNext ? "ink" : "inkFaint"} />
          </Pressable>
        </View>
      </View>

      <View style={styles.dates}>
        {days.map((d) => {
          const value = toDateString(d);
          const closed = d.getDay() === 0;
          const isSelected = value === selected;
          return (
            <Pressable
              key={value}
              disabled={closed}
              accessibilityState={{ selected: isSelected, disabled: closed }}
              onPress={() => onSelect(value)}
              style={[styles.date, isSelected && styles.dateSelected, closed && styles.dateClosed]}
            >
              <AppText style={[styles.dow, isSelected && styles.onPrimary, closed && styles.faint]}>
                {dayShort(d, code)}
              </AppText>
              <AppText
                style={[styles.num, isSelected && styles.onPrimary, closed && [styles.faint, styles.strike]]}
              >
                {d.getDate()}
              </AppText>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const useStyles = makeStyles((colors) => ({
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 8 },
  month: { fontFamily: fonts.sansSemiBold, fontSize: 15, lineHeight: 20, color: colors.ink },
  nav: { flexDirection: "row", gap: 6 },
  navBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: colors.lineStrong,
    alignItems: "center",
    justifyContent: "center",
  },
  navBtnDisabled: { borderColor: colors.line },
  dates: { flexDirection: "row", gap: 4 },
  date: {
    flex: 1,
    alignItems: "center",
    gap: 1,
    paddingTop: 6,
    paddingBottom: 6,
    borderRadius: radii.md,
    backgroundColor: colors.surface,
  },
  dateSelected: { backgroundColor: colors.primary },
  dateClosed: { backgroundColor: "transparent" },
  dow: {
    fontFamily: fonts.sansSemiBold,
    fontSize: 10,
    lineHeight: 14,
    letterSpacing: 0.4,
    textTransform: "uppercase",
    color: colors.inkMuted,
  },
  num: { fontFamily: fonts.sansSemiBold, fontSize: 16, lineHeight: 20, color: colors.ink },
  onPrimary: { color: colors.onPrimary },
  faint: { color: colors.inkFaint },
  strike: { textDecorationLine: "line-through" },
}));
