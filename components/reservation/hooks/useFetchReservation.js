// src/hooks/useFetchReservation.js
import { useState, useEffect } from "react";
import { get } from "@/api/apiService";
import {
  addMinutesToTime,
  convertNameAndDate,
  convertToDayTime,
} from "@/helpers";
import { useLocalization } from "@/context/LocalizationContext";

const useFetchReservation = () => {
  const [reservationData, setReservationData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { localization } = useLocalization();
  
  const fetchReservationDetails = async (reservationId) => {
    setIsLoading(true);
    setError(null);

    if (!reservationId) {
      setIsLoading(false);
      setError(localization.APPOINTMENTS.errorId);
      return;
    }

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
      setError(localization.APPOINTMENTS.errorFetchId);
    } finally {
      setIsLoading(false);
    }
  };

  

  return { reservationData, isLoading, error, fetchReservationDetails };
};

export default useFetchReservation;
