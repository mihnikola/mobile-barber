// src/hooks/useChangePasswordHandler.js
import { useState, useCallback } from "react";
import { put } from "@/api/apiService";

const useChangePasswordHandler = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [isMessage, setIsMessage] = useState(false);

  const handlePatchUser = useCallback(async (email, password, confirmPassword) => {
    setIsLoading(true);
    setError(null);

    if (password.length === 0 || confirmPassword.length === 0) {
      setIsMessage(true);
      setError("Please fill out all fields.");
      setIsLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      setIsMessage(true);
      setError("Your passwords do not match.");
      setIsLoading(false);
      return;
    }

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
      setIsLoading(false);
      setError("Something went wrong")
      setIsMessage(true);
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
