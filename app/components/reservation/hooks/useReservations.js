// src/hooks/useReservations.js
import { getData } from "@/api/apiService";
import { getCurrentUTCOffset, getTimeForUTCOffset } from "@/helpers";
import { useState, useEffect, useCallback } from "react";

const useReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [check, setCheck] = useState(true);

  const checkPastHandler = () => {
    setCheck(false);
  };
  const checkFutureHandler = () => {
    setCheck(true);
  };

  const getReservationsData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    const dateTimeStampValue = getTimeForUTCOffset(getCurrentUTCOffset());

    try {
      const response = await getData("/reservations", {
        check,
        dateTimeStampValue
      });
      setReservations(response);
      setIsLoading(false);
    } catch (err) {
      console.error("Error fetching reservations:", err);
      setError(
        err.message ||
          "An unexpected error occurred while fetching reservations."
      );
      setIsLoading(false);
    }
  }, [check]);

  useEffect(() => {
    getReservationsData();
  }, [getReservationsData]);

  return {
    reservations,
    isLoading,
    error,
    getReservationsData,
    checkPastHandler,
    checkFutureHandler,
    check,
  };
};

export default useReservations;
