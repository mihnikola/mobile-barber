import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { addMinutesToTime, convertToDay, convertToMonthName } from "@/helpers";
import { useNavigation } from "@react-navigation/native";

const CardFutureReservation = ({ check, reservations }) => {
  const navigator = useNavigation();
  const detailsReservation = (item) => {
    navigator.navigate("components/reservation/reservationdetails", {
      itemId: item._id,
      check,
    });
  };
  return (
    <>
      {reservations?.length > 0 &&
        reservations.map((item) => (
          <TouchableOpacity
            style={styles.cardReservation}
            key={item._id}
            onPress={() => detailsReservation(item)}
          >
            <View style={styles.dateContainer}>
              <Text style={styles.captureDate}>
                {convertToMonthName(item?.date)}
              </Text>
              <Text style={styles.captureDateBold}>
                {convertToDay(item?.date)}
              </Text>
              <Text style={styles.captureDate}>{item?.time}</Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.captureDateBold}>{item.service?.name}</Text>
              <Text style={styles.captureDate}>
                {item?.time} -{" "}
                {addMinutesToTime(item?.time, item?.service?.duration)}
              </Text>

              <Text style={styles.captureDateLocation}>Cara Lazara 85 a</Text>
            </View>
          </TouchableOpacity>
        ))}
    </>
  );
};
const styles = StyleSheet.create({
  cardReservation: {
    backgroundColor: "#1E1E1E", // Dark background from your image
    display: "flex",
    flexDirection: "row",
    width: "100%",
    marginTop: 20,
    borderRadius: 20,
    padding: 10,
    gap: 20,
    height: 100,
  },
  dateContainer: {
    borderWidth: 1,
    borderColor: "white",
    borderLeftWidth: 5,
    borderLeftColor: "green",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  captureDateLocation: {
    color: "#FFD700",
    fontSize: 17,
    fontWeight: 800,
  },
  captureDate: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
    fontWeight: "500",
  },
  captureDateBold: {
    fontSize: 20,
    color: "white",
    fontWeight: "900",
  },
  infoContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
});

export default CardFutureReservation;
