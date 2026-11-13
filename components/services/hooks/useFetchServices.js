import { useEffect } from "react";

import { useLocalization } from "@/context/LocalizationContext";
import { useReservation } from "@/context/ReservationContext";
import { get } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";
import { dataIfOk, useAsync } from "@/lib/hooks/useAsync";

/**
 * Loads services for the selected location on mount.
 * (Unused `fetchOtherServiceOrEmployers` / `funcDateTimeReservation` that navigated from inside the
 * hook were removed in Phase 3.3 — the screen uses `flowReservation` and navigates itself.)
 */
const useFetchServices = () => {
  const { reservation } = useReservation();
  const { localization } = useLocalization();
  const { data: serviceData, isLoading, error, run } = useAsync([], { initialLoading: true });

  const fetchAllServices = () =>
    run(
      async () => dataIfOk(await get(endpoints.services.byLocation(reservation.location.id))),
      localization.SERVICES.errorFetch,
    );

  useEffect(() => {
    fetchAllServices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { serviceData, isLoading, error, fetchAllServices };
};

export default useFetchServices;
