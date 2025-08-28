// src/hooks/useReservations.js
import { get } from "@/api/apiService";
import { getCurrentUTCOffset, getTimeForUTCOffset } from "@/helpers";
import { router } from "expo-router";
import { useState, useEffect, useCallback } from "react";

const useReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const detailsReservation = (item) => {
    const checkValue = item?.past ? false : true;
    router.push({
      pathname: "/(tabs)/(03_calendar)/modalReservation",
      params: { itemId: item._id, check: checkValue },
    });
  };


  const formatReservationData = (localDateString) => {
    const [datePart, timePart] = localDateString.split(", ");
    const [day, month, year] = datePart.split("/").map(Number);
    const [hours, minutes, seconds] = timePart.split(":").map(Number);

    const monthValue = month.toString().length > 1 ? month : `0${month}`;
    const dayValue = day.toString().length > 1 ? day : `0${day}`;
    const minuteValue = minutes.toString().length > 1 ? minutes : `0${minutes}`;
    const hourValue = hours.toString().length > 1 ? hours : `0${hours}`;
    const secondValue = seconds.toString().length > 1 ? seconds : `0${seconds}`;

    return `${year}-${monthValue}-${dayValue}T${hourValue}:${minuteValue}:${secondValue}.000+00:00`;
  };

  const populateReservations = (response, date) => {
    const futureReservations = response.filter((res) => res.date > date);
    const pastReservations = response.filter((res) => res.date < date);
    const modifiedPastReservations = pastReservations?.map((reservation) => {
      return { ...reservation, past: true };
    });
    const reservations = [...futureReservations, ...modifiedPastReservations];
    return reservations;
  };

  const getReservationsData = async () => {
    setIsLoading(true);
    setError(null);
    const now = new Date().toLocaleString("en-GB");
    const dateCorrecto = formatReservationData(now);

    try {
      const response = await get("/reservations");
      const reservationDataResponse = populateReservations(
        response,
        dateCorrecto
      );

      setReservations(reservationDataResponse);
      setIsLoading(false);
    } catch (err) {
      console.error("Error fetching reservations:", err);
      setError(
        err.message ||
          "An unexpected error occurred while fetching reservations."
      );
      setIsLoading(false);
    }
  };



  return {
    reservations,
    isLoading,
    error,
    getReservationsData,
    detailsReservation,
  };
};

export default useReservations;
