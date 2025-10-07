import { get, post, getData } from "@/api/apiService";
import { getStorage, saveStorage, removeStorage } from "@/helpers/token";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { getExpoTokenStorage } from "@/helpers/expoToken";
import {
  getOtpParamsStorage,
  removeOtpParamsStorage,
  saveOtpParamsStorage,
} from "@/helpers/verificationOtpParams";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocalization } from "./LocalizationContext";
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
  const [isLoading, setIsLoading] = useState(false);
  const [isMessage, setIsMessage] = useState(false);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [verificationData, setVerificationData] = useState(null);

  const [status, setStatus] = useState(null);
  const [success, setSuccess] = useState(null);
  const [message, setMessage] = useState(null);

  const { localization } = useLocalization();
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        "296975015881-kres44p2oghegd6ieqrur44ak1t89lpg.apps.googleusercontent.com",
      profileImageSize: 150,
    });
  }, []);

  const signIn = async () => {
    setIsGoogleLoading(true);
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      setIsGoogleLoading(false);
      console.log("xxxxxxxxxxxxx");
      if (isSuccessResponse(response)) {
        console.log("wwwwwwwwwwwwwwwww");

        loginViaGoogle(response.data);
      } else {
        // sign in was cancelled by user
        setIsGoogleLoading(false);
      }
    } catch (error) {
      console.log("error+++",error);
      setIsGoogleLoading(false);

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
        setIsGoogleLoading(false);
      }
      setIsGoogleLoading(false);
    }
  };
  const signOut = async () => {
    setIsGoogleLoading(true);

    try {
      await GoogleSignin.signOut();
      setIsGoogleLoading(false);
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
        setError(localization.SERVER_RESPONSE.notFound);
      } else {
        setError(localization.SERVER_RESPONSE.error);
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
      setError(error);
    }
  };
  const logoutFirebase = async () => {
    setIsLoading(true);
    await removeOtpParamsStorage();
    try {
      if (isToken) {
        const response = await post("/users/logout", { token: isToken });
        if (response.status === 200) {
          signOut();
          logoutHandler();
        }
      }
    } catch (error) {
      setError(error);
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

  const verificationOTPCode = async () => {
    setIsLoading(true);
    const { email, password } = verificationData;
    console.log("verificationOTPCode sendOTPviaLogin", email, password);
    try {
      const response = await getData("/users/sendOTPviaLogin", {
        params: { email },
      });

      console.log("verificationOTPCode+++", response);
      if (response.status === 200) {
        await saveOtpParamsStorage(verificationData);
        setIsLoading(false);
        setIsMessage(false);
        router.push("/(tabs)/(04_settings)/otpCode");
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
      setError(localization.SERVER_RESPONSE.error);
    }
  };

  const login = async (email, password) => {
    if (!email || !password) {
      setIsMessage(true);
      setError(localization.LOGIN.error);
      return;
    }
    const expoToken = await getExpoTokenStorage();
    setStatus(null);
    setIsLoading(true);
    setError(null);
    try {
      const responseData = await post("/users/login", {
        email,
        password,
        expoToken,
      });
      if (responseData.status === 202) {
        setIsLoading(false);
        setIsMessage(true);
        setError(localization.LOGIN.errorFields);
      }
      if (responseData.status === 606) {
        setIsLoading(false);
        setIsMessage(true);
        setVerificationData({ email, password });
        setStatus(responseData.status);
        setMessage(localization.LOGIN.isVerified);
      }
      if (responseData.status === 200) {
        setIsLoading(false);
        saveStorage(responseData.token);
        saveToken(responseData.userId, expoToken);
      }
    } catch (err) {
      if (err.message.includes("404")) {
        setIsMessage(true);

        setError(localization.SERVER_RESPONSE.notFound);
      } else {
        setIsMessage(true);

        setError(localization.SERVER_RESPONSE.error);
      }
      setIsLoading(false);
    }
  };

  const loginViaGoogle = async (userData) => {
    setStatus(null);
    setError(null);

    const { user } = userData;
    const expoToken = await getExpoTokenStorage();

    try {
      const responseData = await post("/users/loginViaGoogle", { user, expoToken });

      if (responseData.status === 200 || responseData.status === 300) {
        saveStorage(responseData.token);
        saveTokenViaGoogle(responseData.userId, responseData.token);
      }

      if (responseData.status === 500) {
        setIsGoogleLoading(false);
        setError(localization.SERVER_RESPONSE.error);
      }
    } catch (err) {
      setIsGoogleLoading(false);

      if (err.message.includes("404")) {
        setIsMessage(true);

        setError(localization.SERVER_RESPONSE.notFound);
      } else {
        setIsMessage(true);

        setError(localization.SERVER_RESPONSE.error);
      }
    }
  };

  const saveToken = async (userId, expoToken) => {
    setIsLoading(true);
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
        setSuccess(localization.LOGIN.success);
      } else {
        setIsLoading(false);
        setIsMessage(true);
        setError(
          `${localization.LOGIN.errorToken} ${
            responseData?.message || "Unknown error"
          }`
        );
      }
    } catch (err) {
      setIsLoading(false);
      setIsMessage(true);
      setIsLoading(false);

      setError(`${localization.LOGIN.errorToken} ${err.message || err}`);
    }
  };

  const saveTokenViaGoogle = async (userId,expoToken) => {

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
        setIsGoogleLoading(false);
        setIsMessage(true);
        setSuccess(localization.LOGIN.success);
      } else {
        setIsGoogleLoading(false);
        setIsMessage(true);

        setError(
          `${localization.LOGIN.errorToken} ${
            responseData?.message || "Unknown error"
          }`
        );
      }
    } catch (err) {
      setIsGoogleLoading(false);
      setIsMessage(true);

      setError(`${localization.LOGIN.errorToken} ${err.message || err}`);
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
        isGoogleLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
