// src/hooks/useFetchReservation.js
import { useState, useEffect } from "react";
import { get } from "@/api/apiService";
import {
  addMinutesToTime,
  convertNameAndDate,
  convertToDayTime,
} from "@/helpers";

const useFetchReservation = (reservationId) => {
  const [reservationData, setReservationData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchReservationDetails = async () => {
    if (!reservationId) {
      setIsLoading(false);
      setError("Reservation ID is not provided.");
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const response = await get(`/availabilities/${reservationId}`);
      const startDateTime = convertToDayTime(response?.startDate);
      const finishedTime = addMinutesToTime(
        convertToDayTime(response?.startDate),
        response?.service?.duration
      );

      const eventDate = convertNameAndDate(response?.startDate);
      const result = { ...response, startDateTime, finishedTime, eventDate };
      setReservationData(result);
    } catch (err) {
      setError(err.message || "Failed to fetch reservation details.");
      console.error("Error fetching reservation details:", err);
    } finally {
      setIsLoading(false);
    }
  };

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
