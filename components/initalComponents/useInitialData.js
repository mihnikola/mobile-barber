import { get } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";
import { useLocalization } from "@/context/LocalizationContext";
import { useState } from "react";

const useInitialData = () => {
  const [initialData, setInitialData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { localization } = useLocalization();

  const getInitialData = async () => {

    setIsLoading(true);
    setError(null);
    try {
      const response = await get(endpoints.initial);


      setInitialData(response);
      setIsLoading(false);
    } catch (err) {
      setError(localization.INITIAL.error)
      setIsLoading(false);
    }
  };

  return {
    initialData,
    isLoading,
    error,
    getInitialData,
  };
};

export default useInitialData;
