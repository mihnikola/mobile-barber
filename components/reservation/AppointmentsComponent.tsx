import { View, ScrollView, StyleSheet } from "react-native";
import React, { useCallback, useEffect } from "react";
import Loader from "@/components/Loader";
import CardNoReservation from "@/components/reservation/CardNoReservation";
import useReservations from "./hooks/useReservations";
import CardReservation from "./CardReservation";
import { useLocalization } from "@/context/LocalizationContext";
import SharedTabHeader from "@/shared-components/SharedTabHeader";
import { useCompany } from "@/context/CompanyContext";
import {  useFocusEffect } from "expo-router";

const AppointmentsComponent = () => {
  const { reservations, isLoading, detailsReservation, getReservationsData } =
    useReservations();
  const { company } = useCompany();
  console.log("reservations", reservations[0]);
  const { localization } = useLocalization();

  useFocusEffect(
    useCallback(() => {
      getReservationsData();
    }, [])
  );
  if (isLoading) {
    return <Loader />;
  }

  return (
    <ScrollView style={styles.container}>
      <SharedTabHeader
        image={company?.media?.coverImageAppointments}
        title={localization.APPOINTMENTS.title}
      />
      {isLoading && <Loader />}

      {!isLoading && reservations?.length ? (
        <View style={styles.containerReservationData}>
          <CardReservation
            reservations={reservations}
            redirectScreen={detailsReservation}
          />
        </View>
      ) : (
        !isLoading && <CardNoReservation />
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
