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
        reservations.map((item) => (
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

                <Text style={styles.captureDateBold}>Cara Lazara 85 a</Text>
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
  },
  active: {
    color: "#fff",
    fontWeight: "bold",
  },
  container: {
    flex: 1,
  },
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
  containerCapture: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 250,
    left: 100,
    gap: 30,
  },
  wrapper: {
    display: "flex",
    width: "100%",
    borderRadius: 20,
    padding: 10,
    overflowY: "scroll",
  },
  greyLine: {
    width: "100%",
    height: 4, // Adjust the height for the thickness of the line
    backgroundColor: "grey", // Set the line color to white
    marginTop: -1, // Optional: You can adjust this to fine-tune the position
  },
  coverImage: {
    width: "100%",
    height: 300,
    opacity: 0.2,
  },
  content: {
    backgroundColor: "white",
    display: "flex",
    flexDirection: "row",
    borderRadius: 20,
    padding: 10,
    gap: 20,
  },
  capture: {
    fontSize: 32,
    color: "grey",
    fontWeight: "900",
    textAlign: "center",
    fontStyle: "italic",
  },

  cardPastReservation: {
    backgroundColor: "white",
    opacity: 0.7,
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
    borderColor: "#000",
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
    color: "black",
    fontWeight: "900",
  },
  infoContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  cardReservationPast: {
    marginTop: 20,
    padding: 10,
    flex: 1,
  },
  noReservation: {
    fontSize: 24,
    textAlign: "center",
    padding: 10,
    fontWeight: "900",
    color: "white",
  },
  description: {
    fontSize: 18,
    color: "grey",
    textAlign: "center",
  },
});

export default CardPastReservation;
