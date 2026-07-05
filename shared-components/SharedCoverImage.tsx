import React from "react";
import { Image, StyleSheet } from "react-native";

function SharedCoverImage({ image, topInset = 0, appointmentImage = 0 }) {
  return (
    <Image
      source={{ uri: image }}
      style={[
        styles.coverImage,
        {
          marginTop: topInset,
        },
        appointmentImage === 1 && styles.appointment
      ]}
    />
  );
}

const styles = StyleSheet.create({
  coverImage: {
    width: "100%",
    height: 200,
    opacity: 0.4,
  },
  appointment:{
    height: 155,

  }
});

export default SharedCoverImage;
