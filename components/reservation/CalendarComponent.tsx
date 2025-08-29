import { View, Text, ScrollView, Image, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import Loader from "@/components/Loader";
import CardNoReservation from "@/components/reservation/CardNoReservation";
import useReservations from "./hooks/useReservations";
import CardReservation from "./CardReservation";

const CalendarComponent = () => {
  const { reservations, isLoading, detailsReservation, getReservationsData } =
    useReservations();

  useEffect(() => {
    getReservationsData();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Image
        source={require("@/assets/images/coverImage.jpg")}
        style={styles.coverImage}
      />
      <Text style={styles.capture}>Reservations</Text>
      {isLoading ? (
        <Loader />
      ) : (
        <View style={styles.containerReservationData}>
          {reservations?.length > 0 ? (
            <CardReservation
              reservations={reservations}
              redirectScreen={detailsReservation}
            />
          ) : (
            <CardNoReservation />
          )}
        </View>
      )}
    </ScrollView>
  );
};

export default CalendarComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },

  coverImage: {
    width: "100%",
    height: 200,
    opacity: 0.2,
  },
  capture: {
    fontSize: 32,
    color: "white",
    fontWeight: "500",
    position: "absolute",
    alignSelf: "flex-start",
    marginHorizontal: 15,
    paddingVertical: 128,
  },
  containerReservationData: {
    marginTop: 10,
  },
});
