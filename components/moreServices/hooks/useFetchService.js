import { useState, useEffect } from "react";
import { get } from "@/api/apiService";
import { useLocalization } from "@/context/LocalizationContext";

const useFetchService = () => {
  const [serviceData, setServicesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { localization } = useLocalization();
  const fetchAllServices = async (id) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await get(`/categories/${id}`);
      console.log("object",response.data);
      if (response.status === 200) {
        setServicesData(response?.data);
      }
    } catch (err) {
        console.log("err",err)
      setError(localization.SERVICES.errorFetch);
    } finally {
      setIsLoading(false);
    }
  };

  return { serviceData, isLoading, error, fetchAllServices };
};

export default useFetchService;
