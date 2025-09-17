import { ABOUT_DATA } from "@/constants";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const AboutUsInfo = ({title, text, textThree, textTwo}) => {
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
    flex:1
      
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
