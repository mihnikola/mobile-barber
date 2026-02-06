import { useLocalization } from "@/context/LocalizationContext";
import { addMinutesToTime, convertToDayTime } from "@/helpers";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const InfoContainerFuture = ({ item }) => {
  const {localization} = useLocalization();
  return (
    <View style={styles.centerContainer}>
      <View style={styles.columnContainer}>
        <View style={styles.infoContainer}>
          <Text
            style={styles.captureDateBold}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {localization.code === 'en' ? item.service?.name?.nameEn : item.service?.name?.nameLocal}
          </Text>
          <Text style={styles.captureDateContent}>
            {convertToDayTime(item?.startDate)} -{" "}
            {addMinutesToTime(
              convertToDayTime(item?.startDate),
              item?.service?.duration
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
    </View>
  );
};

const styles = StyleSheet.create({
  addressContainer: {
    flexDirection: "row",
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
    color: "white",
    textAlign: "center",
    fontWeight: "500",
  },
  captureDateLocation: {
    color: "#ffd900ff",
    flex: 2,
    fontSize: 15,
  },

  captureDateBold: {
    fontSize: 18,
    color: "white",
    fontWeight: "900",
  },

  infoContainer: {
    flex: 1,
    alignItems: "flex-start",
    gap: 12,
  },
});

export default InfoContainerFuture;
