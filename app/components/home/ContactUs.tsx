import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { MAIN_DATA } from "@/constants";

const ContactUs = () => {
  return (
    <View style={styles.content}>
      <Text style={styles.reviewCapture}>{MAIN_DATA.contact}</Text>
      <Text style={styles.text}>{MAIN_DATA.workDays}</Text>
      <Text style={styles.text}>{MAIN_DATA.workSaturday}</Text>
      <Text style={styles.text}>{MAIN_DATA.sunday}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20
  },
  text: {
    fontSize: 19,
    color: "white",
    padding: 7
  },
  reviewCapture: {
    fontSize: 29,
    fontWeight: 800,
    marginBottom:20,
    color: "white",
  },
});

export default ContactUs;
