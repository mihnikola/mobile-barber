import { View, ScrollView, StyleSheet } from "react-native";
import React, { useCallback } from "react";
import Loader from "@/components/Loader";
import CardNoReservation from "@/components/reservation/CardNoReservation";
import CardReservation from "./CardReservation";
import { useLocalization } from "@/context/LocalizationContext";
import { useCompany } from "@/context/CompanyContext";
import { useAppointment } from "@/context/AppointmentContext";
import { useIsFocused } from "@react-navigation/native";
import { useFocusEffect } from "expo-router";
import SharedCoverImage from "@/shared-components/SharedCoverImage";
import SharedTitle from "@/shared-components/SharedTitle";

const AppointmentsComponent = () => {
  const { isLoading, detailsReservation, getReservationsData, reservations } =
    useAppointment();
  const { company } = useCompany();
  const { localization } = useLocalization();

  const isFocused = useIsFocused();
  
  useFocusEffect(
    useCallback(() => {
      getReservationsData();
    }, [isFocused])
  );

  return (
    <ScrollView style={styles.container}>
      <SharedCoverImage image={company?.media?.coverImageAppointments} />
      {!isLoading && <SharedTitle title={localization.APPOINTMENTS.title} />}
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
