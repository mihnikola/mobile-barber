import { get } from "@/api/apiService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useState } from "react";

const useUser = () => {
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMessage, setIsMessage] = useState(false);
  const [message, setMessage] = useState(null);

  const fetchUserData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const storedToken = await AsyncStorage.getItem("token");

        const response = await get(`/users/${storedToken}`);
        if (response.status === 200) {
          setUserData(response.data);
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
  const onPressHandler = (data) => {
    if (data === "1") {
      router.push("/(tabs)/(04_settings)/infoUserProfile");
    }
    if (data === "100") {
      router.push("/(tabs)/(04_settings)/infoApp");
    }
    if (data === "200") {
      router.push("/(tabs)/(04_settings)/infoPrivacy");
    }
    if (data === "900") {
      router.push("/(tabs)/(04_settings)/infoHelpCenter");
    }
    if (data === "6") {
      setIsMessage(true);
    }
  };



  return {
    userData,
    isLoading,
    error,
    setIsMessage,
    isMessage,
    message,
    setMessage,
    onPressHandler,
    fetchUserData
  };
};

export default useUser;
