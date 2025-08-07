import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";

const OnboardingItem = ({ item, itemWidth }) => {
  return (
    // Svaki element liste dobija eksplicitno širinu
    <View style={[styles.onboardingItemContainer, { width: itemWidth }]}>
      {/* Horizontalni padding je unutar svakog elementa. */}
      <View style={styles.reviewContentWrapper}>
        <Image
          source={require("@/assets/images/reviewImage.png")}
          style={styles.imageStyle}
        />

        <Text style={styles.reviewText}>{item.text}</Text>
        <Text style={styles.reviewTitle}>{item.title}</Text>
      </View>
    </View>
  );
};


export default OnboardingItem;

const styles = StyleSheet.create({
  imageStyle: {
    width: "100%",
    resizeMode: "cover",
    opacity: 0.5,
    position: "absolute",
  },

  onboardingItemContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  reviewContentWrapper: {
    paddingVertical: 30,
    paddingHorizontal:10
  },
  reviewTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
    marginTop: 10,
    textAlign: "center",
  },
  reviewText: {
    fontStyle: "italic",
    fontSize: 16,
    color: "white",
    textAlign: "center",
    marginVertical: 40,
    marginHorizontal: 20
  },
});
