import { get, post, getData } from "@/api/apiService";
import { getStorage, saveStorage, removeStorage } from "@/helpers/token";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { getExpoTokenStorage } from "@/helpers/expoToken";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  GoogleSignin,
  isErrorWithCode,
  isSuccessResponse,
} from "@react-native-google-signin/google-signin";

// Create the context with a default value of false
export const AuthContext = createContext(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

// Provider component
export const AuthProvider = ({ children }) => {
  const [initialToken, setInitialToken] = useState(null);
  const [isToken, setIsToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMessage, setIsMessage] = useState(false);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  const [status, setStatus] = useState(null);
  const [success, setSuccess] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        "296975015881-kres44p2oghegd6ieqrur44ak1t89lpg.apps.googleusercontent.com",
      profileImageSize: 150,
    });
  }, []);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      if (isSuccessResponse(response)) {
        loginViaGoogle(response.data);
      } else {
        // sign in was cancelled by user
      }
    } catch (error) {
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            // operation (eg. sign in) already in progress
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            // Android only, play services not available or outdated
            break;
          default:
          // some other error happened
        }
      } else {
        // an error that's not related to google sign in occurred
      }
    }
  };
  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
    } catch (error) {}
  };

  const fetchUserData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await get(`/users/${isToken}`);
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
  const getTokenData = async () => {
    setIsLoading(true);
    await getStorage().then((res) => {
      if (res) {
        setIsToken(res);
      } else {
        setIsToken(null);
      }
      setIsLoading(false);
    });
  };

  useEffect(() => {
    if (isToken) {
      fetchUserData();
    }
  }, [isToken]);

  const removeTokenData = async () => {
    await removeStorage().then((res) => {
      if (res) {
        setIsToken(null);
      }
    });
  };

  const logoutHandler = async () => {
    try {
      const x = await removeStorage();
      setIsMessage(false);
      setIsToken(null);
      setIsLoading(false);
    } catch (error) {
      console.error("logoutHandler error ", error);
    }
  };
  const logoutFirebase = async () => {
    setIsLoading(true);
    try {
      if (isToken) {
        const response = await post("/users/logout", { token: isToken });
        if (response.status === 200) {
          signOut();
          logoutHandler();
        }
      }
    } catch (error) {
      console.log("logoutFirebase error", error);
    }
  };

  const onPressHandler = (data) => {
    if (data === "1") {
      router.push("/(tabs)/(04_settings)/infoUserProfile");
    }
       if (data === "2") {
      router.push("/(tabs)/(04_settings)/languageChange");
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
  useEffect(() => {
    getInitialTokenData();
    getTokenData();
  }, []);

  //initial Token screen
  const addInitialTokenData = async () => {
    const valueToStore = { name: "John Doe", age: 30 };
    await AsyncStorage.setItem("initialToken", JSON.stringify(valueToStore));
    setInitialToken(valueToStore);
  };
  const getInitialTokenData = async () => {
    await AsyncStorage.getItem("initialToken").then((res) => {
      if (res) {
        setInitialToken(res);
      }
      setIsLoading(false);
    });
  };

  const verificationOTPCode = async (email, password) => {
    setIsLoading(true);

    try {
      const response = await getData("/users/sendOTPviaLogin", {
        params: { email, password },
      });
      if (response.status === 200) {
        setIsLoading(false);
        setIsMessage(false);

        router.push({
          pathname: "/(tabs)/(04_settings)/otpCodeRegister",
          params: { email, password },
        });
      }
      if (response.status === 500) {
        setIsLoading(false);
        setError(response.message);
      }
      if (response.status === 404) {
        setIsLoading(false);
        setError(response.message);
      }
    } catch (err) {
      setIsLoading(false);
      setError("Something goes wrong! Please try again!");
    }
  };

  const login = async (email, password) => {
    if (!email || !password) {
      setIsMessage(true);
      setError("Please enter both email and password");
      return;
    }
    setStatus(null);

    setIsLoading(true);
    setError(null);

    try {
      const responseData = await post("/users/login", { email, password });
      if (responseData.status === 202) {
        setIsLoading(false);
        setIsMessage(true);
        setError(responseData.message);
      }
      if (responseData.status === 606) {
        setIsLoading(false);
        setIsMessage(true);
        setStatus(responseData.status);
        setMessage(responseData.message);
      }
      if (responseData.status === 200) {
        setIsLoading(false);
        saveStorage(responseData.token);
        saveToken(responseData.userId, responseData.token);
      }
    } catch (err) {
      if (err.message.includes("404")) {
        setIsMessage(true);

        setError(` Not found endpoint`);
      } else {
        setIsMessage(true);

        setError(`Something Went Wrong, Please Try Again`);
      }
      setIsLoading(false);
    }
  };

  const loginViaGoogle = async (userData) => {
    setStatus(null);

    setIsLoading(true);
    setError(null);

    const { user } = userData;

    try {
      const responseData = await post("/users/loginViaGoogle", { user });

      if (responseData.status === 200 || responseData.status === 300) {
        setIsLoading(false);
        saveStorage(responseData.token);
        saveToken(responseData.userId, responseData.token);
      }

      if (responseData.status === 500) {
        setIsLoading(false);
        setError(responseData.message);
      }
    } catch (err) {
      if (err.message.includes("404")) {
        setIsMessage(true);

        setError(` Not found endpoint`);
      } else {
        setIsMessage(true);

        setError(`Something Went Wrong, Please Try Again`);
      }
      setIsLoading(false);
    }
  };

  const saveToken = async (userId) => {
    setIsLoading(true);
    const expoToken = await getExpoTokenStorage();

    if (!expoToken) {
      setIsLoading(false);
      return;
    }

    try {
      const responseData = await post("/api/saveToken", {
        tokenExpo: expoToken,
        tokenUser: userId,
      });
      if (responseData.status === 200) {
        setIsLoading(false);
        setIsMessage(true);
        setSuccess("Login Successful!");
      } else {
        setIsLoading(false);
        setIsMessage(true);

        setError(
          `Failed to save token: ${responseData?.message || "Unknown error"}`
        );
      }
    } catch (err) {
      setIsLoading(false);
      setIsMessage(true);

      setError(`Error saving token: ${err.message || err}`);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        getInitialTokenData,
        addInitialTokenData,
        initialToken,
        isLoading,
        getTokenData,
        removeTokenData,
        isToken,
        logoutFirebase,
        onPressHandler,
        setIsMessage,
        isMessage,
        userData,
        fetchUserData,
        error,
        login,
        saveToken,
        success,
        status,
        verificationOTPCode,
        message,
        loginViaGoogle,
        signIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
