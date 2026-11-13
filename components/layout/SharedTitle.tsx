import React from "react";
import { StyleSheet, View } from "react-native";
import { AppText } from "@/components/ui";

function SharedTitle({ title, topInset = 0 }) {
  const topValue = topInset === 1 ? 106 : 143;
  return (
    <View style={styles.captureContainer}>
      <AppText variant="legacyBody" size={32} style={{ paddingVertical: topValue }}>
        {title}
      </AppText>
    </View>
  );
}
const styles = StyleSheet.create({
  captureContainer: {
    position: "absolute",
    marginHorizontal: 20, // Side padding for the list
  },
});
export default SharedTitle;
