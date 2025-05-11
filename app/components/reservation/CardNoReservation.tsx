import { View, Text, StyleSheet } from "react-native";
import React from "react";

const CardNoReservation = () => {
  return (
    <View style={styles.card}>
      <Text style={styles.capture}> You currently have no reservations </Text>
      <Text style={styles.description}>
      You're just a few clicks away from your appointment.
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  card: {
    backgroundColor: "black",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    marginTop: 20,
    borderRadius: 20,
    padding: 10,
    gap: 20,
    height: 100,
  },
  capture: {
    fontSize: 20,
    textAlign: "center",
    padding: 10,
    fontWeight: "900",
    color: "white",
  },
  description: {
    fontSize: 16,
    color: "grey",
    textAlign: "center",
  },
});

export default CardNoReservation;
