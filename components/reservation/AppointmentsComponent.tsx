import { View, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import Loader from "@/components/Loader";
import CardNoReservation from "@/components/reservation/CardNoReservation";
import CardReservation from "./CardReservation";
import { useLocalization } from "@/context/LocalizationContext";
import { useAppointment } from "@/context/AppointmentContext";

import SharedCoverImage from "@/shared-components/SharedCoverImage";
import SharedTitle from "@/shared-components/SharedTitle";
import AppointmentsStatuses from "./AppointmentsStatuses";
import { coverImageAppointments } from "@/constants";

const AppointmentsComponent = () => {
  const {
    isLoading,
    detailsReservation,
    getReservationsData,
    reservations,
    active,
    handleStatus,
  } = useAppointment();
  const { localization } = useLocalization();

  useEffect(() => {
    getReservationsData();
  }, [active]);

 

  return (
    <View style={styles.container}>
      <SharedCoverImage image={coverImageAppointments} appointmentImage={1} />

      <AppointmentsStatuses handleStatus={handleStatus} active={active} />

      <SharedTitle title={localization.APPOINTMENTS.title} topInset={1} />

      {isLoading && <Loader />}

      {!isLoading && reservations?.length ? (
        <CardReservation
          reservations={reservations}
          redirectScreen={detailsReservation}
        />
      ) : (
        !isLoading && <CardNoReservation />
      )}
    </View>
  );
};

export default AppointmentsComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
});
