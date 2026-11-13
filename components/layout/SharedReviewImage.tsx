import React from "react";
import { Image } from "react-native";

function SharedReviewImage({ style }) {
  return (
    <Image source={require("@/assets/images/reviewImage.png")} style={style} />
  );
}

export default SharedReviewImage;
