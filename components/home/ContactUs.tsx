import { View, StyleSheet } from "react-native";
import React from "react";
import { useLocalization } from "@/context/LocalizationContext";
import { AppText } from "@/components/ui";

const ContactUs = ({ workDays, workSaturday, holidays }) => {
  const { localization } = useLocalization();
  return (
    <View style={styles.content}>
      <AppText variant="displayLg" style={styles.reviewCapture}>{localization.HOME.aboutUs}</AppText>
      <AppText variant="bodyStrong" style={styles.text}>{workDays}</AppText>
      <AppText variant="bodyStrong" style={styles.text}>{workSaturday}</AppText>
      <AppText variant="bodyStrong" style={styles.text}>{holidays}</AppText>
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

    padding: 7,
  },
  reviewCapture: {
    marginBottom: 20,
  },
});

export default ContactUs;
