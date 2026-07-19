import AppointmentsComponent from "./AppointmentsComponent";
import AppointmentsNonToken from "./AppointmentsNonToken";
import { useAppointment } from "@/context/AppointmentContext";
import { useCallback } from "react";
import { useFocusEffect } from "expo-router";
export default function ReservationInitial() {
  const { isToken, getTokenData } = useAppointment();

  useFocusEffect(
    useCallback(() => {
      getTokenData();
    }, [])
  );

  if (!isToken) {
    return <AppointmentsNonToken />;
  }
  if (isToken) {
    return <AppointmentsComponent />;
  }
}
