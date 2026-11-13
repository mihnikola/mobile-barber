import { get, post, getData } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";
import { googleSignInConfig } from "@/lib/config";
import { getStorage, saveStorage, removeStorage } from "@/helpers/token";
import {
  removeOtpParamsStorage,
  saveOtpParamsStorage,
} from "@/helpers/verificationOtpParams";

import { createContext, type ReactNode, useContext, useEffect, useState } from "react";
import { useLocalization } from "./LocalizationContext";
import {
  GoogleSignin,
  isErrorWithCode,
  isSuccessResponse,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { appleAuth } from "@invertase/react-native-apple-authentication";
import { getLanguageValue } from "@/helpers/language";
import NotificationService from "@/services/NotificationService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { ApiRecord, AuthContextValue, AuthLoading } from "./types";

export const AuthContext = createContext<AuthContextValue | null>(null);

export const useAuth = () => {
  return useContext(AuthContext) as AuthContextValue;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isToken, setIsToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isMessage, setIsMessage] = useState(false);
  const [isLogout, setIsLogout] = useState(false);
  const [userData, setUserData] = useState<ApiRecord | null>(null);
  const [error, setError] = useState<ApiRecord | string | null>(null);

  const [verificationData, setVerificationData] = useState<ApiRecord | null>(null);

  const [status, setStatus] = useState<number | null>(null);
  const [success, setSuccess] = useState<string | boolean | ApiRecord | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const { localization } = useLocalization();

  const [loading, setLoading] = useState<AuthLoading>(null);

  const [redirectValue, setRedirectValue] = useState<string | null>(null);
  // possible values: null | 'login' | 'google' | 'ios' | 'logout' | 'otp'

  useEffect(() => {
    GoogleSignin.configure({
      ...googleSignInConfig,
      profileImageSize: 150,
    });
  }, []);

  const withLoading = async <T,>(type: AuthLoading, callback: () => Promise<T>): Promise<T> => {
    setLoading(type);
    try {
      return await callback();
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

  /**
   * After a successful login message: reload the token and tell the caller where to go.
   * Returns "settings" | "appointments" | "calendar" | null — the screen navigates (Phase 4b).
   */
  const redirectValidation: AuthContextValue["redirectValidation"] = async (data) => {
    await getTokenData();
    setIsMessage(false);
    if (data === "settings" || data === "appointments") return data;
    if (data === "calendar") {
      setRedirectValue("calendar");
      return data;
    }
    await AsyncStorage.removeItem("paramLogin");
    return null;
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
      } catch (error: any) {
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

  const signInIos = async (userData: ApiRecord) => {
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
      const responseData = await post(endpoints.users.loginIos, {
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
    } catch (err: any) {
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
      await GoogleSignin.signOut();
    } catch {
    }
  };

  const fetchUserData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await get(endpoints.users.byToken(isToken as string));
      if (response.status === 200) {
        setUserData(response.data);
        setIsLoading(false);
      }
    } catch (err: any) {
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
    // NOTE (B26): removeStorage resolves to undefined, so setIsToken(null) below never runs. Unused today.
    await removeStorage().then((res: unknown) => {
      if (res) {
        setIsToken(null);
      }
    });
  };

  const logoutHandler = async () => {
    try {
      await AsyncStorage.removeItem("paramLogin");

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

        } catch {
        }
      }, 150); // 150ms je dovoljno da iOS završi navigacionu animaciju
    } catch (error: any) {
      setError(error);
    }
  };
  const logoutUnAuthorizedUser = async () => {
    await removeStorage();
    await signOut();
  }

  const logoutFirebase = async () => {
    await removeOtpParamsStorage();

    try {
      if (isToken) {
        const response = await post(endpoints.users.logout, { token: isToken });
        if (response.status === 200) {
          await removeStorage();
          await signOut();
        }
      }
    } catch (error: any) {
      setError(error);
    }
  };


  const verificationOTPCode = async () =>
    withLoading("verification", async () => {
      const { email } = verificationData as ApiRecord; // throws when null, as before
      try {
        const response = await getData(endpoints.users.sendOtpViaLogin, {
          params: { email },
        });

        if (response.status === 200) {
          await saveOtpParamsStorage(verificationData);
          setIsMessage(false);
          return true;
        }
        if (response.status === 500) {
          setError(response.message);
        }
        if (response.status === 404) {
          setError(response.message);
        }
      } catch {
        setError(localization.SERVER_RESPONSE.error);
      } finally {
        setIsLoading(false);
      }
    });

  const login = (email: string, password: string) => {
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
        const responseData = await post(endpoints.users.login, {
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
      } catch (err: any) {
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

  const loginViaGoogle = async (userData: ApiRecord) => {
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
      const responseData = await post(endpoints.users.loginViaGoogle, {
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
    } catch (err: any) {

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
        logoutUnAuthorizedUser,
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
        setRedirectValue,
        redirectValue,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
