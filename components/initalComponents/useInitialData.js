// src/hooks/useCompany.js
import { get } from "@/api/apiService";
import { useState } from "react";

const useInitialData = () => {
  const [initialData, setInitialData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);



  const getInitialData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await get("/initial");
      setInitialData(response);
      setIsLoading(false);
    } catch (err) {
      console.error("Error fetching reservations:", err);
      setError(
        err.message ||
          "An unexpected error occurred while fetching reservations."
      );
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
