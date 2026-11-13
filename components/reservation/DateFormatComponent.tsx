import { convertToDay, convertToDayTime, convertToMonthName } from "@/lib/date";
import React from "react";
import { Text, View } from "react-native";
import { fonts, makeStyles } from "@/theme";

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
      <Text
        style={
          item?.past && !rejected ? styles.captureDatePast : styles.captureDate
        }
      >
        {convertToMonthName(item?.startDate)}
      </Text>
      <Text
        style={
          item?.past && !rejected
            ? styles.captureDateBoldPast
            : styles.captureDateBold
        }
      >
        {convertToDay(item?.startDate)}
      </Text>
      <Text
        style={
          item?.past && !rejected ? styles.captureDatePast : styles.captureDate
        }
      >
        {convertToDayTime(item?.startDate)}
      </Text>
    </View>
  );
};

const useStyles = makeStyles((colors) => ({
  dateContainerPast: {
    borderWidth: 1,
    borderColor: colors.textInactive,
    borderLeftWidth: 1,
    borderRadius: 20,

    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },

  dateContainer: {
    borderWidth: 1,
    borderColor: colors.textInactive,
    borderLeftWidth: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 20,
  },
  captureDate: {
    fontSize: 18,
    color: colors.text,
    textAlign: "center",
    fontFamily: fonts.regular,
  },

  captureDatePast: {
    fontSize: 18,
    textAlign: "center",
    fontFamily: fonts.regular,
    color: colors.textInactive,
  },

  captureDateBold: {
    fontSize: 20,
    color: colors.text,
    fontFamily: fonts.bold,
  },
  captureDateBoldPast: {
    fontSize: 20,
    color: colors.textInactive,
    fontFamily: fonts.bold,
  },
}));

export default DateFormatComponent;
