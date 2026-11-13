// /app/contexts/ReservationContext.tsx
import type { ApiRecord } from "@/context/types";
import { createContext, type ReactNode, useContext, useState } from "react";
import { useLocalization } from "./LocalizationContext";
import { useAuth } from "./AuthContext";
import { get, getData, post, put } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";
import { convertNameAndDate, convertToDayTime } from "@/lib/date";
import { useReservation } from "./ReservationContext";
import { getStorage } from "@/helpers/token";

/** Value type is derived from the provider state hook below. */
export type AppointmentContextValue = ReturnType<typeof useAppointmentState>;

const AppointmentContext = createContext<AppointmentContextValue | null>(null);
export const useAppointment = () => {
  return useContext(AppointmentContext) as AppointmentContextValue;
};
/** All appointment state + actions (booking submit, list, details, cancel, rate). */
function useAppointmentState() {
  const [reservations, setReservations] = useState<ApiRecord[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState<string | null>(null);
  const [isModalQuestion, setIsModalQuestion] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [IsError, setIsError] = useState(false);
  const [distinctReservation, setDistinctReservation] = useState<string | null>(null);
  const [responseData, setResponseData] = useState<ApiRecord | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const [reservationData, setReservationData] = useState<ApiRecord | null>(null);
  const [description, setDescription] = useState<string | null>(null);

  const { isToken, isLoading: isLoadingToken, getTokenData } = useAuth();
  const { localization } = useLocalization();
  const { reservation } = useReservation();

  const [active, setActive] = useState("pending");
  const handleStatus = (id: string) => {
    setActive(id);
  };

  const [isModal, setIsModal] = useState(false);

  const withLoading = async (type: string, callback: () => Promise<unknown>) => {
    setLoading(type);
    try {
      await callback();
    } finally {
      setLoading(null);
    }
  };
  const rateReservation = async (reservationId: string, rating: number, description: string | null) => {
    withLoading("rating", async () => {
      setError(null);
      if (!reservationId) {
        setIsLoading(false);

        setError("Reservation ID is missing.");
        return false;
      }
      setIsModal(true);

      try {
        await put(endpoints.availabilities.byId(reservationId), {
          status: 0,
          rate: rating,
          description,
        });
        setMessage(localization.APPOINTMENTS.rateReservation.confirmMessage);
        await getReservationsData();
      } catch {
        setError(localization.APPOINTMENTS.rateReservation.errorMessage);
      } finally {
        setLoading(null);
        setDescription(null);
      }
    });
  };

  const cancelReservation = async (reservationId: string) => {
    withLoading("cancelling", async () => {
      setError(null);

      if (!reservationId) {
        setLoading(null);

        setError("Reservation ID is missing.");
        return false;
      }
      setIsModal(true);

      try {
        await put(endpoints.availabilities.byId(reservationId), {
          status: 1,
        });
        setMessage(localization.APPOINTMENTS.cancelReservation.confirmMessage);
        await getReservationsData();
      } catch {
        setError(localization.APPOINTMENTS.cancelReservation.errorMessage);
      } finally {
        setLoading(null);
      }
    });
  };

  const fetchReservationDetails = async (
    reservationId: string,
    notification = null,
  ) => {
    withLoading("fetchById", async () => {
      setError(null);
      setDescription(null);
      if (!reservationId) {
        setLoading(null);

        setError(localization.APPOINTMENTS.errorId);
        return;
      }

      try {
        const response = await get(endpoints.availabilities.byId(reservationId));
        const { status, data } = response;
        if (status === 200) {
          const startDateTime = convertToDayTime(data?.startDate);
          const finishedTime = convertToDayTime(data?.endDate);
          const eventDate = convertNameAndDate(data?.startDate);
          const result = { ...data, startDateTime, finishedTime, eventDate };
          setReservationData(result);

          if (notification) {
            const STATUS_DATA: Record<string | number, string> = {
              2: "pending",
              1: "rejected",
              0: "approved",
            };
            const statusValue = STATUS_DATA[data?.status];
            setActive(statusValue);

            await getReservationsData(statusValue);
          }
        }
      } catch {
        setError(localization.APPOINTMENTS.errorFetchId);
      } finally {
        setLoading(null);
      }
    });
  };

  const getReservationsData = async (status?: number | string) => {
    setIsLoading(true);
    setError(null);
    const STATUS_MAP: Record<string, number> = {
      pending: 2,
      rejected: 1,
      approved: 0,
    };
    const STATUS_DATA: Record<string | number, string> = {
      2: "pending",
      1: "rejected",
      0: "approved",
    };

    const activeStatus = STATUS_DATA[status as string | number] || STATUS_MAP[active];

    //ovde mi trebaju statusi pending/rejected/approved
    try {
      const response = await getData(endpoints.availabilities.root, {
        activeStatus,
      });

      if (response.status === 200) {
        setReservations(response.data);
      }
    } catch {
      setError(localization.APPOINTMENTS.errorFetch);
    } finally {
      setIsLoading(false);
    }
  };

  const submitReservation = async (tokenData: string) => {
    let result: { status: number } | undefined;
    setIsLoading(true);
    setError(null);
    const {
      employer,
      service,
      timeData,
      dateReservation,
      location,
      otherServices,
    } = reservation as ApiRecord; // complete at this point of the booking flow

    if (!employer || !service || !timeData || !dateReservation || !location) {
      setError(localization.APPOINTMENTS.errorFields);
      setIsLoading(false);
      return;
    }
    let total;

    if (otherServices?.length > 0) {
      total = otherServices?.reduce(
        (acc: ApiRecord, current: ApiRecord) => {
          acc.totalPrice += current.price;
          acc.totalDuration += current.duration;
          return acc;
        },
        { totalPrice: 0, totalDuration: 0 },
      );
    }

    const serviceIds = otherServices.map((serv: ApiRecord) => serv.id);

    try {
      const response = await post(endpoints.availabilities.root, {
        employerId: employer.id,
        service,
        time: timeData.value,
        date: dateReservation,
        customer: "",
        token: tokenData,
        description,
        location,
        otherServices: serviceIds,
        totalPrice: total?.totalPrice || 0,
        totalDuration: total?.totalDuration || 0,
      });

      if (response.status === 209) {
        setDistinctReservation(localization.APPOINTMENTS.distinctReservation);
      }
      if (response.status === 201) {
        const statusValue = response.data.status;
        const STATUS_DATA: Record<string | number, string> = {
          2: "pending",
          1: "rejected",
          0: "approved",
        };
        setActive(STATUS_DATA[statusValue]);
        await getReservationsData(statusValue);
        setResponseData(response);
        // the screen navigates to the success page (Phase 4b)
        result = { status: response.data.status };
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
    } catch {
      setIsError(true);
      setError(localization.APPOINTMENTS.postError);
    } finally {
      setIsLoading(false);
      setDescription(null);
    }
    return result;
  };
  const submitReservationHandler = async () => {
    try {
      const tokenData = await getStorage();
      if (tokenData) {
        return await submitReservation(tokenData);
      } else {
        setError(localization.LOGIN.missingToken);
      }
    } catch {
      setError(localization.LOGIN.missingToken);
    }
  };

  return {
        isToken,
        isLoading,
        rateReservation,
        reservations,
        error,

        setError, // was missing → reservation screen crashed on dismissing an error (B25)
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
        setDistinctReservation,
        distinctReservation,
        handleStatus,
        active,
      };
}

export const AppointmentProvider = ({ children }: { children: ReactNode }) => {
  const value = useAppointmentState();
  return <AppointmentContext.Provider value={value}>{children}</AppointmentContext.Provider>;
};

export default AppointmentContext;
