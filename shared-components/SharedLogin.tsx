import React from "react";
import { Image, StyleSheet } from "react-native";

function SharedLogin({image}) {
  return (
    <Image
      source={{uri:image}}
      style={styles.coverLogo}
    />
  );
}

const styles = StyleSheet.create({
 coverLogo: {
    resizeMode:"contain",
    width: 140,
    height: 150,
  },
});

export default SharedLogin;
