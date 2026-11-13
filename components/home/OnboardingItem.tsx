import SharedReviewImage from "@/shared-components/SharedReviewImage";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
} from "react-native";
import { colors, fonts } from "@/theme";

const OnboardingItem = ({ item, itemWidth }) => {
  return (
    // Svaki element liste dobija eksplicitno širinu
    <View style={[styles.onboardingItemContainer, { width: itemWidth }]}>
      {/* Horizontalni padding je unutar svakog elementa. */}
      <View style={styles.reviewContentWrapper}>
        <SharedReviewImage style={styles.imageStyle} />

        <Text style={styles.reviewText}>{item.description}</Text>
        <Text style={styles.reviewTitle}>{item.name}</Text>
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
    fontFamily: fonts.bold,
   color: colors.text,
    marginBottom: 10,
    marginTop: 10,
    textAlign: "center",
  },
  reviewText: {
    fontStyle: "italic",
    fontSize: 16,
   color: colors.text,
    textAlign: "center",
    marginVertical: 40,
    marginHorizontal: 20
  },
});
