// src/hooks/useReservations.js
import { get } from "@/api/apiService";
import { router } from "expo-router";
import { useState } from "react";

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





  const getReservationsData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const reservationDataResponse = await get("/availabilities");
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
