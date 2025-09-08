import { useState } from "react";
import { put } from "@/api/apiService";

const useCancelReservation = () => {
  const [isCanceling, setIsCanceling] = useState(false);
  const [cancelError, setCancelError] = useState(null);
  const [cancelMessage, setCancelMessage] = useState(null);
  const [cancelSuccess, setCancelSuccess] = useState(null);
  const [cancelSuccessFlag, setCancelSuccessFlag] = useState(false);

  const cancelReservation = async (reservationId) => {
    if (!reservationId) {
      setCancelError("Reservation ID is missing.");
      return false;
    }
    setCancelError(null);
    try {
      const response = await put(`/availabilities/${reservationId}`, {
        status: 1,
      });
      if (response.status === 202) {
        setCancelError("Failed to cancel reservation.");
        setIsCanceling(true);
      } else {
        setIsCanceling(true);

        setCancelSuccess(response.message || "Successfully canceled.");
      }
    } catch (err) {
      setIsCanceling(true);
      
      setCancelError(err.message || "Failed to cancel reservation.");
    }
  };

  return {
    isCanceling,
    cancelError,
    cancelReservation,
    cancelMessage,
    setCancelMessage,
    cancelSuccess,
    setCancelSuccessFlag,
    cancelSuccessFlag,
    setIsCanceling,
  };
};

export default useCancelReservation;
