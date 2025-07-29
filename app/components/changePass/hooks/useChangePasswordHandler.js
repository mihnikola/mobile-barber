// src/hooks/useChangePasswordHandler.js
import { useState, useCallback } from "react";
import { put } from "../../../../api/apiService";

const useChangePasswordHandler = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [isMessage, setIsMessage] = useState(false);

  const handlePatchUser = useCallback(async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await put(`/users/${email}/changePassword`, {
        password,
      });
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
    handlePatchUser,
    isLoading,
    message,
    isMessage,
    setIsMessage,
    error,
  };
};

export default useChangePasswordHandler;
