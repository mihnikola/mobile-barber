import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors, fonts } from "@/theme";

const AboutUsInfo = ({ title, text, textThree, textTwo }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.text}>{text}</Text>
      <Text style={styles.text}>{textTwo}</Text>
      <Text style={styles.text}>{textThree}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: colors.text,
    fontSize: 40,
    fontFamily: fonts.bold,
    textAlign: "center",
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.text,
    fontFamily: fonts.bold,
    textAlign: "center",
    padding: 10,
  },
});

export default AboutUsInfo;
