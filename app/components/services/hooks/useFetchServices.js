// src/hooks/useFetchServices.js
import { useState, useEffect } from "react";
import { get } from "@/api/apiService";

const useFetchServices = () => {
  const [serviceData, setServicesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllServices = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await get("/services/client");
        setServicesData(response);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching services:", err);
        setError(
          err.message || "An unexpected error occurred while fetching services."
        );
        setIsLoading(false);
      }
    };

    fetchAllServices();
  }, []);

  return { serviceData, isLoading, error };
};

export default useFetchServices;
