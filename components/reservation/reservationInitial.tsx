import Loader from "@/components/Loader";
import AppointmentsComponent from "./AppointmentsComponent";
import AppointmentsNonToken from "./AppointmentsNonToken";
import { useAppointment } from "@/context/AppointmentContext";
import { useEffect } from "react";
export default function ReservationInitial() {
  const { isToken, getTokenData } = useAppointment();

  useEffect(() => {
    getTokenData();
  }, []);
  console.log("isToken", isToken);
  if (!isToken) {
    return <AppointmentsNonToken />;
  }
  if (isToken) {
    return <AppointmentsComponent />;
  }
}
