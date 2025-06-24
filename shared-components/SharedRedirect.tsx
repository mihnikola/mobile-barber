import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

const SharedRedirect = (props: any) => {
  return (
    <View style={styles.registerContainer}>
      <Text style={styles.registerText}>{props.question} </Text>
      <TouchableOpacity onPress={props.onPress}>
        <Text style={styles.registerLink}>{props.text}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "auto", // Pushes to the bottom
    marginBottom: 20,
  },
  registerText: {
    color: "#ccc",
    fontSize: 14,
  },
  registerLink: {
    color: "#2596be", // Blue color for link
    fontSize: 14,
    fontWeight: "600",
  },
});

export default SharedRedirect;
