import { View, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import Loader from "@/components/Loader";
import CardNoReservation from "@/components/reservation/CardNoReservation";
import CardReservation from "./CardReservation";
import { useLocalization } from "@/context/LocalizationContext";
import { useAppointment } from "@/context/AppointmentContext";
import { coverImageAppointments } from "@/constants";
import HeaderCoverImageContainer from "@/shared-components/HeaderCoverImageContainer";
import { colors } from "@/theme";
import { router } from "expo-router";
import { routes } from "@/lib/navigation/routes";
import type { ApiRecord } from "@/context/types";

const AppointmentsComponent = () => {
  const {
    isLoading,
    getReservationsData,
    reservations,
    active,
  } = useAppointment();
  const { localization } = useLocalization();

  /** Open appointment details (moved out of AppointmentContext, Phase 4b). */
  const detailsReservation = (item: ApiRecord) => {
    router.push({
      pathname: routes.appointments.details,
      params: { itemId: item._id, past: item?.past, rating: item?.rating, status: item.status },
    });
  };

  useEffect(() => {
    if (active) {
      getReservationsData(active);
    }
  }, [active]);

  return (
    <View style={styles.container}>
      <HeaderCoverImageContainer
        title={localization.APPOINTMENTS.title}
        image={coverImageAppointments}
        hidden
        status
      />

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
    backgroundColor: colors.background,
  },
});
