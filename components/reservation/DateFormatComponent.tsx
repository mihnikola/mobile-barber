import { convertToDay, convertToDayTime, convertToMonthName } from "@/helpers";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const DateFormatComponent = ({ item, rejected }) => {
  return (
    <View style={item?.past && !rejected ? styles.dateContainerPast : styles.dateContainer}>
      <Text style={item?.past && !rejected  ? styles.captureDatePast : styles.captureDate}>
        {convertToMonthName(item?.startDate)}
      </Text>
      <Text
        style={item?.past && !rejected ? styles.captureDateBoldPast : styles.captureDateBold}
      >
        {convertToDay(item?.startDate)}
      </Text>
      <Text style={item?.past && !rejected ? styles.captureDatePast : styles.captureDate}>
        {convertToDayTime(item?.startDate)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  dateContainerPast: {
    borderWidth: 1,
    borderColor: "gray",
    borderLeftWidth: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },

  dateContainer: {
    borderWidth: 1,
    borderColor: "white",
    borderLeftWidth: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  captureDate: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
    fontWeight: "500",
  },

  captureDatePast: {
    fontSize: 18,
    color: "grey",
    textAlign: "center",
    fontWeight: "500",
  },

  captureDateBold: {
    fontSize: 20,
    color: "white",
    fontWeight: "900",
  },
  captureDateBoldPast: {
    fontSize: 20,
    color: "gray",
    fontWeight: "900",
  },
});

export default DateFormatComponent;
