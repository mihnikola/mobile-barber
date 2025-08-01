// src/hooks/useEmailOtpCode.js
import { useState, useCallback } from "react";
import { getData } from "../../../../api/apiService";

const useSubmitOtpCode = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [isMessage, setIsMessage] = useState(false);

  const checkOtpCodeValidation = useCallback(async (email,otpCode) => {
    setIsLoading(true);
    setError(null);
    console.log("udje li mamu ti jebemn",email,otpCode)
    try {
      const response = await getData("/users/verifyEmail", { params: { email,otpCode } });
        console.log("reessadasdsa",response);
      if (response.status === 200) {
        setIsMessage(true);
        setMessage(response.message);
        setIsLoading(false);
      }
      
      } catch (err) {
      setIsLoading(false);
      setError(`Not valid otp code`);

      setIsMessage(true);

    
    }
  });

  return {
    message,
    setMessage,
    isLoading,
    error,
    checkOtpCodeValidation,
    isMessage,
    setIsMessage,
  };
};

export default useSubmitOtpCode;
