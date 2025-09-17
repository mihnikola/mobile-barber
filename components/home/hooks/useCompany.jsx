// src/hooks/useCompany.js
import { get } from "@/api/apiService";
import { useState } from "react";

const useCompany = () => {
  const [company, setCompany] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);



  const getCompany = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await get("/company");
      setCompany(response);
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
    company,
    isLoading,
    error,
    getCompany,
  };
};

export default useCompany;
