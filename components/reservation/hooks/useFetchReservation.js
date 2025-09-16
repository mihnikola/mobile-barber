// src/hooks/useFetchReservation.js
import { useState, useEffect, useCallback } from "react";
import { get } from "@/api/apiService";
import { structureData } from "@/helpers";

const useFetchReservation = (reservationId) => {
  const [reservationData, setReservationData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchReservationDetails = useCallback(async () => {
    if (!reservationId) {
      setIsLoading(false);
      setError("Reservation ID is not provided.");
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const response = await get(`/availabilities/${reservationId}`);
      if (response) {
        const responseData = structureData(response);

        setReservationData(responseData);
      }
    } catch (err) {
      setError(err.message || "Failed to fetch reservation details.");
      console.error("Error fetching reservation details:", err);
    } finally {
      setIsLoading(false);
    }
  }, [reservationId]);

  useEffect(() => {
    let isMounted = true;
    if (isMounted && reservationId) {
      fetchReservationDetails();
    } else if (isMounted && !reservationId) {
      setIsLoading(false);
      setError("Reservation ID is not available initially.");
    }

    return () => {
      isMounted = false;
    };
  }, [fetchReservationDetails, reservationId]);

  return { reservationData, isLoading, error, fetchReservationDetails };
};

export default useFetchReservation;
