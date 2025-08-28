import { get, post } from "@/api/apiService";
import useGoogleSignIn from "../../../components/login/hooks/useGoogleSignIn";
import { getStorage, removeStorage } from "@/helpers/token";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect, useState } from "react";

const useUser = () => {
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isMessage, setIsMessage] = useState(false);
  const { signOut } = useGoogleSignIn();

  const [isValidToken, setIisValidToken] = useState(false);

  useEffect(() => {
    setIsLoading(true);
  }, []);

  const logoutHandler = async () => {
    try {
      const x = await removeStorage();
      // router.push("/(tabs)/(04_settings)/login");
      console.log("resultStatusresultStatus", x);
      setIsMessage(false);
      setTimeout(() => {
        tokenData();
      }, 200);

      // console.log("logoutHandler promisses 222", s);
    } catch (error) {
      console.error(error);
    }
  };
  const logoutFromFIrebase = async () => {
    setIsLoading(true);
    try {
      const token = await getStorage();
      if (token) {
        const response = await post("/users/logout", { token });
        if (response.status === 200) {
          signOut();
          logoutHandler();
        }
      }
    } catch (error) {}
  };
  const tokenData = async () => {
    setIsLoading(true);
    try {
      const storedToken = await AsyncStorage.getItem("token");
      console.log("storedToken", storedToken);

      if (storedToken) {
        setIisValidToken(true);

        console.log("tokenData isValid+++ bbbbbbbbbbbbbbbbbb");
      } else {
        setIisValidToken(false);
      }
      setIsLoading(false);
    } catch (err) {
      setIisValidToken(false);
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

  return {
    userData,
    isLoading,
    error,
    tokenData,
    fetchUserData,
    onPressHandler,
    logoutFromFIrebase,
    isMessage,
    setIsMessage,
    isValidToken,
  };
};

export default useUser;
