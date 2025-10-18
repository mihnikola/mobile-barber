// Custom hook for handling the reservation submission
import { post } from "@/api/apiService";
import ReservationContext from "@/context/ReservationContext";
import { getStorage } from "@/helpers/token";
import { router } from "expo-router";
import { useCallback, useContext, useEffect, useState } from "react";
import * as Notifications from "expo-notifications";
import { useLocalization } from "@/context/LocalizationContext";

// Handle background notifications using Expo's background handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const useSubmitReservation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { reservation } = useContext(ReservationContext);
  const [responseData, setResponseData] = useState(null);

  const [isMessage, setIsMessage] = useState(false);

  const { localization } = useLocalization();
  const [description, setDescription] = useState("");

  Notifications.addNotificationReceivedListener((notification) => {
    // Handle the background notification
  });

  const [notification, setNotification] = useState(false);

  useEffect(() => {
    const notificationListener = Notifications.addNotificationReceivedListener(
      (notification) => {
        setNotification(notification);
      }
    );

    const responseListener =
      Notifications.addNotificationResponseReceivedListener((response) => {
        setNotification(response);
      });

    // Clean up the listeners when the component is unmounted

    return () => {
      notificationListener.remove();
      responseListener.remove();
    };
  }, []);

  // Send the push token to your server (Node.js backend) ok

  const submitReservation = async (tokenData) => {
    setIsLoading(true);
    setError(null);
    const { employer, service, timeData, dateReservation, location } = reservation;

    if (!employer || !service || !timeData || !dateReservation || !location) {
      setError(localization.APPOINTMENTS.errorFields);
      setIsLoading(false);
      return;
    }
    try {
      const response = await post("/availabilities", {
        employerId: employer.id,
        service,
        time: timeData.value,
        date: dateReservation,
        customer: "",
        token: tokenData,
        description,
        location
      });
      if (response.status === 201) {
        setResponseData(response);
        router.dismissAll();
        router.push({
          pathname: "/(tabs)/(02_barbers)/reservationSuccess",
          params: {
            responseData: response,
          },
        });
      }
      if (response.status === 202) {
        setError(localization.APPOINTMENTS.errorDailyLimit);
      }
      if (response.status === 203) {
        setError(localization.APPOINTMENTS.errorWeeklyLimit);
      }
      if (response.status === 204) {
        setError(localization.APPOINTMENTS.errorMonthlyLimit);
      }
      if (response.status === 205) {
        setError(localization.APPOINTMENTS.errorYearlyLimit);
      }
      setIsLoading(false);
      setIsMessage(true);
    } catch (err) {
      setError(localization.APPOINTMENTS.postError);
      setIsLoading(false);
    }
  };

  const submitReservationHandler = useCallback(async () => {
    try {
      const tokenData = await getStorage();
      if (tokenData) {
        await submitReservation(tokenData);
      } else {
        setError(localization.LOGIN.missingToken);
      }
    } catch (error) {
      setError(localization.LOGIN.missingToken);
    }
  }, [submitReservation]);

  return {
    submitReservationHandler,
    isLoading,
    error,
    description,
    setDescription,
    setError,
    setIsMessage,
    isMessage,
  };
};

export default useSubmitReservation;
