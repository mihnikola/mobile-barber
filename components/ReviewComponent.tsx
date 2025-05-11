import { MAIN_DATA } from "@/constants";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

function ReviewComponent() {
  return (
    <View style={styles.content}>
      <Text style={styles.reviewCapture}>{MAIN_DATA.contact}</Text>
      <Text style={styles.text}>{MAIN_DATA.workDays}</Text>
      <Text style={styles.text}>{MAIN_DATA.workSaturday}</Text>
      <Text style={styles.text}>{MAIN_DATA.sunday}</Text>
    </View>
  );
}

export default ReviewComponent;

const styles = StyleSheet.create({
  reviewCapture: {
    color: "#ffffff",
    fontSize: 40,
    marginBottom: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  content: {
    flexGrow: 2,
    justifyContent: "center",
    alignItems: "center",
    padding: 2,
    backgroundColor: "black",
  },
  text: {
    fontSize: 20,
    color: "#ffff",
    margin: 5,
  },
  mapImage: {
    width: 400,
    height: 200,
  },
});
