import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { roundValue } from "@/lib/format";
import SharedImageInitials from "./SharedInitialsName";
import { AppText, Card, cardStyles, Icon } from "@/components/ui";
import { colors, fonts } from "@/theme";

const SharedDetailsEmployerCard = ({ data, otherServices }) => {
  const { image, name, averageRating, userCount, seniority } = data;

  return (
    <Card style={[cardStyles.row, otherServices?.length > 0 && styles.paddingSection]}
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
        <SharedImageInitials name={name} otherServices={otherServices} />
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
              <Icon name={"star"} size={16} color="gold" />
              <AppText variant="title" size={12}>{`${roundValue(
                averageRating,
              )}/5`}</AppText>
            </View>

            <View style={styles.ratingContainer}>
              <Icon name={"person"} size={16} color="gold" />
              <AppText variant="title" size={12}>{userCount || 0}</AppText>
            </View>
          </View>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  paddingSection: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor:"transparent",
    margin: 0
  },

  dataContainer: {
    gap: 5,
  },

  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 30,
    marginRight: 15,
    borderColor: colors.divider,
  },
  profileImageOther: {
    width: 45,
    height: 45,
    borderRadius: 15,
    marginRight: 15,
    borderColor: colors.divider,
  },
  detailsContainer: {
    flex: 1,
    justifyContent: "center",
  },
  name: {
    fontSize: 18,
    fontFamily: fonts.bold,
    color: colors.text, // White text color    marginBottom: 4,
  },
  nameOther: {
    fontSize: 14,
  },
  seniorityOther: {
    fontFamily: fonts.regular,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    fontSize: 14,
    fontFamily: fonts.bold,
    color: colors.text, // White text color
  },
  ratingContainer: {
    gap: 5,
    flexDirection: "row",
    alignItems: "center",
  },

});

export default SharedDetailsEmployerCard;
