import { get, post } from "@/api/apiService";
import { getStorage, removeStorage } from "@/helpers/token";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useState, useEffect } from "react";

const useUser = () => {
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMessage, setIsMessage] = useState(false);
  const [message, setMessage] = useState(null);

  const logoutFirebase = async () => {
    setIsLoading(true);
    let resultStatus = "";
    try {
      const sendUserData = await getStorage("token");
      if (sendUserData) {

        const result = await post(`/users/logout`, { token: sendUserData });
        if (result.status === 200) {
          resultStatus = result.status;
        }
      } 
    } catch (error) {
      setError(`Something Went Wrong, Please Try Again`);
    }
    if (resultStatus === 200) {
     await removeStorage().then((s) => {
        setIsLoading(false);
        router.push("/(tabs)/(01_home)");
      });
    }
  };
  useEffect(() => {
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
    fetchUserData();
  }, []);

  return {
    userData,
    isLoading,
    error,
    logoutFirebase,
    setIsMessage,
    isMessage,
    message,
    setMessage,
  };
};

export default useUser;
