import { ColorsBarber } from "@/constants/Colors";
import { useLocalization } from "@/context/LocalizationContext";
import { addMinutesToTime, convertToDayTime } from "@/helpers";
import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const InfoContainerFuture = ({ item }) => {
  return (
    <View style={styles.centerContainer}>
      <View style={styles.columnContainer}>
        <View style={styles.infoContainer}>
          <Text
            style={styles.captureDateBold}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {item.service?.name}
          </Text>
          <Text style={styles.captureDateContent}>
            {convertToDayTime(item?.startDate)} -{" "}
            {addMinutesToTime(
              convertToDayTime(item?.startDate),
              item?.service?.duration,
            )}
          </Text>
        </View>
        <View style={styles.addressContainer}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={styles.captureDateLocation}
          >
            {item?.place?.address}
          </Text>
        </View>
      </View>
      <View>
        <Text style={styles.rating}>
          {item.status === 2 && (
            <FontAwesome name={"clock-o"} size={16} color={ColorsBarber.light.textColor} />
          )}

          {item.status === 1 && (
            <FontAwesome name={"window-close"} size={16} color={ColorsBarber.light.textColor} />
          )}
          {item.status === 0 && (
            <FontAwesome name={"check-circle-o"} size={20} color={ColorsBarber.light.textColor} />
          )}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  addressContainer: {
    flexDirection: "row",
  },
  rating: {
    color: "gray",
  },
  columnContainer: {
    flex: 1,
  },
  centerContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    flex: 1,
  },

  captureDateContent: {
    fontSize: 18,
   color: ColorsBarber.light.textColor,
    textAlign: "center",
    fontFamily: "OldStandard-Regular",
  },
  fade: {
    color: "#707070",
  },
  captureDateLocation: {
    color: ColorsBarber.light.textColor,
    fontFamily: "OldStandard-Regular",

    flex: 2,
    fontSize: 15,
  },

  captureDateBold: {
    fontSize: 18,
   color: ColorsBarber.light.textColor,
    fontFamily: "OldStandard-Bold",
  },

  infoContainer: {
    flex: 1,
    alignItems: "flex-start",
    gap: 12,
  },
});

export default InfoContainerFuture;
