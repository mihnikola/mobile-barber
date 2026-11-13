// /app/contexts/ReservationContext.tsx
import { getData } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";
import { router } from "expo-router";
import { createContext, useState } from "react";
import { routes } from "@/lib/navigation/routes";

// Create the context with a default value of null
const ReservationContext = createContext(/** @type {any} TODO(phase4): real type */ (null));

// ReservationProvider component to wrap around the app and provide context
export const ReservationProvider = ({ children }) => {
  const [reservation, setReservation] = useState(null);
  
  const updateReservation = (data) => {
    setReservation(data);
  };

  const flowReservation = async (service, categoryId) => {
    updateReservation({ ...reservation, service });

    const { location } = reservation;
    try {
      const response = await getData(endpoints.categories.byId(categoryId), {
        placeId: location?.id || location?._id,
        categoryId,
        serviceId: service?.serviceId,
      });
      const { type, status } = response;

      if (status === 200) {
        if (type === "barbers") {
          const pathName = routes.booking.employees;
          const result = { pathName, type };
          return result;
        }
        if (response.type === "services") {
          const pathName = routes.booking.moreServices;
          const result = { pathName, type, categoryId };
          return result;
        }
      }
    } catch (err) {
      console.log("err", err);
      // setError(localization.SERVICES.errorFetch);
    } finally {
      // setIsLoading(false);
    }
  };

  return (
    <ReservationContext.Provider
      value={{ reservation, updateReservation, flowReservation }}
    >
      {children}
    </ReservationContext.Provider>
  );
};

export default ReservationContext;
