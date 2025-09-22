// src/hooks/useCompany.js
import { get } from "@/api/apiService";
import { useLocalization } from "@/context/LocalizationContext";
import { useState } from "react";

const useCompany = () => {
  const [company, setCompany] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { localization } = useLocalization();


  const getCompany = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await get("/company");
      setCompany(response);
      setIsLoading(false);
    } catch (err) {
      setError(localization.COMPANY.error);
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
