import { StyleSheet, Image } from "react-native";
import React from "react";

const HomeImage = () => {
  return (
    <Image
      source={require("./../../assets/images/mainLogo.png")}
      style={styles.backImage}
    />
  );
};

const styles = StyleSheet.create({
  backImage: {
    width: 500,
    height: 300,
    resizeMode: "contain",
  },
});

export default HomeImage;
