// src/hooks/useReservationHandler.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useState } from "react";

const useReservationHandler = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState(null);

  const checkToken = async () => {
    setIsLoading(true);
    try {
      const storedToken = await AsyncStorage.getItem("token");

      if (storedToken) {
        setToken(storedToken);
      } else {
        setToken(null);
        router.push({
          pathname: "/(tabs)/(04_settings)/login",
          params: { data: 2 },
        });
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error reading token:", error);
    }
  };

  return {
    checkToken,
    isLoading,
    token,
  };
};

export default useReservationHandler;
