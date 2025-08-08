// src/hooks/useCancelReservation.js
import { useState } from "react";
import { put } from "@/api/apiService";

const useRateReservation = () => {
  const [isRating, setIsRating] = useState(false);
  const [rateCancelError, setRateCancelError] = useState(null);

  const [rateSuccess, setRateSuccess] = useState(null);
  const [isRateSuccess, setIsRateSuccess] = useState(false);

  const [rateSuccessFlag, setRateSuccessFlag] = useState(false);

  const rateReservation = async (reservationId, rating) => {
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
  };

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
