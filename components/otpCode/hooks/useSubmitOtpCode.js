// src/hooks/useEmailOtpCode.js
import { useState } from "react";
import { getData, post } from "@/api/apiService";
import { useLocalization } from "@/context/LocalizationContext";
import { getExpoTokenStorage } from "@/helpers/expoToken";
import { saveStorage } from "@/helpers/token";

const useSubmitOtpCode = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [isMessage, setIsMessage] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const { localization } = useLocalization();

  const checkOtpCodeValidation = async (email, otpCode) => {
    setIsLoading(true);
    setError(null);
    try {
      console.log("checkOtpCodeValidation pre");
      const response = await getData("/users/otpcode", {
        email,
        otpCode,
      });
      console.log("checkOtpCodeValidation++ posle", response);
      if (response.status === 200) {
        setIsMessage(true);
        setMessage(localization.OTP_CODE.validSuccess);
        setIsLoading(false);
      }
      if (response.status === 300) {
        setIsMessage(true);
        setError(localization.OTP_CODE.validError);
        setIsLoading(false);
      }
    } catch (err) {
      console.log("sdashjdkjashdjkh");
      setIsMessage(true);
      setError(localization.OTP_CODE.validError);
      setIsLoading(false);
    }
  };

  const checkOtpCodeVerification = async (email, password, otpCode) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await post("/users/loginVerify", {
        email,
        password,
        otpCode,
      });
      console.log("loginVerify+++++", response);
      if (response.status === 69) {
        console.log("sattus 69");
        saveStorage(response.token);
        saveToken(response.userId, localization.LOGIN.successVerified);
      }
      if (response.status === 202) {
        console.log("sattus 202");

        setIsMessage(true);
        setError(localization.OTP_CODE.validError);
        setIsLoading(false);
      }
    } catch (err) {
      console.log("sattus catch error");

      setIsLoading(false);
      setError(localization.OTP_CODE.validError);

      setIsMessage(true);
    }
  };

  const checkverifyEmail = async (email, otpCode) => {
    setIsLoading(true);
    setError(null);
    try {
      console.log("checkOtpCodeValidation pre");
      const response = await getData("/users/verifyEmail", {
        email,
        otpCode,
      });
      if (response.status === 200) {
        setIsMessage(true);
        setMessage(localization.LOGIN.successVerified);
        setIsLoading(false);
      }
    } catch (err) {
      console.log("sdashjdkjashdjkh");
      setIsMessage(true);
      setError(localization.LOGIN.alreadyVerify);
      setIsLoading(false);
    }
  };

  const saveToken = async (userId, messageData) => {
    setIsLoading(true);
    const expoTokenData = await getExpoTokenStorage();

    console.log("expoTokenData+++", expoTokenData, userId);
    if (!expoTokenData) {
      return;
    }
    try {
      const responseData = await post("/api/saveToken", {
        tokenExpo: expoTokenData,
        tokenUser: userId,
      });
      console.log("saveToken responseData+++", responseData);

      if (responseData.status === 200) {
        console.log("error nema");
        setIsMessage(true);
        setIsLoading(false);
        setMessage(messageData);
        setIsVerified(true);
      } else {
        console.log("error ima");

        setIsLoading(false);
        setIsMessage(true);

        setError(localization.LOGIN.errorToken);
      }
    } catch (err) {
      console.log("error ima catch");

      setIsLoading(false);
      setIsMessage(true);

      setError(localization.LOGIN.errorToken);
    }
  };

  const verificationOTPCode = async (paramsData) => {
    const { email, password } = paramsData;
    setIsLoading(true);
    setError(null);
    try {
      const response = await getData("/users/sendOTPviaLogin", {
        params: { email, password },
      });
      if (response.status === 400) {
        setIsMessage(true);
        setError(localization.LOGIN.errorEmail);
        setIsLoading(false);
      }
      if (response.status === 200) {
        setIsLoading(false);
      }
    } catch (err) {
      setIsLoading(false);
      setError(localization.LOGIN.errorEmail);
      setIsMessage(true);
    }
  };

  return {
    message,
    setMessage,
    isLoading,
    error,
    setError,
    checkOtpCodeValidation,
    isMessage,
    setIsMessage,
    verificationOTPCode,
    checkOtpCodeVerification,
    isVerified,
    checkverifyEmail
  };
};

export default useSubmitOtpCode;
