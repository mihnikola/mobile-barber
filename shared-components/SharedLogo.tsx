import React from "react";
import { Image, StyleSheet } from "react-native";

function SharedLogo() {
  return (
    <Image
      source={require("./../assets/images/mainLogo.png")}
      style={styles.coverLogo}
    />
  );
}

const styles = StyleSheet.create({
  coverLogo: {
    position: "absolute",
    alignSelf: "center",
    resizeMode: "contain",
    width: 150,
    height: 150,
    top: 40,
  },
});

export default SharedLogo;
