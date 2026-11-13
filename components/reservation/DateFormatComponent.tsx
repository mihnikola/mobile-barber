import { convertToDay, convertToDayTime, convertToMonthName } from "@/lib/date";
import React from "react";
import { View } from "react-native";
import type { ApiRecord } from "@/context/types";
import { fonts, makeStyles } from "@/theme";
import { AppText } from "@/components/ui";

/** Date tile of an appointment card (design system `ds-appt__date`): month, big day, time. */
const DateFormatComponent = ({ item, rejected }: { item: ApiRecord; rejected?: number }) => {
  const styles = useStyles();
  const muted = item?.past && !rejected;
  return (
    <View style={styles.tile}>
      <AppText variant="caption" color="inkMuted" style={styles.month}>
        {convertToMonthName(item?.startDate)}
      </AppText>
      <AppText style={[styles.day, muted && styles.muted]}>{convertToDay(item?.startDate)}</AppText>
      <AppText variant="caption" color="inkMuted">
        {convertToDayTime(item?.startDate)}
      </AppText>
    </View>
  );
};

const useStyles = makeStyles((colors) => ({
  tile: {
    width: 60,
    alignSelf: "flex-start",
    alignItems: "center",
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: colors.surfaceSunken,
  },
  month: { fontFamily: fonts.sansSemiBold, textTransform: "uppercase", letterSpacing: 0.72 },
  day: { fontFamily: fonts.displaySemiBold, fontSize: 28, lineHeight: 32, color: colors.ink },
  muted: { color: colors.inkMuted },
}));

export default DateFormatComponent;
