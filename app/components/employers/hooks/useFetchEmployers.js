// src/hooks/useFetchEmployers.js
import { get } from "@/api/apiService";
import { useState, useEffect } from "react";

const useFetchEmployers = () => {
  const [emplData, setEmplData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllEmployees = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await get("/users");
        setEmplData(response);
        setIsLoading(false);
      
      } catch (err) {
        console.error("Error fetching employees:", err);
        setError(
          err.message ||
            "An unexpected error occurred while fetching employees."
        );
        setIsLoading(false);
      }
    };
    fetchAllEmployees();
  }, []);

  return { emplData, isLoading, error };
};

export default useFetchEmployers;
