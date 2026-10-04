import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { ColorsBarber } from "@/constants/Colors";

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
    color: ColorsBarber.dark.inActiveTextColor,
    fontSize: 14,
    fontFamily: "OldStandard-Regular",
  },
  registerLink: {
    color: ColorsBarber.dark.inActiveTextColor,
    fontSize: 14,
    fontFamily: "OldStandard-Regular",
  },
});

export default SharedRedirect;
