import SharedReviewImage from "@/components/layout/SharedReviewImage";
import React from "react";
import {
  Text,
  View,
} from "react-native";
import { makeStyles } from "@/theme";
import { AppText } from "@/components/ui";

const OnboardingItem = ({ item, itemWidth }) => {
  const styles = useStyles();
  return (
    // Svaki element liste dobija eksplicitno širinu
    <View style={[styles.onboardingItemContainer, { width: itemWidth }]}>
      {/* Horizontalni padding je unutar svakog elementa. */}
      <View style={styles.reviewContentWrapper}>
        <SharedReviewImage style={styles.imageStyle} />

        <Text style={styles.reviewText}>{item.description}</Text>
        <AppText variant="legacyTitle" style={styles.reviewTitle}>{item.name}</AppText>
      </View>
    </View>
  );
};


export default OnboardingItem;

const useStyles = makeStyles((colors) => ({
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
}));
