// src/hooks/useFetchEmployers.js
import { get } from "@/api/apiService";
import { useLocalization } from "@/context/LocalizationContext";
import { useState, useEffect } from "react";

const useFetchEmployers = () => {
  const [emplData, setEmplData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { localization } = useLocalization();

  const fetchAllEmployees = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await get("/users");
      if (response.status === 200) {
        setEmplData(response.data);
        setIsLoading(false);
      }
    } catch (err) {
      setError(localization.BARBERS.error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchAllEmployees();
  }, []);

  return { emplData, isLoading, error };
};

export default useFetchEmployers;
