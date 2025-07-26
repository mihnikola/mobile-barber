// src/hooks/useEmailOtpCode.js
import { useState, useCallback } from "react";
import { getData } from "../../../../api/apiService";

const useEmailOtpCode = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [isMessage, setIsMessage] = useState(false);

  const checkEmailValidation = useCallback(async (email) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await getData("/users/email", { params: { email } });
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
      setIsMessage(true);

      if (err.status.includes("404")) {
        setError(`Not found endpoint`);
      } else {
        setError(`Something Went Wrong, Please Try Again`);
      }
      setIsLoading(false);
    }
  });

  return {
    message,
    setMessage,
    isLoading,
    error,
    checkEmailValidation,
    isMessage,
    setIsMessage,
  };
};

export default useEmailOtpCode;
