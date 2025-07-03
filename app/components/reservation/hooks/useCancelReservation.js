import { useState, useCallback } from "react";
import { put } from "@/api/apiService";
import { useNavigation } from "@react-navigation/native";

const useCancelReservation = () => {
  const [isCanceling, setIsCanceling] = useState(false);
  const [cancelError, setCancelError] = useState(null);
  const [cancelMessage, setCancelMessage] = useState(null);
  const [cancelSuccess, setCancelSuccess] = useState(null);
  const [cancelSuccessFlag, setCancelSuccessFlag] = useState(false);
  const navigation = useNavigation();

  const cancelReservation = useCallback(
    async (reservationId) => {
      if (!reservationId) {
        setCancelError("Reservation ID is missing.");
        return false;
      }
      setIsCanceling(true);
      setCancelError(null);
      try {
        const response = await put(`/reservations/${reservationId}`, {
          status: 1,
        }); // Assuming status 1 is for cancellation
        setCancelSuccess(response.message || "Successfully canceled.");
        setTimeout(() => {
          navigation.navigate("(tabs)", { screen: "explore" });
        }, 10000);
      } catch (err) {
        setCancelError(err.message || "Failed to cancel reservation.");
        console.error("Error canceling reservation:", err);
      }
    },
    [navigation]
  );

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
