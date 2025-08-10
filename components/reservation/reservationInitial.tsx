import { useCallback } from "react";
import Loader from "@/components/Loader";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import { useLocalSearchParams } from "expo-router";
import CalendarComponent from "./CalendarComponent";
import useReservationHandler from "./hooks/useReservationHandler";
export default function Explore() {
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

  if (!isLoading && token) {
    return <CalendarComponent />;
  }
}
