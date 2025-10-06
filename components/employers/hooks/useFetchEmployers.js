import { getData } from "@/api/apiService";
import { useLocalization } from "@/context/LocalizationContext";
import { useState } from "react";

const useFetchEmployers = () => {
  const [emplData, setEmplData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { localization } = useLocalization();

  const fetchAllEmployees = async (location,service) => {

    setIsLoading(true);
    setError(null);
    try {
      const response = await getData("/users", { location, service });

      if (response.status === 200) {
        setEmplData(response.data);
        setIsLoading(false);
      }
    } catch (err) {
      setError(localization.BARBERS.error);
      setIsLoading(false);
    }
  };


  return { fetchAllEmployees, emplData, isLoading, error };
};

export default useFetchEmployers;
