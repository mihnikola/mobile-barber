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
        if (response.status === 200) {
          setEmplData(response.data);
          setIsLoading(false);
        }
      } catch (err) {
        if (err.message.includes("404")) {
          setError(`Not found endpoint`);
        } else {
          setError(`Something Went Wrong, Please Try Again`);
        }
        setIsLoading(false);
      }
    };
    fetchAllEmployees();
  }, []);

  return { emplData, isLoading, error };
};

export default useFetchEmployers;
