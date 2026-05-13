// src/hooks/useFetchServices.js
import { useState, useEffect } from "react";
import { get } from "@/api/apiService";
import { useLocalization } from "@/context/LocalizationContext";

const useFetchServices = (reservation) => {
  const [serviceData, setServicesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { localization } = useLocalization();
  const fetchAllServices = async () => {
    setIsLoading(true);
    setError(null);
    const { location } = reservation;
    try {
      const response = await get(`/services/location/${location.id}`);
      if (response.status === 200) {
        setServicesData(response.data);
      }
    } catch (err) {
      setError(localization.SERVICES.errorFetch);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllServices();
  }, []);

  return { serviceData, isLoading, error, fetchAllServices };
};

export default useFetchServices;
