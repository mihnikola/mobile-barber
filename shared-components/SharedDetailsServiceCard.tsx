import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import React from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { FontAwesome } from "@expo/vector-icons";
import { useLocalization } from "@/context/LocalizationContext";
import { ColorsBarber } from "@/constants/Colors";

const SharedDetailsServiceCard = (props: any) => {
  const { redirectHandler, data } = props;
  const { id, image, name, duration, price } = data;
  const { localization } = useLocalization();
  const rateEmployerHandler = () => {};
  return (
    <View key={id} style={styles.card}>
      {image && <Image source={{ uri: image }} style={styles.profileImage} />}
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{name}</Text>
        <View style={styles.locationContainer}>
          <FontAwesome name={"clock-o"} size={16} color={ColorsBarber.light.textColor} />
          <Text style={styles.locationText}>
            {`${localization.DETAILS.duration} ${
              duration || data?.serviceDuration
            }`}
          </Text>
        </View>
        <View style={styles.ratingContainer}>
          <MaterialIcons name={"price-change"} size={16} color={ColorsBarber.light.textColor} />
          <Text style={styles.reviewText}>
            {`${localization.DETAILS.price} ${price || data?.servicePrice}`}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerReview: {
    alignSelf: "flex-start",
  },
  card: {
    flexDirection: "row",
    backgroundColor: ColorsBarber.light.item,
    borderRadius: 12,
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 15,
    alignItems: "center",
    shadowColor: ColorsBarber.light.background,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  detailsCard: {
    flexDirection: "row",
    backgroundColor: "#1E1E1E", // Dark background from your image
    borderRadius: 12,
    padding: 15,
    marginVertical: 8, // Spacing between cards
    marginHorizontal: 15, // Side padding for the list
    alignItems: "center",
    shadowColor: ColorsBarber.light.background, // For a subtle shadow (iOS)
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
  name: {
    fontSize: 18,
    fontFamily: "OldStandard-Bold",
    color: ColorsBarber.light.textColor, // White text color
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  locationText: {
    fontSize: 14,
    color: ColorsBarber.light.textColor, // White text color
    fontFamily: "OldStandard-Regular",

    marginLeft: 5,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    fontSize: 14,
    fontFamily: "OldStandard-Bold",
    color: ColorsBarber.light.textColor, // White text color
    marginLeft: 5,
  },
  reviewText: {
    fontSize: 14,
    color: ColorsBarber.light.textColor, // White text color
    marginLeft: 5,
        fontFamily: "OldStandard-Regular",

  },
});

export default SharedDetailsServiceCard;
