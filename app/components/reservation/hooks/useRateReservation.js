// src/hooks/useCancelReservation.js
import { useState, useCallback } from "react";
import { put } from "@/api/apiService";
import { useNavigation } from "@react-navigation/native";
import { ToastAndroid } from "react-native";

const useRateReservation = () => {
  const [isRating, setIsRating] = useState(false);
  const [rateCancelError, setRateCancelError] = useState(null);
  const navigation = useNavigation();

  const showToast = useCallback((text) => {
    ToastAndroid.show(text, ToastAndroid.SHORT);
  }, []);

  const rateReservation = useCallback(
    async (reservationId,rating) => {
      if (!reservationId) {
        setRateCancelError("Reservation ID is missing.");
        return false;
      }

      setIsRating(true);
      setRateCancelError(null);
      try {
        const response = await put(`/reservations/${reservationId}`, {
          status: 0,
          rate: rating,
        }); // Assuming status 1 is for cancellation
        showToast(response.message || "Appointment is rated.");
        navigation.navigate("(tabs)", { screen: "explore" });
        return true;
      } catch (err) {
        setRateCancelError(err.message || "Failed to rate reservation.");
        console.error("Error rating reservation:", err);
        showToast(err.message || "There is error with rating appointment.");
        return false;
      } finally {
        setIsRating(false);
      }
    },
    [navigation, showToast]
  );

  return { isRating, rateCancelError, rateReservation };
};

export default useRateReservation;
