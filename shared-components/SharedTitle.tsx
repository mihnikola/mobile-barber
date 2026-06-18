import React from "react";
import { StyleSheet, Text, View } from "react-native";

function SharedTitle({ title, topInset = 0 }) {
  const topValue = topInset === 1 ? 106 : 143;
  return (
    <View style={styles.captureContainer}>
      <Text style={[styles.capture, { paddingVertical: topValue }]}>
        {title}
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  captureContainer: {
    position: "absolute",
    marginHorizontal: 20, // Side padding for the list
  },
  capture: {
    fontSize: 32,
    color: "white",
    fontWeight: "500",
  },
});
export default SharedTitle;
