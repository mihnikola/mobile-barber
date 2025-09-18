import React from "react";
import { Image, StyleSheet } from "react-native";

function SharedLogo({image}) {
  return (
    <Image
      source={{uri:image}}
      style={styles.coverLogo}
    />
  );
}

const styles = StyleSheet.create({
 coverLogo: {
    position: "absolute",
    alignSelf: "center",
    width: 140,
    height: 200,
  },
});

export default SharedLogo;
