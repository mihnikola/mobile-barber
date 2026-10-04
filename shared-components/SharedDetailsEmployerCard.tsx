import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Ionicons } from "@expo/vector-icons";
import { roundValue } from "@/helpers";
import SharedImageInitials from "./SharedInitialsName";
import { ColorsBarber } from "@/constants/Colors";

const SharedDetailsEmployerCard = ({ data, otherServices }) => {
  const { _id, image, name, averageRating, userCount, seniority } = data;

  return (
    <View
      key={_id}
      style={[styles.card, otherServices?.length > 0 && styles.paddingSection]}
    >
      {image ? (
        <Image
          source={{ uri: image }}
          style={[
            styles.profileImage,
            otherServices?.length > 0 && styles.profileImageOther,
          ]}
        />
      ) : (
        <SharedImageInitials name={name} />
      )}
      <View style={styles.detailsContainer}>
        <View
          style={
            otherServices?.length > 0 && {
              flexDirection: "row",
              justifyContent: "space-between",
              alignContent: "center",
              alignItems: "center",
            }
          }
        >
          <Text
            style={[styles.name, otherServices?.length > 0 && styles.nameOther]}
          >
            {name}
          </Text>
          <View style={styles.locationContainer}>
            <Text
              style={[
                styles.locationText,
                otherServices?.length > 0 && styles.seniorityOther,
              ]}
            >
              {seniority?.title || seniority}
            </Text>
          </View>
        </View>

        <View style={styles.dataContainer}>
          <View
            style={
              otherServices?.length > 0 && {
                flexDirection: "row",
                justifyContent: "space-between",
              }
            }
          >
            <View style={styles.ratingContainer}>
              <MaterialIcons
                name={"star"}
                size={16}
                color={ColorsBarber.dark.starColor}
              />
              <Text style={styles.reviewText}>{`${roundValue(
                averageRating,
              )}/5`}</Text>
            </View>

            <View style={styles.ratingContainer}>
              <Ionicons
                name={"person"}
                size={16}
                color={ColorsBarber.dark.personIcon}
              />
              <Text style={styles.reviewText}>{userCount || 0}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  paddingSection: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor:"transparent",
    margin: 0
  },
  card: {
    flexDirection: "row",
    backgroundColor: ColorsBarber.dark.item,
    borderRadius: 12,
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 15,
    alignItems: "center",
    shadowColor: ColorsBarber.dark.background,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  dataContainer: {
    gap: 5,
  },

  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 30,
    marginRight: 15,
    borderColor: "#333",
  },
  profileImageOther: {
    width: 45,
    height: 45,
    borderRadius: 15,
    marginRight: 15,
    borderColor: "#333",
  },
  detailsContainer: {
    flex: 1,
    justifyContent: "center",
  },
  name: {
    fontSize: 18,
    fontFamily: "OldStandard-Bold",
    color: ColorsBarber.dark.textColor, // White text color    marginBottom: 4,
  },
  nameOther: {
    fontSize: 14,
  },
  seniorityOther: {
    fontFamily: "OldStandard-Regular",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    fontSize: 14,
    fontFamily: "OldStandard-Bold",
    color: ColorsBarber.dark.textColor, // White text color
  },
  ratingContainer: {
    gap: 5,
    flexDirection: "row",
    alignItems: "center",
  },

  reviewText: {
    fontSize: 12,
    fontFamily: "OldStandard-Bold",
    color: ColorsBarber.dark.textColor, // White text color
  },
});

export default SharedDetailsEmployerCard;
