import React from "react";
import { Image, StyleSheet, Dimensions  } from "react-native";
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const WhoAreWeCoverImage = ({ image }) => {
  return <Image source={{ uri: image }} style={styles.backImage} />;
};
const styles = StyleSheet.create({
  backImage: {
    resizeMode: "contain",
    opacity: 0.2,
    width: screenWidth * 1,
    height: screenHeight * 1,
    marginBottom: 20,
    position: "absolute",
    
  },
});

export default WhoAreWeCoverImage;
