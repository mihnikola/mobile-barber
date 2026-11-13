

import { useLocalization } from "@/context/LocalizationContext";
import { useReservation } from "@/context/ReservationContext";
import { dataIfOk, useAsync } from "@/lib/hooks/useAsync";
import { catalogApi } from "@/lib/api/services";

/** Loads business locations; with a single location it is preselected in the reservation. */
const useFetchLocations = () => {
  const { reservation, updateReservation } = useReservation();
  const { localization } = useLocalization();
  const { data: locationsData, isLoading, error, run } = useAsync([]);

  const fetchLocations = () =>
    run(async () => {
      const data = dataIfOk(await catalogApi.places());
      if (data && !(data.length > 1)) {
        updateReservation({ ...reservation, location: data[0] });
      }
      return data;
    }, localization.PLACES.error);

  return { locationsData, isLoading, error, fetchLocations };
};

export default useFetchLocations;
