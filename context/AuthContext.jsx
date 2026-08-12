import { get, post, getData } from "@/api/apiService";
import { getStorage, saveStorage, removeStorage } from "@/helpers/token";
import { router } from "expo-router";
import {
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
import { appleAuth } from "@invertase/react-native-apple-authentication";
import { getLanguageValue } from "@/helpers/language";
import NotificationService from "@/services/NotificationService";
import { Alert, unstable_batchedUpdates } from "react-native";
export const AuthContext = createContext(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isToken, setIsToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isMessage, setIsMessage] = useState(false);
  const [isLogout, setIsLogout] = useState(false);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  const [verificationData, setVerificationData] = useState(null);

  const [status, setStatus] = useState(null);
  const [success, setSuccess] = useState(null);
  const [message, setMessage] = useState(null);

  const { localization } = useLocalization();

  const [loading, setLoading] = useState(null);
  // possible values: null | 'login' | 'google' | 'ios' | 'logout' | 'otp'

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        "284831110803-0v5h2374cjlsfjsuhn11dbr4f3p1n0pm.apps.googleusercontent.com",
      iosClientId:
        "284831110803-u696dssmapohte49619rhmsdlselgmfg.apps.googleusercontent.com",
      profileImageSize: 150,
    });
  }, []);

  const withLoading = async (type, callback) => {
    setLoading(type);
    try {
      await callback();
    } finally {
      setLoading(null);
    }
  };
  async function onAppleButtonPress() {
    withLoading("ios", async () => {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
      });
      if (!appleAuthRequestResponse.identityToken) {
        throw new Error("Apple Sign-In failed - no identify token returned");
      }

      const userData = {
        email: appleAuthRequestResponse?.email,
        fullName: appleAuthRequestResponse?.fullName,
        user: appleAuthRequestResponse?.user,
        token: appleAuthRequestResponse?.identityToken,
      };
      await signInIos(userData);
    });
  }

  const redirectValidation = async (data) => {
    await getTokenData();
    setIsMessage(false);
    if (data === "settings") {
      router.back();

      router.setParams({
        reevaluted: true,
      });
      router.push("/(tabs)/(04_settings)/");
      return;
    }
    if (data === "appointments") {
      router.back();

      router.setParams({
        reevaluted: true,
      });
      router.push("/(tabs)/(03_calendar)/");
      return;
    }
    if (data === "calendar") {
      router.back();

      router.setParams({
        reevaluted: true,
      });
      router.push("/(tabs)/(02_barbers)/calendar");
      return;
    } else {
      router.back();
      router.setParams({
        reevaluted: true,
      });
      return;
    }
  };

  const signIn = async () => {
    withLoading("google", async () => {
      try {
        await GoogleSignin.hasPlayServices({
          showPlayServicesUpdateDialog: true,
        });
        const response = await GoogleSignin.signIn();
        if (isSuccessResponse(response)) {
          await loginViaGoogle(response.data);
        }
      } catch (error) {
        console.log("Google Sign-In error:", error.code, error.message);
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
        }
      }
    });
  };

  const signInIos = async (userData) => {
    const fcmToken = await NotificationService.getFCMToken();
    const languageValue = await getLanguageValue();

    if (!fcmToken) {
      setIsMessage(true);
      setError(localization.LOGIN.noToken);
      return;
    }
    if (!languageValue) {
      setIsMessage(true);
      setError(localization.LOGIN.noLanguage);
      return;
    }

    setError(null);
    try {
      const responseData = await post("/users/loginIos", {
        user: userData,
        fcmToken,
      });
      setIsMessage(true);
      if (responseData.status === 208) {
        setError(localization.DETERMINATION.error);
      }

      if (responseData.status === 200) {
        saveStorage(responseData.token);
        setSuccess(localization.LOGIN.success);
      }
    } catch (err) {
      setIsMessage(true);

      if (err.message.includes("404")) {
        setError(localization.SERVER_RESPONSE.notFound);
      } else {
        setError(localization.SERVER_RESPONSE.error);
      }
    }
  };
  const signOut = async () => {
    try {
      // const isSignedIn = await GoogleSignin.isSignedIn();
      // if (isSignedIn) {
      await GoogleSignin.signOut();
      // }
    } catch (error) {
      console.log("Greška:", error);
    }
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

  const logoutHandler = () => {
    try {
      console.log("1. Pokrećem logout...");

      // KLJUČ: Prvo i jedino menjamo token da navigacija odmah prebaci korisnika na Login
      setIsToken(null);

      // Sve ostale state-ove čistimo sa malim zakašnjenjem,
      // tek kada se ekran bezbedno promeni i stari ekran uništi!
      setTimeout(() => {
        try {
          setUserData(null);
          setIsMessage(false);
          setMessage(null);
          setStatus(null);
          setSuccess(null);
          console.log("3. Svi podaci iz memorije uspešno očišćeni.");
        } catch (e) {
          console.log("Greška unutar setTimeout u logoutHandleru:", e);
        }
      }, 150); // 150ms je dovoljno da iOS završi navigacionu animaciju
    } catch (error) {
      setError(error);
    }
  };

  const logoutFirebase = async () => {
    await removeOtpParamsStorage();

    try {
      if (isToken) {
        const response = await post("/users/logout", { token: isToken });
        if (response.status === 200) {
          await removeStorage();
          await signOut();
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

  const verificationOTPCode = async () => {
    withLoading("verification", async () => {
      const { email } = verificationData;
      try {
        const response = await getData("/users/sendOTPviaLogin", {
          params: { email },
        });

        if (response.status === 200) {
          await saveOtpParamsStorage(verificationData);
          setIsMessage(false);
          router.push("/(z_auth)/otpCode");
        }
        if (response.status === 500) {
          setError(response.message);
        }
        if (response.status === 404) {
          setError(response.message);
        }
      } catch (err) {
        setError(localization.SERVER_RESPONSE.error);
      } finally {
        setIsLoading(false);
      }
    });
  };

  const login = (email, password) => {
    withLoading("login", async () => {
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
      setError(null);
      try {
        const responseData = await post("/users/login", {
          email,
          password,
          expoToken,
        });
        setIsMessage(true);
        if (responseData.status === 208) {
          setError(localization.DETERMINATION.error);
        }
        if (responseData.status === 202) {
          setError(localization.LOGIN.errorFields);
        }
        if (responseData.status === 606) {
          setVerificationData({ email, password });
          setStatus(responseData.status);
          setMessage(localization.LOGIN.isVerified);
        }
        if (responseData.status === 200) {
          saveStorage(responseData.token);
          setSuccess(localization.LOGIN.success);
        }
      } catch (err) {
        setIsMessage(true);
        if (err.message.includes("404")) {
          setError(localization.SERVER_RESPONSE.notFound);
        } else {
          setError(localization.SERVER_RESPONSE.error);
        }
      } finally {
        setLoading(null);
      }
    });
  };

  const loginViaGoogle = async (userData) => {
    setStatus(null);
    setError(null);

    const { user } = userData;
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
      setIsMessage(true);
      if (responseData.status === 208) {
        await GoogleSignin.signOut();
        setError(localization.DETERMINATION.error);
      }

      if (responseData.status === 200 || responseData.status === 300) {
        saveStorage(responseData.token);
        setSuccess(localization.LOGIN.success);
      }

      if (responseData.status === 500) {
        setError(localization.SERVER_RESPONSE.error);
      }
    } catch (err) {
      console.log("err", err);

      setIsMessage(true);

      if (err.message.includes("404")) {
        setError(localization.SERVER_RESPONSE.notFound);
      } else {
        setError(localization.SERVER_RESPONSE.error);
      }
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
        success,
        status,
        verificationOTPCode,
        message,
        signIn,
        setIsLogout,
        isLogout,
        onAppleButtonPress,
        loading,
        setLoading,
        redirectValidation,
        logoutHandler,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
