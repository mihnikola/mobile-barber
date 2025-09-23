import { useState, useCallback } from "react";
import { getData } from "@/api/apiService";
import { router } from "expo-router";
import { useLocalization } from "@/context/LocalizationContext";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const useEmailOtpCode = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isMessage, setIsMessage] = useState(false);

  const { localization } = useLocalization();

  const checkEmailValidation = async (email) => {
    
    setError(null);
    setIsMessage(false);

    if (!email || email.trim().length === 0) {
      setError(localization.EMAIL.errorEmpty);
      setIsMessage(true);
      return;
    }

    if (!EMAIL_REGEX.test(email)) {
      setError(localization.EMAIL.errorValid);
      setIsMessage(true);
      return;
    }

    setIsLoading(true);

    try {
      const response = await getData("/users/email", { params: { email } });

      if (response.status === 200) {
        if (response.success) {
          router.push({
            pathname: "/(tabs)/(04_settings)/otpCode",
            params: { data: email },
          });
        } else {
          setError(localization.EMAIL.errorFound);
          setIsMessage(true);
        }
      } else {
        setError(localization.SERVER_RESPONSE.error);
        setIsMessage(true);
      }
    } catch (err) {
      setError(localization.SERVER_RESPONSE.error);
      setIsMessage(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = () => {
    checkEmailValidation(email);
  };

  return {
    isLoading,
    error,
    setError,
    checkEmailValidation,
    isMessage,
    setIsMessage,
    handleResendCode,
  };
};

export default useEmailOtpCode;
