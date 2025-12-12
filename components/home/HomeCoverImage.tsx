import { StyleSheet, Image } from "react-native";
import React from "react";

type HomeCoverImageProps = {
  image: string;
};
const HomeCoverImage: React.FC<HomeCoverImageProps> = ({ image }) => {
  return <Image source={{ uri: image }} style={styles.backImage} />;
};

const styles = StyleSheet.create({
  backImage: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
    opacity: 0.4,
  },
});

export default HomeCoverImage;
