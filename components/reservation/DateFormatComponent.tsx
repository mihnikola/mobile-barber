import { ColorsBarber } from "@/constants/Colors";
import { convertToDay, convertToDayTime, convertToMonthName } from "@/helpers";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

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
    borderColor: ColorsBarber.light.inActiveTextColor,
    borderLeftWidth: 1,
    borderRadius: 20,

    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },

  dateContainer: {
    borderWidth: 1,
    borderColor: ColorsBarber.light.inActiveTextColor,
    borderLeftWidth: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 20,
  },
  captureDate: {
    fontSize: 18,
    color: ColorsBarber.light.textColor,
    textAlign: "center",
    fontFamily: "OldStandard-Regular",
  },

  captureDatePast: {
    fontSize: 18,
    textAlign: "center",
    fontFamily: "OldStandard-Regular",
    color: ColorsBarber.light.inActiveTextColor,
  },

  captureDateBold: {
    fontSize: 20,
    color: ColorsBarber.light.textColor,
    fontFamily: "OldStandard-Bold",
  },
  captureDateBoldPast: {
    fontSize: 20,
    color: ColorsBarber.light.inActiveTextColor,
    fontFamily: "OldStandard-Bold",
  },
});

export default DateFormatComponent;
