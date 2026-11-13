import { useState, useCallback } from "react";
import { useLocalization } from "@/context/LocalizationContext";
import { saveOtpParamsStorage } from "@/helpers/verificationOtpParams";
import { isValidEmail } from "@/lib/validation";
import { usersApi } from "@/lib/api/services";


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

    if (!isValidEmail(email)) {
      setError(localization.EMAIL.errorValid);
      setIsMessage(true);
      return;
    }

    setIsLoading(true);

      
    try {
      const response = await usersApi.byEmail({ params: { email } });

      if (response.status === 200) {
        if (response.success) {
          const verifyData = {email};
          await saveOtpParamsStorage(verifyData);
          return true; // caller navigates to the OTP screen (Phase 4b)
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
