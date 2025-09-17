import { get } from "@/api/apiService";
import { useState, useEffect } from "react";

const useFetchLocations = () => {
  
  const [locationsData, setLocationsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLocations = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await get("/places");
      if (response.status === 200) {
        setIsLoading(false);
        setLocationsData(response.data);
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
  useEffect(() => {
    fetchLocations();
  }, []);

  return { locationsData, isLoading, error };
};

export default useFetchLocations;
