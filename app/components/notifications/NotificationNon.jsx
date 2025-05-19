import React from "react";
import { StyleSheet, Text, View } from "react-native";

export const NotificationNon = () => {
  return (
    <View style={styles.cardReservationPast}>
      <Text style={styles.noReservation}> Pročitali ste sve notifikacije </Text>
      <Text style={styles.description}>
        Čestitamo, držite sve konce u rukama!
      </Text>
    </View>
  );
};

export default NotificationNon;

const styles = StyleSheet.create({
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
