import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import React from "react";
import { useLocalization } from "@/context/LocalizationContext";
import { AppText, Card, cardStyles, Icon } from "@/components/ui";
import { colors, fonts } from "@/theme";

const SharedDetailsServiceCard = (props: any) => {
  const { redirectHandler, data, otherServices } = props;
  const { image, name, duration, price } = data;
  const { localization } = useLocalization();
  const rateEmployerHandler = () => {};
  return (
    <Card style={[cardStyles.row, otherServices?.length > 0 && styles.paddingSection]}
    >
      {image && (
        <Image
          source={{ uri: image }}
          style={[
            styles.profileImage,
            otherServices?.length > 0 && styles.profileImageOther,
          ]}
        />
      )}
      <View style={styles.detailsContainer}>
        <Text
          style={[styles.name, otherServices?.length > 0 && styles.nameOther]}
        >
          {!name
            ? localization.code === "en"
              ? name?.nameEn
              : name?.nameLocal
            : name}
        </Text>
        <View
          style={
            otherServices?.length > 0 && {
              flexDirection: "row",
              justifyContent: "space-between",
            }
          }
        >
          <View style={styles.locationContainer}>
            <Icon name={"clock"} size={16} color="text" />
            <AppText style={styles.locationText}>
              {`${localization.DETAILS.duration} ${
                duration || data?.serviceDuration
              }`}
            </AppText>
          </View>
          <View style={styles.ratingContainer}>
            <Icon name={"price"} size={16} color="gold" />
            <AppText style={styles.reviewText}>
              {`${localization.DETAILS.price} ${price || data?.servicePrice}`}
            </AppText>
          </View>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  containerReview: {
    alignSelf: "flex-start",
  },
  paddingSection: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "transparent",
    margin: 0,
  },
  detailsCard: {
    flexDirection: "row",
    backgroundColor: colors.surfaceCard, // Dark background from your image
    borderRadius: 12,
    padding: 15,
    marginVertical: 8, // Spacing between cards
    marginHorizontal: 15, // Side padding for the list
    alignItems: "center",
    shadowColor: colors.background, // For a subtle shadow (iOS)
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // For Android shadow
  },
  profileImage: {
    width: 90,
    height: 90,

    borderRadius: 30, // Makes it circular
    marginRight: 15,
  },
  detailsContainer: {
    flex: 1,
    justifyContent: "center",
  },
  profileImageOther: {
    width: 40,
    height: 40,
    borderRadius: 15, // Makes it circular
    marginRight: 15,
  },
  name: {
    fontSize: 18,
    fontFamily: fonts.bold,
    color: colors.text, // White text color
    marginBottom: 4,
  },
  nameOther: {
    fontSize: 14,
    fontFamily: fonts.bold,
    color: colors.text, // White text color
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  locationText: {

    marginLeft: 5,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    fontSize: 14,
    fontFamily: fonts.bold,
    color: colors.text, // White text color
    marginLeft: 5,
  },
  reviewText: {
    marginLeft: 5,
  },
});

export default SharedDetailsServiceCard;
