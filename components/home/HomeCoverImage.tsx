import { StyleSheet, Image, useWindowDimensions, ImageBackground } from "react-native";
import React from "react";

type HomeCoverImageProps = {
  image: string;
};

const HomeCoverImage: React.FC<HomeCoverImageProps> = ({ image }) => {
  const { height, width } = useWindowDimensions();
  return (
    <ImageBackground 
      source={{ uri: image }} 
      style={[styles.backImage, { width, height }]} 
    />
  );
};

const styles = StyleSheet.create({
  backImage: {
   
    opacity: 0.4,
  },
});

export default HomeCoverImage;
