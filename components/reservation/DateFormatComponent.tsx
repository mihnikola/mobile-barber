import { ColorsBarber } from "@/constants/Colors";
import { convertToDay, convertToDayTime, convertToMonthName } from "@/helpers";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { fonts } from "@/theme";

const DateFormatComponent = ({ item, rejected }) => {
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

const styles = StyleSheet.create({
  dateContainerPast: {
    borderWidth: 1,
    borderColor: ColorsBarber.dark.inActiveTextColor,
    borderLeftWidth: 1,
    borderRadius: 20,

    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },

  dateContainer: {
    borderWidth: 1,
    borderColor: ColorsBarber.dark.inActiveTextColor,
    borderLeftWidth: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 20,
  },
  captureDate: {
    fontSize: 18,
    color: ColorsBarber.dark.textColor,
    textAlign: "center",
    fontFamily: fonts.regular,
  },

  captureDatePast: {
    fontSize: 18,
    textAlign: "center",
    fontFamily: fonts.regular,
    color: ColorsBarber.dark.inActiveTextColor,
  },

  captureDateBold: {
    fontSize: 20,
    color: ColorsBarber.dark.textColor,
    fontFamily: fonts.bold,
  },
  captureDateBoldPast: {
    fontSize: 20,
    color: ColorsBarber.dark.inActiveTextColor,
    fontFamily: fonts.bold,
  },
});

export default DateFormatComponent;
