import Loader from "@/components/Loader";
import AppointmentsComponent from "./AppointmentsComponent";
import AppointmentsNonToken from "./AppointmentsNonToken";
import { useAppointment } from "@/context/AppointmentContext";
import { useCallback, useEffect } from "react";
import { useFocusEffect } from "expo-router";
import { SharedLoader } from "@/shared-components/SharedLoader";
export default function ReservationInitial() {
  const { isToken, isLoadingToken, getTokenData } = useAppointment();

  useFocusEffect(
    useCallback(() => {
      getTokenData();
    }, [])
  );
  // if(isLoadingToken){
  //   return <SharedLoader isOpen={isLoadingToken} />
  // }
  if (!isToken && !isLoadingToken) {
    return <AppointmentsNonToken />;
  }
  if (isToken && !isLoadingToken) {
    return <AppointmentsComponent />;
  }
}
