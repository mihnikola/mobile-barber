import { useState, useEffect, useContext } from "react";
import { get, getData } from "@/api/apiService";
import { useLocalization } from "@/context/LocalizationContext";
import ReservationContext from "@/context/ReservationContext";

const useFetchService = () => {
  const [serviceData, setServicesData] = useState([]);
  const [categoriesServicesData, setCategoriesServicesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCategorySelected, setIsCategorySelected] = useState(null);
  const { reservation } = useContext(ReservationContext);

  const { localization } = useLocalization();
  const handleSelectCategory = (data) => {
    setIsCategorySelected(data);
  };

  const defaultCategoryHandler = (data) => {
    setIsCategorySelected(data);
  };
  const fetchAllServices = async (id) => {
    console.log("fetchAllServices");
    setIsLoading(true);
    setError(null);
    const { location, service } = reservation;
    try {
      const response = await getData(`/categories/${id}`, {
        placeId: location.id || location._id,
        serviceId: service.serviceId,
        categoryId: id,
      });
      if (response.status === 200) {
        setCategoriesServicesData(response.data);
        defaultCategoryHandler(response.data[0]);
      }
    } catch (err) {
      console.log("err", err);
      setError(localization.SERVICES.errorFetch);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    serviceData,
    isLoading,
    error,
    fetchAllServices,
    categoriesServicesData,
    isCategorySelected,
    handleSelectCategory,
  };
};

export default useFetchService;
