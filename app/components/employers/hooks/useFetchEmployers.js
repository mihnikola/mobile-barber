// src/hooks/useFetchEmployers.js
import { get } from "@/api/apiService";
import { useState, useEffect } from "react";
import { ToastAndroid } from "react-native";

const useFetchEmployers = () => {
  const [emplData, setEmplData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const showToast = (text) => {
    ToastAndroid.show(text, ToastAndroid.SHORT);
  };
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
          showToast(` Not found endpoint`);
        } else {
          showToast(`Something Went Wrong, Please Try Again`);
        }
        setIsLoading(false);
      }
    };
    fetchAllEmployees();
  }, []);

  return { emplData, isLoading, error };
};

export default useFetchEmployers;
