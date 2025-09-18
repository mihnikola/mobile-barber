import React from "react";
import { Image, StyleSheet, View } from "react-native";

function SharedImageForgotPass() {
  return (
    <View style={styles.imageContainer}>
      <Image
        source={require("@/assets/images/fgtPass.png")}
        style={styles.image}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  image: {
    // width: 290,
    // height: 290,
    resizeMode: "cover",
  },
});

export default SharedImageForgotPass;
