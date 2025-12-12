import { useState, useCallback } from "react";
import { getData } from "@/api/apiService";
import { router } from "expo-router";
import { useLocalization } from "@/context/LocalizationContext";
import { saveOtpParamsStorage } from "@/helpers/verificationOtpParams";

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
      console.log("checkEmailValidation+++ email",email);

      
    try {
      const response = await getData("/users/email", { params: { email } });

      console.log("checkEmailValidation+++ response",response);
      if (response.status === 200) {
        if (response.success) {
          const verifyData = {email};
          await saveOtpParamsStorage(verifyData);
          router.push("/(z_auth)/otpCode");
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



  return {
    isLoading,
    error,
    setError,
    checkEmailValidation,
    isMessage,
    setIsMessage,
  };
};

export default useEmailOtpCode;
