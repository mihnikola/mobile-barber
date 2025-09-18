import { useState } from "react";
import { put } from "@/api/apiService";
import { useLocalization } from "@/context/LocalizationContext";

const useRateReservation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [rateModal, setRateModal] = useState(false);

  const [rateError, setRateError] = useState(null);
  const [rateMessage, setRateMessage] = useState(null);
  const { localization } = useLocalization();

  const rateReservation = async (reservationId, rating) => {
    setRateError(null);
    setIsLoading(true);

    if (!reservationId) {
      setRateError("Reservation ID is missing.");
      return false;
    }

    try {
      await put(`/availabilities/${reservationId}`, {
        status: 0,
        rate: rating,
      });

      setRateMessage(localization.APPOINTMENTS.rateReservation.confirmMessage);
    } catch (err) {
      setRateError(localization.APPOINTMENTS.rateReservation.errorMessage);
    }
    setIsLoading(false);
  };

  return {
    isLoading,

    rateModal,
    setRateModal,

    rateError,
    setRateError,

    rateMessage,
    setRateMessage,

    rateReservation,
  };
};

export default useRateReservation;
