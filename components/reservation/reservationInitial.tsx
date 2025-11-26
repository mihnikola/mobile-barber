import { useCallback } from "react";
import Loader from "@/components/Loader";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import { router, useLocalSearchParams } from "expo-router";
import useReservationHandler from "./hooks/useReservationHandler";
import AppointmentsComponent from "./AppointmentsComponent";
import AppointmentsNonToken from "./AppointmentsNonToken";
export default function ReservationInitial() {
  const { reevalueted } = useLocalSearchParams();
  const { checkToken, isLoading, token } = useReservationHandler();
  const isFocused = useIsFocused();

  useFocusEffect(
    useCallback(() => {
      if (isFocused) {
        console.log("xxxx")
        checkToken();
      }
    }, [isFocused, reevalueted])
  );

  if (isLoading) {
    return <Loader />;
  }
  if (!token) {
    return <AppointmentsNonToken />;
  }

  if (token) {
    return <AppointmentsComponent />;
  }
}
