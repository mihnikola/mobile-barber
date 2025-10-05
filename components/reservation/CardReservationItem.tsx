import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import {
  addMinutesToTime,
  convertToDay,
  convertToDayTime,
  convertToMonthName,
} from "@/helpers";
import { useLocalization } from "@/context/LocalizationContext";

const truncateText = (text, limit) => {
  return text.length > limit ? text.slice(0, limit) + "..." : text;
};
const CardReservationItem = ({ redirectScreen, item }) => {
  return (
    <TouchableOpacity
      style={item?.past ? styles.cardPastReservation : styles.cardReservation}
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
        <View style={styles.infoContainer}>
          <Text style={styles.captureDateLocation}>
            {truncateText(item?.employer?.place?.address, 50)}
          </Text>
        </View>
      </View>
      <View style={styles.ratingContainer}>
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

      <Text style={styles.captureDateFutureLocation}>
        {truncateText(
          item?.employer?.place?.address || item?.employer[0]?.place?.address,
          50
        )}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  columnContainer: {
    display: "flex",
    justifyContent: "space-around",
    flex: 1,
  },
  centerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    flex: 1,
  },
  ratingContainer: {
    display: "flex",
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
  cardPastReservation: {
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
    padding: 13,
  },
  captureDate: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
    fontWeight: "500",
  },
  captureDateFutureLocation: {
    color: "#ffd900ff",
  },
  captureDateLocation: {
    color: "#9a871fff",
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
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
});

export default CardReservationItem;
