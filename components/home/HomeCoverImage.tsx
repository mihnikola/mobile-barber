import { StyleSheet, Image, useWindowDimensions } from "react-native";
import React from "react";

type HomeCoverImageProps = {
  image: string;
};

const HomeCoverImage: React.FC<HomeCoverImageProps> = ({ image }) => {
  const { height, width } = useWindowDimensions();
  return (
    <Image 
      source={{ uri: image }} 
      style={[styles.backImage, { width, height }]} 
    />
  );
};

const styles = StyleSheet.create({
  backImage: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.4,
  },
});

export default HomeCoverImage;
