// src/hooks/useEmailOtpCode.js
import { useState, useCallback } from "react";
import { getData } from "@/api/apiService";
import { useLocalization } from "@/context/LocalizationContext";

const useSubmitOtpCode = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [isMessage, setIsMessage] = useState(false);

  const { localization } = useLocalization();

  const checkOtpCodeValidation = useCallback(async (email, otpCode) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getData("/users/otpcode", {
        params: { email, otpCode },
      });
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
      setIsLoading(false);
      setError(localization.SERVER_RESPONSE.error);

      setIsMessage(true);
    }
  });

  return {
    message,
    setMessage,
    isLoading,
    error,
    setError,
    checkOtpCodeValidation,
    isMessage,
    setIsMessage,
  };
};

export default useSubmitOtpCode;
