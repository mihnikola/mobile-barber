// src/hooks/useReservations.js
import { get } from "@/api/apiService";
import { useLocalization } from "@/context/LocalizationContext";
import { router } from "expo-router";
import { useEffect, useState } from "react";

const useReservations = () => {
  // const [reservations, setReservations] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState(null);
  // const { localization } = useLocalization();

  // const detailsReservation = (item) => {
  //   router.push({
  //     pathname: "/(reservation_notification)/",
  //     params: {
  //       itemId: item._id,
  //       past: item?.past,
  //       rating: item?.rating,
  //       notification: null,
  //     },
  //   });
  // };

  // const getReservationsData = async () => {
  //   setIsLoading(true);
  //   setError(null);

  //   try {
  //     const reservationDataResponse = await get("/availabilities");
  //     setReservations(reservationDataResponse);
  //     setIsLoading(false);
  //   } catch (err) {
  //     setError(localization.APPOINTMENTS.errorFetch);
  //     setIsLoading(false);
  //   }
  // };


  // return {
  //   reservations,
  //   isLoading,
  //   error,
  //   getReservationsData,
  //   detailsReservation,
  // };
};

export default useReservations;
