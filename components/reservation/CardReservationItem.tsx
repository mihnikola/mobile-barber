import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import {
  addMinutesToTime,
  convertToDay,
  convertToDayTime,
  convertToMonthName,
} from "@/helpers";
import { useLocalization } from "@/context/LocalizationContext";

const CardReservationItem = ({ redirectScreen, item }) => {
  return (
    <TouchableOpacity
      style={styles.cardReservation}
      key={item._id}
      onPress={() => redirectScreen(item)}
    >
      <DateFormatComponent item={item} />
      {!item?.past && <InfoContainerFuture item={item} />}
      {item?.past && <InfoContainerPast item={item} />}
    </TouchableOpacity>
  );
};
const DateFormatComponent = ({ item }) => {
  return (
    <View style={item?.past ? styles.dateContainerPast : styles.dateContainer}>
      <Text style={item?.past ? styles.captureDatePast : styles.captureDate}>
        {convertToMonthName(item?.startDate)}
      </Text>
      <Text
        style={item?.past ? styles.captureDateBoldPast : styles.captureDateBold}
      >
        {convertToDay(item?.startDate)}
      </Text>
      <Text style={item?.past ? styles.captureDatePast : styles.captureDate}>
        {convertToDayTime(item?.startDate)}
      </Text>
    </View>
  );
};
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
            {item?.employer?.place?.address}
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

const InfoContainerFuture = ({ item }) => {
  return (
    <View style={styles.infoContainer}>
      <Text style={styles.captureDateBold}>{item.service?.name}</Text>
      <Text style={styles.captureDate}>
        {convertToDayTime(item?.startDate)} -{" "}
        {addMinutesToTime(
          convertToDayTime(item?.startDate),
          item?.service?.duration
        )}
      </Text>
      <View>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={styles.captureDateFutureLocation}
        >
          {item?.employer?.place?.address || item?.employer[0]?.place?.address}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  addressContainer: {
    flexDirection: "row",
    paddingBottom: 10,
  },
  columnContainer: {
    display: "flex",
    flex: 1,
  },
  centerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    flex: 1,
  },

  dateContainerPast: {
    borderWidth: 1,
    borderColor: "gray",
    borderLeftWidth: 3,
    borderLeftColor: "green",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 13,
  },
  rating: {
    color: "gray",
  },
  cardReservation: {
    backgroundColor: "#1E1E1E", // Dark background from your image
    display: "flex",
    flexDirection: "row",
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 20,
    padding: 10,
    gap: 12,
    height: 105,
  },

  dateContainer: {
    borderWidth: 1,
    borderColor: "white",
    borderLeftWidth: 3,
    borderLeftColor: "green",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  captureDate: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
    fontWeight: "500",
  },
  captureDateFutureLocation: {
    color: "#ffd900ff",
    flex: 2,
    fontSize: 15,
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
  captureDateBold: {
    fontSize: 20,
    color: "white",
    fontWeight: "900",
  },
  captureDateBoldPast: {
    fontSize: 20,
    color: "gray",
    fontWeight: "900",
  },
  infoContainer: {
    flex: 1,
    alignItems: "flex-start",
  },
});

export default CardReservationItem;
