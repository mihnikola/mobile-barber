import { useCallback } from "react";
import Loader from "@/components/Loader";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import { useLocalSearchParams } from "expo-router";
import useReservationHandler from "./hooks/useReservationHandler";
import AppointmentsComponent from "./AppointmentsComponent";
export default function ReservationInitial() {
  const params = useLocalSearchParams();
  const { reevalueted } = params;
  const { checkToken, isLoading, token } = useReservationHandler();
  const isFocused = useIsFocused();

  useFocusEffect(
    useCallback(() => {
      if (isFocused) {
        checkToken();
      }
    }, [isFocused, reevalueted])
  );

  if (isLoading) {
    return <Loader />;
  }

  if (token) {
    return <AppointmentsComponent />;
  }
}
