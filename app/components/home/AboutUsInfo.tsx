import { ABOUT_DATA } from "@/constants";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const AboutUsInfo = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{ABOUT_DATA.title}</Text>
      <Text style={styles.text}>{ABOUT_DATA.text}</Text>
      <Text style={styles.text}>{ABOUT_DATA.textTwo}</Text>
      <Text style={styles.text}>{ABOUT_DATA.textThree}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000000",
    padding: 20,
    position: 'relative'
  },
  title: {
    color: "#ffffff",
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center", // Center the title
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: "#ffffff",
    textAlign: "center",
    padding: 10,
  },
});

export default AboutUsInfo;
