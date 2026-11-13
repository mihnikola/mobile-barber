import { View, Text,  StyleSheet } from "react-native";
import React from "react";
import { TouchableOpacity } from "./TouchableOpacity";
import { colors, fonts } from "@/theme";

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
    // marginTop: "auto", // Pushes to the bottom
    // marginBottom: 20,
  },
  registerText: {
    color: colors.textInactive,
    fontSize: 14,
    fontFamily: fonts.regular,
  },
  registerLink: {
    color: colors.textInactive,
    fontSize: 14,
    fontFamily: fonts.regular,
  },
});

export default SharedRedirect;
