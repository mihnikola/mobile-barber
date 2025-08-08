// src/hooks/useEmailOtpCode.js
import { useState, useCallback } from "react";
import { getData } from "@/api/apiService";

const useEmailOtpCode = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [isMessage, setIsMessage] = useState(false);

  const checkEmailValidation = useCallback(async (email) => {
    setIsLoading(true);
    setError(null);


     if(email.length === 0){
      setIsMessage(true);
      setError("Please enter your email");
      setIsLoading(false);
      return;
     }
    try {
      const response = await getData("/users/email", { params: { email } });

      console.log("dasdsa", response)
      if (response.status === 200) {
        setIsMessage(true);
        setMessage(response.message);
        setIsLoading(false);
      }
      if (response.status === 400) {
        setIsMessage(true);

        setMessage(response.message);
        setIsLoading(false);
      }
    } catch (err) {
      setIsLoading(false);
      setError(`Not valid email`);

      setIsMessage(true);

    
    }
  });

  return {
    message,
    setMessage,
    isLoading,
    error,
    setError,
    checkEmailValidation,
    isMessage,
    setIsMessage,
  };
};

export default useEmailOtpCode;
