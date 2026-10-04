import React from "react";
import { Image, StyleSheet } from "react-native";

function SharedCoverImage({ topInset = 0 }) {
  return (
    <Image
      source={require("./../assets/images/tabImage.png")}
      style={[
        styles.coverImage,
        {
          marginTop: topInset,
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  coverImage: {
    width: "100%",
    height: 200,
    opacity: 0.2,
  },
  appointment: {
    height: 100,
  },
});

export default SharedCoverImage;
