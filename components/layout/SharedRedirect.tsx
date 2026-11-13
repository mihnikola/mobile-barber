import { View, StyleSheet } from "react-native";
import React from "react";
import { AppText, Pressable } from "@/components/ui";

const SharedRedirect = (props: any) => {
  return (
    <View style={styles.registerContainer}>
      <AppText variant="legacyBody" color="textInactive">{props.question} </AppText>
      <Pressable onPress={props.onPress}>
        <AppText variant="legacyBody" color="textInactive">{props.text}</AppText>
      </Pressable>
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
});

export default SharedRedirect;
