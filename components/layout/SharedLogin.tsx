import React from "react";
import { Image, StyleSheet } from "react-native";

function SharedLogin() {
  return (
    <Image
        source={require("@/assets/images/homeSplash.png")}
      style={styles.coverLogo}
    />
  );
}

const styles = StyleSheet.create({
 coverLogo: {
    resizeMode:"contain",
    height: 80,
  },
});

export default SharedLogin;
