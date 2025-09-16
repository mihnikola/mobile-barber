// src/hooks/useFetchEmployers.js
import { get } from "@/api/apiService";
import { useState, useEffect } from "react";

const useFetchLocations = () => {
  const [locationsData, setLocationsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchLocations = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await get("/places");
        console.log("first",response);
        if (response.status === 200) {
          setLocationsData(response.data);
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
    fetchLocations();
  }, []);

  return { locationsData, isLoading, error };
};

export default useFetchLocations;
