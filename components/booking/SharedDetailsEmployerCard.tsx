import { View, Image } from "react-native";
import React from "react";
import { roundValue } from "@/lib/format";
import { AppText, Avatar, Card, cardStyles, Icon } from "@/components/ui";
import { fonts, makeStyles } from "@/theme";

const SharedDetailsEmployerCard = ({ data, otherServices }) => {
  const styles = useStyles();
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
        otherServices ? <Avatar name={name} size={otherServices.length > 0 ? "sm" : "lg"} /> : null
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
          <AppText
            style={[styles.name, otherServices?.length > 0 && styles.nameOther]}
          >
            {name}
          </AppText>
          <View style={styles.locationContainer}>
            <AppText
              style={[
                styles.locationText,
                otherServices?.length > 0 && styles.seniorityOther,
              ]}
            >
              {seniority?.title || seniority}
            </AppText>
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
              <Icon name={"star"} size={16} color="star" />
              <AppText variant="caption">{`${roundValue(
                averageRating,
              )}/5`}</AppText>
            </View>

            <View style={styles.ratingContainer}>
              <Icon name={"person"} size={16} color="star" />
              <AppText variant="caption">{userCount || 0}</AppText>
            </View>
          </View>
        </View>
      </View>
    </Card>
  );
};

const useStyles = makeStyles((colors) => ({
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
    borderColor: colors.line,
  },
  profileImageOther: {
    width: 45,
    height: 45,
    borderRadius: 15,
    marginRight: 15,
    borderColor: colors.line,
  },
  detailsContainer: {
    flex: 1,
    justifyContent: "center",
  },
  name: {
    fontSize: 18,
    fontFamily: fonts.sansSemiBold,
    color: colors.ink, // White text color    marginBottom: 4,
  },
  nameOther: {
    fontSize: 14,
  },
  seniorityOther: {
    fontFamily: fonts.sans,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    fontSize: 14,
    fontFamily: fonts.sansSemiBold,
    color: colors.ink, // White text color
  },
  ratingContainer: {
    gap: 5,
    flexDirection: "row",
    alignItems: "center",
  },

}));

export default SharedDetailsEmployerCard;
