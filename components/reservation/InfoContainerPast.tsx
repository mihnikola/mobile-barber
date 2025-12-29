import { useLocalization } from "@/context/LocalizationContext";
import { addMinutesToTime, convertToDayTime } from "@/helpers";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const InfoContainerPast = ({ item }) => {
  const { localization } = useLocalization();

  return (
    <View style={styles.centerContainer}>
      <View style={styles.columnContainer}>
        <View style={styles.infoContainer}>
          <Text style={styles.captureDateBoldPast}>{item.service?.name}</Text>
          <Text style={styles.captureDatePast}>
            {convertToDayTime(item?.startDate)} -{" "}
            {addMinutesToTime(
              convertToDayTime(item?.startDate),
              item?.service?.duration
            )}
          </Text>
        </View>
        <View style={styles.addressContainer}>
          <Text
            style={styles.captureDateLocation}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {item?.place?.address}
          </Text>
        </View>
      </View>
      <View>
        <Text style={styles.rating}>
          {item.rating
            ? localization.APPOINTMENTS.rateReservation.rated
            : localization.APPOINTMENTS.rateReservation.rateUs}
        </Text>
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

  rating: {
    color: "gray",
  },

  captureDateLocation: {
    color: "#9a871fff",
    flex: 2,
    fontSize: 15,
  },
  captureDatePast: {
    fontSize: 18,
    color: "grey",
    textAlign: "center",
    fontWeight: "500",
  },

  captureDateBoldPast: {
    fontSize: 20,
    color: "gray",
    fontWeight: "900",
  },
  infoContainer: {
    flex: 1,
    alignItems: "flex-start",
    gap: 9,
  },
});

export default InfoContainerPast;
