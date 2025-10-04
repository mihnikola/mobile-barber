import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import React from "react";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useLocalization } from "@/context/LocalizationContext";

const SharedItemEmployerCard = (props: any) => {
  const { redirectHandler, data } = props;
  const { id, image, name, seniority, ratingCount } = data;
  const { localization } = useLocalization();

  return (
    <TouchableOpacity
      key={id}
      onPress={() => redirectHandler(data)}
      style={styles.card}
    >
      {image && <Image source={{ uri: image }} style={styles.profileImage} />}
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{name}</Text>
        <View style={styles.locationContainer}>
          <FontAwesome name={"trophy"} size={16} color="#CCCCCC" />
          <Text style={styles.locationText}>
            {`${seniority || seniority?.title}`}
          </Text>
        </View>
         <View style={styles.dataContainer}>
          <View style={styles.ratingContainer}>
            <IconSymbol name={"star"} size={16} color="#FFD700" />
            <Text style={styles.reviewText}>
              {/* {`${ratingCount}/5.0  `}  */}
              {`4.0/5.0`}
            </Text>
          </View>

          <View style={styles.ratingContainer}>
            <Ionicons name={"person"} size={16} color="#FFD700" />
            <Text style={styles.reviewText}>
              {/* {`${ratingCount} ${localization.DETAILS.mark}`}  */}
              1102
            </Text>
          </View>
        </View>
      </View>
      <FontAwesome name={"chevron-right"} size={32} color="gray" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  dataContainer:{
    gap: 5,


  },
  card: {
    flexDirection: "row",
    backgroundColor: "#1E1E1E", // Dark background from your image
    borderRadius: 12,
    padding: 15,
    marginVertical: 8, // Spacing between cards
    marginHorizontal: 15, // Side padding for the list
    alignItems: "center",
    shadowColor: "#000", // For a subtle shadow (iOS)
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // For Android shadow
  },
  detailsCard: {
    flexDirection: "row",
    backgroundColor: "#1E1E1E", // Dark background from your image
    borderRadius: 12,
    padding: 15,
    marginVertical: 8, // Spacing between cards
    marginHorizontal: 15, // Side padding for the list
    alignItems: "center",
    shadowColor: "#000", // For a subtle shadow (iOS)
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
    borderWidth: 1, // Optional: for a subtle border around the image
    borderColor: "#333",
  },
  detailsContainer: {
    flex: 1,
    justifyContent: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF", // White text color
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  locationText: {
    fontSize: 14,
    color: "#CCCCCC", // Lighter grey for location
    marginLeft: 5,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFD700", // Gold color for rating number
    marginLeft: 5,
  },
  reviewText: {
    fontSize: 14,
    color: "#CCCCCC", // Lighter grey for review count
    marginLeft: 5,
  },
});

export default SharedItemEmployerCard;
