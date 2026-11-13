import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useLocalization } from "@/context/LocalizationContext";
import { colors, fonts } from "@/theme";

const ContactUs = ({ workDays, workSaturday, holidays }) => {
  const { localization } = useLocalization();
  return (
    <View style={styles.content}>
      <Text style={styles.reviewCapture}>{localization.HOME.aboutUs}</Text>
      <Text style={styles.text}>{workDays}</Text>
      <Text style={styles.text}>{workSaturday}</Text>
      <Text style={styles.text}>{holidays}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 100,
  },
  text: {
    fontSize: 19,
    color: colors.text,
    fontFamily: fonts.bold,

    padding: 7,
  },
  reviewCapture: {
    fontSize: 29,
    fontFamily: fonts.bold,
    marginBottom: 20,
    color: colors.text,
  },
});

export default ContactUs;
