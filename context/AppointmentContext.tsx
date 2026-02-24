// /app/contexts/ReservationContext.tsx
import { router } from "expo-router";
import { createContext, useContext, useState } from "react";
import { useLocalization } from "./LocalizationContext";
import { useAuth } from "./AuthContext";
import { get, post, put } from "@/api/apiService";
import {
  addMinutesToTime,
  convertNameAndDate,
  convertToDayTime,
} from "@/helpers";
import ReservationContext from "./ReservationContext";
import { getStorage } from "@/helpers/token";
import { useLastPathNavigation } from "./NavigationContext";

const AppointmentContext = createContext(null);
export const useAppointment = () => {
  return useContext(AppointmentContext);
};
export const AppointmentProvider = ({ children }) => {
  const [reservations, setReservations] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(null);
  const [isModalQuestion, setIsModalQuestion] = useState(false);
  const [error, setError] = useState(null);
  const [IsError, setIsError] = useState(false);

  const [responseData, setResponseData] = useState(null);
  const [message, setMessage] = useState(null);

  const [reservationData, setReservationData] = useState(null);
  const [description, setDescription] = useState(null);

  const { isToken, isLoading: isLoadingToken, getTokenData } = useAuth();
  const { localization } = useLocalization();
  const { reservation } = useContext(ReservationContext);

  const { saveLastTab } = useLastPathNavigation();
  const [isModal, setIsModal] = useState(false);

  const detailsReservation = (item) => {
    router.push({
      pathname: "/(reservation_notification)/",
      params: {
        itemId: item._id,
        past: item?.past,
        rating: item?.rating,
        notification: null,
      },
    });
  };
  const withLoading = async (type, callback) => {
    setLoading(type);
    try {
      await callback();
    } finally {
      setLoading(null);
    }
  };
  const rateReservation = async (reservationId, rating, description) => {
    withLoading("rating", async () => {
      setError(null);
      if (!reservationId) {
        setIsLoading(null);

        setError("Reservation ID is missing.");
        return false;
      }
      setIsModal(true);

      try {
        await put(`/availabilities/${reservationId}`, {
          status: 0,
          rate: rating,
          description,
        });
        setMessage(localization.APPOINTMENTS.rateReservation.confirmMessage);
        await getReservationsData();
      } catch (err) {
        setError(localization.APPOINTMENTS.rateReservation.errorMessage);
      } finally {
        setLoading(null);
        setDescription(null);
      }
    });
  };
  

  const cancelReservation = async (reservationId) => {
    withLoading("cancelling", async () => {
      setError(null);

      if (!reservationId) {
        setLoading(null);

        setError("Reservation ID is missing.");
        return false;
      }
      setIsModal(true);

      try {
        const response = await put(`/availabilities/${reservationId}`, {
          status: 1,
        });
        console.log("response",response)
        setMessage(localization.APPOINTMENTS.cancelReservation.confirmMessage);
        await getReservationsData();
      } catch (err) {
        setError(localization.APPOINTMENTS.cancelReservation.errorMessage);
      } finally {
        setLoading(null);
      }
    });
  };

  const fetchReservationDetails = async (reservationId) => {
    withLoading("fetchById", async () => {
      setError(null);

      if (!reservationId) {
        setLoading(null);

        setError(localization.APPOINTMENTS.errorId);
        return;
      }

      try {
        const response = await get(`/availabilities/${reservationId}`);
        const { status, data } = response;
        if (status === 200) {
          const startDateTime = convertToDayTime(data?.startDate);
          const finishedTime = addMinutesToTime(
            convertToDayTime(data?.startDate),
            data?.service?.duration,
          );

          const eventDate = convertNameAndDate(data?.startDate);
          const result = { ...data, startDateTime, finishedTime, eventDate };
          setReservationData(result);
        }
      } catch (err) {
        setError(localization.APPOINTMENTS.errorFetchId);
      } finally {
        setLoading(null);
      }
    });
  };
  const getReservationsData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await get("/availabilities");
      // console.log("getReservationsData",response)
      if (response.status === 200) {
        setReservations(response.data);
      }
    } catch (err) {
      setError(localization.APPOINTMENTS.errorFetch);
    } finally {
      setIsLoading(false);
    }
  };
  const submitReservation = async (tokenData) => {
    setIsLoading(true);
    setError(null);
    const { employer, service, timeData, dateReservation, location } =
      reservation;

    if (!employer || !service || !timeData || !dateReservation || !location) {
      setError(localization.APPOINTMENTS.errorFields);
      setIsLoading(false);
      return;
    }
    console.log("submitReservation employer.id", employer.id);
    console.log("|||service,", service);
    console.log("timeData", timeData);
    console.log("dateReservation", dateReservation);
    console.log(",tokenData", tokenData);
    console.log(",description", description);
    console.log(",location", location);

    try {
      const response = await post("/availabilities", {
        employerId: employer.id,
        service,
        time: timeData.value,
        date: dateReservation,
        customer: "",
        token: tokenData,
        description,
        location,
      });

      if (response.status === 201) {
        await getReservationsData();
        setResponseData(response);
        router.dismissAll();
        saveLastTab(null);
        router.push({
          pathname: "/(tabs)/(02_barbers)/reservationSuccess",
          params: {
            responseData: response,
          },
        });
      }
      if (response.status === 202) {
        setIsError(true);
        setError(localization.APPOINTMENTS.errorDailyLimit);
      }
      if (response.status === 203) {
        setIsError(true);

        setError(localization.APPOINTMENTS.errorWeeklyLimit);
      }
      if (response.status === 204) {
        setIsError(true);

        setError(localization.APPOINTMENTS.errorMonthlyLimit);
      }
      if (response.status === 205) {
        setIsError(true);

        setError(localization.APPOINTMENTS.errorYearlyLimit);
      }
    } catch (err) {
      setIsError(true);

      setError(localization.APPOINTMENTS.postError);
    } finally {
      setIsLoading(false);
      setDescription(null);
    }
  };
  const submitReservationHandler = async () => {
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
  };

  return (
    <AppointmentContext.Provider
      value={{
        isToken,
        isLoading,
        rateReservation,
        reservations,
        detailsReservation,
        error,
        isModal,
        setIsModal,
        getReservationsData,
        cancelReservation,
        fetchReservationDetails,
        reservationData,
        setReservationData,
        message,
        setMessage,
        submitReservationHandler,
        submitReservation,
        responseData,
        setDescription,
        description,
        setIsLoading,
        loading,
        setIsModalQuestion,
        isModalQuestion,
        getTokenData,
        setIsError,
        IsError,
        isLoadingToken,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};

export default AppointmentContext;
