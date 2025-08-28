// src/hooks/useEmailOtpCode.js
import { useState, useCallback } from "react";
import { getData } from "@/api/apiService";
import { router } from "expo-router";

const useEmailOtpCode = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isMessage, setIsMessage] = useState(false);

  const checkEmailValidation = useCallback(async (email) => {
    setIsLoading(true);
    setError(null);

    if (email.length === 0) {
      setIsMessage(true);
      setError("Please enter your email");
      setIsLoading(false);
      return;
    }
    try {
      const response = await getData("/users/email", { params: { email } });

      if (response.status === 200 && response.success) {
        setIsLoading(false);

        router.push({
          pathname: "/(tabs)/(04_settings)/otpCode",
          params: { data: email },  
        });
      }
      if (response.status === 200 && !response.success) {
        console.log("checkEmailValidation 400 response+++", response);        
        setIsLoading(false);

        setIsMessage(true);
        setError("Entered email not found");

      }
    } catch (err) {
      setIsLoading(false);
      setError(`Not valid email`);

      setIsMessage(true);
    }
  });

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
