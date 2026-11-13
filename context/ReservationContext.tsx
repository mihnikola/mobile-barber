// /app/contexts/ReservationContext.tsx
import { createContext, type ReactNode, useContext, useState } from "react";
import { routes } from "@/lib/navigation/routes";

import type { ApiRecord, ReservationContextValue } from "./types";
import { catalogApi } from "@/lib/api/services";

// Create the context with a default value of null
const ReservationContext = createContext<ReservationContextValue | null>(null);

// ReservationProvider component to wrap around the app and provide context
export const ReservationProvider = ({ children }: { children: ReactNode }) => {
  const [reservation, setReservation] = useState<ApiRecord | null>(null);
  
  const updateReservation = (data: ApiRecord | null) => {
    setReservation(data);
  };

  const flowReservation: ReservationContextValue["flowReservation"] = async (service, categoryId) => {
    updateReservation({ ...reservation, service });

    const { location } = reservation as ApiRecord; // throws when null, as before
    try {
      const response = await catalogApi.category(categoryId,  {
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
    } catch {
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

/** Booking-in-progress state: { reservation, updateReservation, flowReservation }. */
export const useReservation = () => useContext(ReservationContext) as ReservationContextValue;

export default ReservationContext;
