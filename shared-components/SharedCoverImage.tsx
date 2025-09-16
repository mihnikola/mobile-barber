import React from "react";
import { Image, StyleSheet } from "react-native";

function SharedCoverImage() {
  return (
    <Image
      source={require("@/assets/images/coverImage.jpg")}
      style={styles.coverImage}
    />
  );
}

const styles = StyleSheet.create({
  coverImage: {
    width: "100%",
    height: 200,
    opacity: 0.2,
  },
});

export default SharedCoverImage;
