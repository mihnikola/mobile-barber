import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import React from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { roundValue } from "@/helpers";
import SharedImageInitials from "./SharedInitialsName";
import { ColorsBarber } from "@/constants/Colors";

const SharedItemEmployerCard = (props: any) => {
  const { redirectHandler, data } = props;
  const { id, image, name, seniority, averageRating, userCount } = data;

  return (
    <TouchableOpacity
      key={id}
      onPress={() => redirectHandler(data)}
      style={styles.card}
    >
      {image ? (
        <Image source={{ uri: image }} style={styles.profileImage} />
      ) : (
        <SharedImageInitials name={name} />
      )}
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{name}</Text>
        <View style={styles.locationContainer}>
          <FontAwesome name={"trophy"} size={16} color={ColorsBarber.dark.textColor} />
          <Text style={styles.locationText}>
            {`${seniority || seniority?.title}`}
          </Text>
        </View>
        <View style={styles.dataContainer}>
          <View style={styles.ratingContainer}>
            <MaterialIcons name={"star"} size={16} color={ColorsBarber.dark.starColor} />
            <Text style={styles.reviewText}>{`${roundValue(
              averageRating,
            )}/5`}</Text>
          </View>

          <View style={styles.ratingContainer}>
            <Ionicons name={"person"} size={16} color={ColorsBarber.dark.personIcon} />
            <Text style={styles.reviewText}>{userCount || 0}</Text>
          </View>
        </View>
      </View>
      <FontAwesome name={"chevron-right"} size={32} color={ColorsBarber.dark.arrowIcon} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  dataContainer: {
    gap: 5,
  },
  locationText: {
    fontSize: 14,
    color: ColorsBarber.dark.textColor, // Lighter grey for location
    marginLeft: 5,
  },
  card: {
    flexDirection: "row",
    backgroundColor: ColorsBarber.dark.item, // Dark background from your image
    borderRadius: 12,
    padding: 15,
    marginVertical: 8, // Spacing between cards
    marginHorizontal: 15, // Side padding for the list
    alignItems: "center",
    shadowColor: ColorsBarber.dark.background, // For a subtle shadow (iOS)
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
    color: ColorsBarber.dark.textColor, // Lighter grey for location
  },
  detailsContainer: {
    flex: 1,
    justifyContent: "center",
  },
  name: {
    fontSize: 18,
    fontFamily: "OldStandard-Bold",
    color: ColorsBarber.dark.textColor, // Lighter grey for location
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  reviewText: {
    fontSize: 14,
    fontFamily: "OldStandard-Bold",

    color: ColorsBarber.dark.textColor, // Lighter grey for location
    marginLeft: 5,
  },
});
export default SharedItemEmployerCard;
