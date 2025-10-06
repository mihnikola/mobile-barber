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
    flex: 1,
    opacity: 0.4,
  },
});

export default HomeCoverImage;
