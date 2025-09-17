import { StyleSheet, Image, Dimensions } from "react-native";
import React from "react";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const HomeCoverImage = ({image}) => {
  return (
    <Image
      source={{uri: image}}
      style={styles.backImage}
    />
  );
};

const styles = StyleSheet.create({
  backImage: {
    width: windowWidth,
    height: windowHeight - 30,
    opacity: 0.6,
  },
});

export default HomeCoverImage;
