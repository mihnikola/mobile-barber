import { View, Text, StyleSheet } from "react-native";
import React from "react";

const InfoComponent = ({title}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "justify",
    padding: 20,
  },
  text: {
    textAlign: "center",
    fontSize: 20,
    color: "gray",
  },
});

export default InfoComponent;
