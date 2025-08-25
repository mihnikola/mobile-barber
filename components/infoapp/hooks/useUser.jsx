import { get, post } from "@/api/apiService";
import useGoogleSignIn from "@/components/login/hooks/useGoogleSignIn";
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
  const { signOut } = useGoogleSignIn();
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
  const logoutFromFIrebase = async () => {
    setIsLoading(true);
    let resultStatus = "";
    try {
      const token = await getStorage();
      if (token) {
        const response = await post("/users/logout", { token });
        if (response.status === 200) {
          resultStatus = response.status;
        }
      }
      if (resultStatus === 200) {
        console.log("resultStatusresultStatus", resultStatus);
        signOut();
        await logoutHandler();
      }
    } catch (error) {}
    const logoutHandler = async () => {
      try {
        const x = await removeStorage();
        router.push("/(tabs)/(04_settings)/login");
        setIsMessage(false);
        setIsLoading(false);

        // console.log("logoutHandler promisses 222", s);
      } catch (error) {
        console.error(error);
      }
    };
  };
  return {
    userData,
    isLoading,
    error,
    logoutFirebase,
    setIsMessage,
    isMessage,
    message,
    setMessage,
    onPressHandler,
    logoutFromFIrebase,
  };
};

export default useUser;
