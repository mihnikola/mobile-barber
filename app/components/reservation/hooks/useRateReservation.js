// src/hooks/useCancelReservation.js
import { useState, useCallback } from "react";
import { put } from "@/api/apiService";
import { useNavigation } from "@react-navigation/native";
// import { ToastAndroid } from "react-native";

const useRateReservation = () => {
  const [isRating, setIsRating] = useState(false);
  const [rateCancelError, setRateCancelError] = useState(null);
  const navigation = useNavigation();

  const [rateSuccess, setRateSuccess] = useState(null);
  const [isRateSuccess, setIsRateSuccess] = useState(false);

  const [rateSuccessFlag, setRateSuccessFlag] = useState(false);

  const rateReservation = useCallback(
    async (reservationId, rating) => {
      if (!reservationId) {
        setRateCancelError("Reservation ID is missing.");
        return false;
      }

      setIsRating(true);
      setRateCancelError(null);
      try {
        const response = await put(`/reservations/${reservationId}`, {
          status: 0,
          rate: rating,
        });
        setRateSuccess(response.message || "Appointment is rated.");
        setIsRateSuccess(true);
        
      } catch (err) {
        setRateCancelError(err.message || "Failed to rate reservation.");
        console.error("Error rating reservation:", err);
        return false;
      } finally {
        setIsRating(false);
      }
    },
    [navigation]
  );

  return {
    isRating,
    rateCancelError,
    rateReservation,
    rateSuccessFlag,
    setRateSuccessFlag,
    rateSuccess,
    setIsRateSuccess,
    isRateSuccess,
  };
};

export default useRateReservation;
