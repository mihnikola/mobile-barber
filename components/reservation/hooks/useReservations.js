// src/hooks/useReservations.js
import { get } from "@/api/apiService";
import { useLocalization } from "@/context/LocalizationContext";
import { router } from "expo-router";
import { useEffect, useState } from "react";

const useReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { localization } = useLocalization();

  const detailsReservation = (item) => {
    if (item?.past) {
      router.replace({
        pathname: "/(tabs)/(03_calendar)/rateReservation",
        params: { itemId: item._id },
      });
    } else {
      router.replace({
        pathname: "/(tabs)/(03_calendar)/cancelReservation",
        params: { itemId: item._id },
      });
    }
  };

  const getReservationsData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const reservationDataResponse = await get("/availabilities");
      setReservations(reservationDataResponse);
      setIsLoading(false);
    } catch (err) {
      setError(localization.APPOINTMENTS.errorFetch);
      setIsLoading(false);
    }
  };
  useEffect(()=>{
    getReservationsData();
  },[])

  return {
    reservations,
    isLoading,
    error,
    getReservationsData,
    detailsReservation,
  };
};

export default useReservations;
