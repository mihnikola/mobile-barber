import React from "react";
import { StyleSheet, View } from "react-native";
import { AppText } from "@/components/ui";

const AboutUsInfo = ({ title, text, textThree, textTwo }) => {
  return (
    <View style={styles.container}>
      <AppText variant="displayLg" style={styles.title}>{title}</AppText>
      <AppText variant="bodyStrong" style={styles.text}>{text}</AppText>
      <AppText variant="bodyStrong" style={styles.text}>{textTwo}</AppText>
      <AppText variant="bodyStrong" style={styles.text}>{textThree}</AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    textAlign: "center",
  },
  text: {
    lineHeight: 24,
    textAlign: "center",
    padding: 10,
  },
});

export default AboutUsInfo;
