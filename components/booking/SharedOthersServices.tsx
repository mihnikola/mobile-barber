import { View, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useLocalization } from "@/context/LocalizationContext";
import { router } from "expo-router";
import { fonts, makeStyles } from "@/theme";
import { AppText, Icon } from "@/components/ui";

const SharedOthersServices = (props: any) => {
  const styles = useStyles();
  const { redirectHandler, data } = props;
  const { id, image, name, duration, price } = data;
  const { localization } = useLocalization();

  return (
    <View key={id} style={styles.card}>
      {image && <Image source={{ uri: image }} style={styles.profileImage} />}
      {data?.service?.image && (
        <Image
          source={{ uri: data?.service?.image }}
          style={styles.profileImage}
        />
      )}
      <View style={styles.detailsContainer}>
        {data?.service ? (
          <AppText variant="bodyLg" style={styles.name}>
            {" "}
            {localization.code === "en"
              ? data?.service?.name?.nameEn
              : data?.service?.name?.nameLocal}{" "}
          </AppText>
        ) : (
          <AppText variant="bodyLg" style={styles.name}>
            {" "}
            {localization.code === "en" ? name?.nameEn : name?.nameLocal}{" "}
          </AppText>
        )}
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={styles.locationContainer}>
            <Icon name={"clock"} size={16} color="text" />
            {data?.service?.duration ? (
              <AppText variant="caption" style={styles.locationText}>
                {`${localization.DETAILS.duration} ${data?.service?.duration} `}
              </AppText>
            ) : (
              <AppText variant="caption" style={styles.locationText}>
                {`${localization.DETAILS.duration} ${duration} `}
              </AppText>
            )}
          </View>
          <View style={styles.ratingContainer}>
            <Icon name={"price"} size={16} color="gold" />
            <AppText style={styles.reviewText}>
              {`${localization.DETAILS.price} ${data?.price}`}
            </AppText>
          </View>
        </View>
      </View>
    </View>
  );
};
const useStyles = makeStyles((colors) => ({
  containerReview: {
    alignSelf: "flex-start",
  },
  moreServices: {
    color: colors.text,
    fontFamily: fonts.italic,
    textDecorationLine: "underline",
  },
  row: {
    flexDirection: "row",
  },
  spaceBetween: {
    justifyContent: "space-between",
  },
  card: {
    flexDirection: "row",
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginVertical: 8,
    marginHorizontal: 15,
    alignItems: "center",
    shadowColor: colors.background,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
    width: 45,
    height: 45,
    borderRadius: 15, // Makes it circular
    marginRight: 15,
  },
  detailsContainer: {
    flex: 1,
    justifyContent: "center",
  },
  name: {
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
    fontSize: 12,
    fontFamily: fonts.bold,
    color: colors.text, // White text color
    marginLeft: 5,
  },
  reviewText: {
    marginLeft: 5,
  },
}));

export default SharedOthersServices;
