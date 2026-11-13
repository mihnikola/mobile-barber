import { useContext, useState } from "react";

import { useLocalization } from "@/context/LocalizationContext";
import ReservationContext from "@/context/ReservationContext";
import { getData } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";
import { dataIfOk, useAsync } from "@/lib/hooks/useAsync";

/** Loads a category's services ("more services" screen) and preselects the first category. */
const useFetchService = () => {
  const [isCategorySelected, setIsCategorySelected] = useState(null);
  const { reservation } = useContext(ReservationContext);
  const { localization } = useLocalization();
  const { data: categoriesServicesData, isLoading, error, run } = useAsync([], { initialLoading: true });

  const handleSelectCategory = (data) => setIsCategorySelected(data);

  const fetchAllServices = (id) =>
    run(async () => {
      const { location, service } = reservation;
      const data = dataIfOk(
        await getData(endpoints.categories.byId(id), {
          placeId: location.id || location._id,
          serviceId: service.serviceId,
          categoryId: id,
        }),
      );
      if (data) setIsCategorySelected(data[0]);
      return data;
    }, localization.SERVICES.errorFetch);

  return {
    // never filled; kept for API compatibility
    serviceData: [],
    isLoading,
    error,
    fetchAllServices,
    categoriesServicesData,
    isCategorySelected,
    handleSelectCategory,
  };
};

export default useFetchService;
