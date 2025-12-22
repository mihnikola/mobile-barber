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

const AppointmentContext = createContext(null);
export const useAppointment = () => {
  return useContext(AppointmentContext);
};
export const AppointmentProvider = ({ children }) => {
  const [reservations, setReservations] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isModalQuestion, setIsModalQuestion] = useState(false);

  const [error, setError] = useState(null);
  const [IsError, setIsError] = useState(false);

  const [responseData, setResponseData] = useState(null);
  const [message, setMessage] = useState(null);

  const [reservationData, setReservationData] = useState(null);
  const [description, setDescription] = useState(null);

  const { isToken, getTokenData } = useAuth();
  const { localization } = useLocalization();
  const { reservation } = useContext(ReservationContext);

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

  const rateReservation = async (reservationId, rating, description) => {
    setError(null);
    setIsLoading(true);

    if (!reservationId) {
      setError("Reservation ID is missing.");
      return false;
    }

    try {
      await put(`/availabilities/${reservationId}`, {
        status: 0,
        rate: rating,
        description,
      });
      setIsModal(true);
      setMessage(localization.APPOINTMENTS.rateReservation.confirmMessage);
      await getReservationsData();
    } catch (err) {
      setError(localization.APPOINTMENTS.rateReservation.errorMessage);
    } finally {
      setIsLoading(false);
      setDescription(null);
    }
  };

  const cancelReservation = async (reservationId) => {
    setIsLoading(true);
    setError(null);

    console.log("reservation id++", reservationId);
    if (!reservationId) {
      setError("Reservation ID is missing.");
      return false;
    }
    try {
      const response = await put(`/availabilities/${reservationId}`, {
        status: 1,
      });
      setIsModal(true);

      console.log("response", response);

      setMessage(localization.APPOINTMENTS.cancelReservation.confirmMessage);
      await getReservationsData();
    } catch (err) {
      setError(localization.APPOINTMENTS.cancelReservation.errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

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
  const getReservationsData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const reservationDataResponse = await get("/availabilities");
      console.log("appointemests", reservationDataResponse.length);
      setReservations([...reservationDataResponse]);
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
        message,
        setMessage,
        submitReservationHandler,
        submitReservation,
        responseData,
        setDescription,
        description,
        setIsLoading,
        setIsModalQuestion,
        isModalQuestion,
        getTokenData,
        setIsError,
        IsError
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};

export default AppointmentContext;
