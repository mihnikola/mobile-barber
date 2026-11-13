import { convertToDay, convertToDayTime, convertToMonthName } from "@/lib/date";
import React from "react";
import { View } from "react-native";
import { fonts, makeStyles } from "@/theme";
import { AppText } from "@/components/ui";

const DateFormatComponent = ({ item, rejected }) => {
  const styles = useStyles();
  return (
    <View
      style={
        item?.past && !rejected
          ? styles.dateContainerPast
          : styles.dateContainer
      }
    >
      <AppText
        style={
          item?.past && !rejected ? styles.captureDatePast : styles.captureDate
        }
      >
        {convertToMonthName(item?.startDate)}
      </AppText>
      <AppText
        style={
          item?.past && !rejected
            ? styles.captureDateBoldPast
            : styles.captureDateBold
        }
      >
        {convertToDay(item?.startDate)}
      </AppText>
      <AppText
        style={
          item?.past && !rejected ? styles.captureDatePast : styles.captureDate
        }
      >
        {convertToDayTime(item?.startDate)}
      </AppText>
    </View>
  );
};

const useStyles = makeStyles((colors) => ({
  dateContainerPast: {
    borderWidth: 1,
    borderColor: colors.inkMuted,
    borderLeftWidth: 1,
    borderRadius: 20,

    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },

  dateContainer: {
    borderWidth: 1,
    borderColor: colors.inkMuted,
    borderLeftWidth: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 20,
  },
  captureDate: {
    fontSize: 18,
    color: colors.ink,
    textAlign: "center",
    fontFamily: fonts.sans,
  },

  captureDatePast: {
    fontSize: 18,
    textAlign: "center",
    fontFamily: fonts.sans,
    color: colors.inkMuted,
  },

  captureDateBold: {
    fontSize: 20,
    color: colors.ink,
    fontFamily: fonts.sansSemiBold,
  },
  captureDateBoldPast: {
    fontSize: 20,
    color: colors.inkMuted,
    fontFamily: fonts.sansSemiBold,
  },
}));

export default DateFormatComponent;
