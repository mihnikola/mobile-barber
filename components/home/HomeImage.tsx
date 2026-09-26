import { StyleSheet, Image } from "react-native";
import React from "react";

const HomeImage = ({ image }) => {
  return <Image source={{ uri: image }} style={styles.backImage} />;
};

const styles = StyleSheet.create({
  backImage: {
    width: 500,
    height: 300,
    resizeMode: "contain",
  },
});

export default HomeImage;
