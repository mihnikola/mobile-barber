import { useContext } from "react";

import { useLocalization } from "@/context/LocalizationContext";
import ReservationContext from "@/context/ReservationContext";
import { get } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";
import { dataIfOk, useAsync } from "@/lib/hooks/useAsync";

/** Loads business locations; with a single location it is preselected in the reservation. */
const useFetchLocations = () => {
  const { reservation, updateReservation } = useContext(ReservationContext);
  const { localization } = useLocalization();
  const { data: locationsData, isLoading, error, run } = useAsync([]);

  const fetchLocations = () =>
    run(async () => {
      const data = dataIfOk(await get(endpoints.places));
      if (data && !(data.length > 1)) {
        updateReservation({ ...reservation, location: data[0] });
      }
      return data;
    }, localization.PLACES.error);

  return { locationsData, isLoading, error, fetchLocations };
};

export default useFetchLocations;
