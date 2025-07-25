import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { addMinutesToTime, convertToDay, convertToMonthName } from "@/helpers";
import { useNavigation } from "@react-navigation/native";

const CardPastReservation = ({ reservations, check }) => {
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
        reservations.map((item: any) => (
          <TouchableOpacity
            style={styles.cardPastReservation}
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
            <View style={styles.centerContainer}>
              <View style={styles.infoContainer}>
                <Text style={styles.captureDateBold}>{item.service?.name}</Text>
                <Text style={styles.captureDate}>
                  {item?.time} -{" "}
                  {addMinutesToTime(item?.time, item?.service?.duration)}
                </Text>

                <Text style={styles.captureDateLocation}>Cara Lazara 85 a</Text>
              </View>
              <View>
                <Text style={styles.rating}>
                  {!item.rate ? "Rate us" : "Rated"}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
    </>
  );
};
const styles = StyleSheet.create({
  centerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "68%",
  },
  rating: {
    fontStyle: "italic",
    color: 'gray'
  },
  captureDateLocation: {
    color: "#FFD790",
    fontSize: 17,
    fontWeight: 800,
  },
  cardPastReservation: {
    backgroundColor: "#1E1E1E",
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
    borderColor: "gray",
    borderLeftWidth: 5,
    borderLeftColor: "green",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  captureDate: {
    fontSize: 18,
    color: "grey",
    textAlign: "center",
    fontWeight: "500",
  },
  captureDateBold: {
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

export default CardPastReservation;
