// src/hooks/useReservations.js
import { get } from "@/api/apiService";
import { formatReservationData, getCurrentUTCOffset, getTimeForUTCOffset } from "@/helpers";
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



  const populateReservations = (response, date) => {
    const { futureReservations, modifiedPastReservations } = response.reduce(
      (acc, reservation) => {
        if (reservation.date > date) {
          acc.futureReservations.push(reservation);
        } else {
          acc.modifiedPastReservations.push({ ...reservation, past: true });
        }
        return acc;
      },
      { futureReservations: [], modifiedPastReservations: [] }
    );

    return [...futureReservations, ...modifiedPastReservations]
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
