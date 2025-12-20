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
import { changeLanguage } from "i18next";
import { getLanguageValue } from "@/helpers/language";
import NotificationService from "@/services/NotificationService";

// Create the context with a default value of false
export const AuthContext = createContext(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

// Provider component
export const AuthProvider = ({ children }) => {
  const [isToken, setIsToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingLogin, setIsLoadingLogin] = useState(false);
  const [isMessage, setIsMessage] = useState(false);
  const [isLogout, setIsLogout] = useState(false);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isIosLoading, setIosLoading] = useState(false);
  const [verificationData, setVerificationData] = useState(null);

  const [status, setStatus] = useState(null);
  const [success, setSuccess] = useState(null);
  const [message, setMessage] = useState(null);

  const { localization } = useLocalization();
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        "284831110803-0v5h2374cjlsfjsuhn11dbr4f3p1n0pm.apps.googleusercontent.com",
      iosClientId:
        "284831110803-u696dssmapohte49619rhmsdlselgmfg.apps.googleusercontent.com",
      profileImageSize: 150,
    });
  }, []);

  const signIn = async () => {
    setIsGoogleLoading(true);
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      if (isSuccessResponse(response)) {
        loginViaGoogle(response.data);
      } else {
        setIsGoogleLoading(false);
      }
    } catch (error) {
      console.log("error+++", error);
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

  const saveTokenSignInIos = async (userId, expoToken, lang) => {
    try {
      const responseData = await post("/api/saveToken", {
        tokenExpo: expoToken,
        tokenUser: userId,
        lang,
      });
      if (responseData.status === 200) {
        setIsMessage(true);
        setSuccess(localization.LOGIN.success);
      }
    } catch (err) {
      setIsMessage(true);
      setError(`${localization.LOGIN.errorToken} ${err.message || err}`);
    }
  };

  const signInIos = async (userData) => {

    const fcmToken = await NotificationService.getFCMToken();
    const languageValue = await getLanguageValue();

    if (!fcmToken) {
      setIsMessage(true);
      setError(localization.LOGIN.noToken);
      return;
    }
    setIosLoading(true);
    setError(null);
    try {
      const responseData = await post("/users/loginIos", {
        user: userData,
        fcmToken,
      });
      if (responseData.status === 200) {
        saveStorage(responseData.token);
        const lang = languageValue === "sr" || languageValue === null ? "sr" : "en";
        saveTokenSignInIos(responseData.userId, fcmToken, lang);
      }
    } catch (err) {
      if (err.message.includes("404")) {
        setIsMessage(true);
        setError(localization.SERVER_RESPONSE.notFound);
      } else {
        setIsMessage(true);
        setError(localization.SERVER_RESPONSE.error);
      }
    } finally {
      setIosLoading(false);
    }


  }
  const signOut = async () => {
    setIsGoogleLoading(true);

    try {
      await GoogleSignin.signOut();
      setIsGoogleLoading(false);
    } catch (error) { }
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
      setIsLoadingLogin(false);
      setMessage(null);
      setStatus(null);
      setSuccess(null);
      setIsLogout(false);

      router.push("/(tabs)/(04_settings)");
    } catch (error) {
      setError(error);
    }
  };
  const logoutFirebase = async () => {
    setIsLoadingLogin(true);
    await removeOtpParamsStorage();
    try {
      if (isToken) {
        const response = await post("/users/logout", { token: isToken });
        if (response.status === 200) {
          // router.dismissAll();

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
      router.push("/(tabs)/(04_settings)/userprofile");
    }
    if (data === "2") {
      router.push("/(tabs)/(04_settings)/languageSupport");
    }
    if (data === "100") {
      router.push("/(tabs)/(04_settings)/aboutapplication");
    }
    if (data === "200") {
      router.push("/(tabs)/(04_settings)/privacypolicy");
    }
    if (data === "900") {
      router.push("/(tabs)/(04_settings)/helpSupport");
    }
    if (data === "6") {
      setIsLogout(true);
    }
  };
  useEffect(() => {
    getTokenData(); //logovan
  }, []);

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
        router.push("/(z_auth)/otpCode");
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
    // const expoToken = await getExpoTokenStorage();
    const expoToken = await NotificationService.getFCMToken();
    const languageValue = await getLanguageValue();
    if (!email || !password) {
      setIsMessage(true);
      setError(localization.LOGIN.error);
      return;
    }
    if (!languageValue) {
      setIsMessage(true);
      setError(localization.LOGIN.noLanguage);
      return;
    }
    if (!expoToken) {
      setIsMessage(true);
      setError(localization.LOGIN.noToken);
      return;
    }

    setStatus(null);
    setIsLoadingLogin(true);
    setError(null);
    try {
      const responseData = await post("/users/login", {
        email,
        password,
        expoToken,
      });
      if (responseData.status === 202) {
        setIsLoadingLogin(false);
        setIsMessage(true);
        setError(localization.LOGIN.errorFields);
      }
      if (responseData.status === 606) {
        setIsLoadingLogin(false);
        setIsMessage(true);
        setVerificationData({ email, password });
        setStatus(responseData.status);
        setMessage(localization.LOGIN.isVerified);
      }
      if (responseData.status === 200) {
        setIsLoadingLogin(false);
        saveStorage(responseData.token);
        const lang =
          languageValue === "sr" || languageValue === null ? "sr" : "en";
        saveToken(responseData.userId, expoToken, lang);
      }
    } catch (err) {
      if (err.message.includes("404")) {
        setIsMessage(true);

        setError(localization.SERVER_RESPONSE.notFound);
      } else {
        setIsMessage(true);

        setError(localization.SERVER_RESPONSE.error);
      }
      setIsLoadingLogin(false);
    }
  };

  const loginViaGoogle = async (userData) => {
    setStatus(null);
    setError(null);

    const { user } = userData;
    // const expoToken = await getExpoTokenStorage();
    const expoToken = await NotificationService.getFCMToken();

    const languageValue = await getLanguageValue();

    if (!languageValue) {
      setIsMessage(true);
      setError(localization.LOGIN.noLanguage);
      return;
    }
    if (!expoToken) {
      setIsMessage(true);
      setError(localization.LOGIN.noToken);
      return;
    }

    try {
      const responseData = await post("/users/loginViaGoogle", {
        user,
        expoToken,
      });

      if (responseData.status === 200 || responseData.status === 300) {
        saveStorage(responseData.token);
        const lang = languageValue === "sr" ? "sr" : "en";

        saveTokenViaGoogle(responseData.userId, expoToken, lang);
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
  const saveTokenViaGoogle = async (userId, expoToken, languageValue) => {
    if (!expoToken) {
      setIsGoogleLoading(false);
      return;
    }

    try {
      const responseData = await post("/api/saveToken", {
        tokenExpo: expoToken,
        tokenUser: userId,
        lang: languageValue,
      });
      if (responseData.status === 200) {
        setIsGoogleLoading(false);
        setIsMessage(true);
        setSuccess(localization.LOGIN.success);
      } else {
        setIsGoogleLoading(false);
        setIsMessage(true);

        setError(
          `${localization.LOGIN.errorToken} ${responseData?.message || "Unknown error"
          }`
        );
      }
    } catch (err) {
      setIsGoogleLoading(false);
      setIsMessage(true);

      setError(`${localization.LOGIN.errorToken} ${err.message || err}`);
    }
  };

  const saveToken = async (userId, expoToken, lang) => {
    setIsLoadingLogin(true);
    if (!expoToken) {
      setIsLoadingLogin(false);
      return;
    }
    try {
      const responseData = await post("/api/saveToken", {
        tokenExpo: expoToken,
        tokenUser: userId,
        lang,
      });
      if (responseData.status === 200) {
        setIsLoadingLogin(false);
        setIsMessage(true);
        setSuccess(localization.LOGIN.success);
      } else {
        setIsLoadingLogin(false);
        setIsMessage(true);
        setError(
          `${localization.LOGIN.errorToken} ${responseData?.message || "Unknown error"
          }`
        );
      }
    } catch (err) {
      setIsLoadingLogin(false);
      setIsMessage(true);
      setError(`${localization.LOGIN.errorToken} ${err.message || err}`);
    }
  };

  return (
    <AuthContext.Provider
      value={{
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
        setIsLogout,
        isLogout,
        isGoogleLoading,
        isLoadingLogin,
        setIsLoadingLogin,
        signInIos,
        setIosLoading,
        isIosLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
