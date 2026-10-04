import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useLocalization } from "@/context/LocalizationContext";
import { ColorsBarber } from "@/constants/Colors";

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
    color: ColorsBarber.dark.textColor,
    fontFamily: "OldStandard-Bold",

    padding: 7,
  },
  reviewCapture: {
    fontSize: 29,
    fontFamily: "OldStandard-Bold",
    marginBottom: 20,
    color: ColorsBarber.dark.textColor,
  },
});

export default ContactUs;
