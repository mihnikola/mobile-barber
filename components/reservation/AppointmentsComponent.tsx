import { View, Text, ScrollView, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import Loader from "@/components/Loader";
import CardNoReservation from "@/components/reservation/CardNoReservation";
import useReservations from "./hooks/useReservations";
import CardReservation from "./CardReservation";
import { useLocalization } from "@/context/LocalizationContext";
import SharedCoverImage from "@/shared-components/SharedCoverImage";
import useCompany from "../home/hooks/useCompany";

const AppointmentsComponent = () => {
  const { reservations, isLoading, detailsReservation, getReservationsData } =
    useReservations();

  const { localization } = useLocalization();
  useEffect(() => {
    getReservationsData();
  }, []);

    const { company, getCompany } = useCompany();
  
    useEffect(() => {
      getCompany();
    }, []);
  return (
    <ScrollView style={styles.container}>
      <SharedCoverImage image={company?.media?.coverImageAppointments} />
      <View style={styles.captureContainer}>
        <Text style={styles.capture}>{localization.APPOINTMENTS.title}</Text>
      </View>
      {isLoading ? (
        <Loader />
      ) : (
        <View style={styles.containerReservationData}>
          {reservations?.length ? (
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

export default AppointmentsComponent;

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
  captureContainer: {
    position: "absolute",
    marginHorizontal: 15, // Side padding for the list
  },
  capture: {
    fontSize: 32,
    color: "white",
    fontWeight: "500",
    paddingVertical: 140,
  },

  containerReservationData: {
    marginTop: 10,
  },
});
