import { get } from "@/api/apiService";
import { useLocalization } from "@/context/LocalizationContext";
import { useState, useEffect } from "react";

const useFetchLocations = () => {
  
  const [locationsData, setLocationsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { localization } = useLocalization();

  const fetchLocations = async () => {
    setError(null);
    try {
      const response = await get("/places");
      if (response.status === 200) {
        setIsLoading(false);
        setLocationsData(response.data);
      }
    } catch (err) {
      setError(localization.PLACES.error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchLocations();
  }, []);

  return { locationsData, isLoading, error, fetchLocations };
};

export default useFetchLocations;
