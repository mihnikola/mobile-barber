import { useState } from "react";
import { put } from "@/api/apiService";
import { useLocalization } from "@/context/LocalizationContext";

const useCancelReservation = () => {
  // const [isLoading, setIsLoading] = useState(false);
  // const [cancelError, setCancelError] = useState(null);
  // const [cancelMessage, setCancelMessage] = useState(null);
  // const [cancelSuccess, setCancelSuccess] = useState(null);
  // const [cancelSuccessFlag, setCancelSuccessFlag] = useState(false);
  // const { localization } = useLocalization();
  // const cancelReservation = async (reservationId) => {
  //   setIsLoading(true);
  //   setCancelError(null);
  //   if (!reservationId) {
  //     setCancelError("Reservation ID is missing.");
  //     return false;
  //   }
  //   try {
  //     await put(`/availabilities/${reservationId}`, {
  //       status: 1,
  //     });
  //     setCancelSuccess(
  //       localization.APPOINTMENTS.cancelReservation.confirmMessage
  //     );
  //   } catch (err) {
  //     setCancelError(localization.APPOINTMENTS.cancelReservation.errorMessage);
  //   }
  //   setIsLoading(false);
  // };
  // return {
  //   isLoading,
  //   cancelError,
  //   cancelReservation,
  //   cancelMessage,
  //   setCancelMessage,
  //   cancelSuccess,
  //   setCancelSuccessFlag,
  //   cancelSuccessFlag,
  //   setCancelSuccess
  // };
};

export default useCancelReservation;
