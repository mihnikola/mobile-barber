import React from "react";
import { Image, StyleSheet } from "react-native";

function SharedLogo({ image }) {
  return <Image source={{ uri: image }} style={styles.coverLogo} />;
}

const styles = StyleSheet.create({
  coverLogo: {
    position: "absolute",
    alignSelf: "center",
    resizeMode: 'contain',
    width: 140,
    height: 150,
    top:25
  },
});

export default SharedLogo;
