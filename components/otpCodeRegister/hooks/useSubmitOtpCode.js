// src/hooks/useEmailOtpCode.js
import { useState, useCallback } from "react";
import { getData, post } from "@/api/apiService";
import { saveStorage } from "@/helpers/token";
import { getExpoTokenStorage } from "@/helpers/expoToken";
import { useLocalization } from "@/context/LocalizationContext";

const useSubmitOtpCode = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [isMessage, setIsMessage] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const { localization } = useLocalization();

  const checkOtpCodeValidation = useCallback(async (email, otpCode) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getData("/users/verifyEmail", {
        params: { email, otpCode },
      });
      if (response.status === 200) {
        setIsMessage(true);
        setMessage(localization.LOGIN.successVerified);
        setIsLoading(false);
      }
      if (response.status === 401) {
        setIsMessage(true);
        setError(localization.LOGIN.expiredVerification);
        setIsLoading(false);
      }
      if (response.status === 403) {
        setIsMessage(true);
        setError(localization.LOGIN.alreadyVerify);
        setIsLoading(false);
      }
    } catch (err) {
      setIsLoading(false);
      setError(localization.OTP_CODE.validError);
      setIsMessage(true);
    }
  });

  const checkOtpCodeVerification = useCallback(
    async (email, password, otpCode) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await post("/users/loginVerify", {
          email,
          password,
          otpCode,
        });

        if (response.status === 69) {
          saveStorage(response.token);
          saveToken(response.userId, localization.LOGIN.successVerified);
        }
        if (response.status === 202) {
          setIsMessage(true);
          setError(localization.OTP_CODE.validError);
          setIsLoading(false);
        }
      } catch (err) {
        setIsLoading(false);
        setError(localization.OTP_CODE.validError);

        setIsMessage(true);
      }
    }
  );

  const saveToken = async (userId, messageData) => {
    setIsLoading(true);
    const expoTokenData = await getExpoTokenStorage();

    if (!expoTokenData) {
      return;
    }
    try {
      const responseData = await post("/api/saveToken", {
        tokenExpo: expoTokenData,
        tokenUser: userId,
      });

      if (responseData.status === 200) {
        setIsMessage(true);
        setIsLoading(false);
        setMessage(messageData);
        setIsVerified(true);
      } else {
        setIsLoading(false);
        setIsMessage(true);

        setError(localization.LOGIN.errorToken);
      }
    } catch (err) {
      setIsLoading(false);
      setIsMessage(true);

      setError(localization.LOGIN.errorToken);
    }
  };

  return {
    message,
    setMessage,
    isLoading,
    error,
    checkOtpCodeValidation,
    checkOtpCodeVerification,
    isMessage,
    setIsMessage,
    isVerified,
    setIsVerified,
  };
};

export default useSubmitOtpCode;
