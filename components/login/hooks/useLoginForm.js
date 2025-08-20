// src/hooks/useAuth.js
import { useState } from "react";
import { saveStorage } from "@/helpers/token";
import { getData, post } from "@/api/apiService";
import { getExpoTokenStorage } from "@/helpers/expoToken";
import { router } from "expo-router";

const useLoginForm = () => {
  const [pending, setPending] = useState(false);
  const [status, setStatus] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isMessage, setIsMessage] = useState(false);
  const [initialToken, setInitialToken] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [message, setMessage] = useState(null);

  const verificationOTPCode = async (email, password) => {
    setIsLoading(true);
    console.log("verificationOTPCode");

    try {
      const response = await getData("/users/sendOTPviaLogin", {
        params: { email, password },
      });
      if (response.status === 200) {
        setIsLoading(false);
        setIsMessage(false);

        router.push({
          pathname: "/(tabs)/(04_settings)/otpCodeRegister",
          params: { email, password },
        });
      }
      if (response.status === 500) {
        setIsLoading(false);
        setError(response.message);
      }
      if (response.status === 404) {
        setIsLoading(false);
        setError(response.message);
      }
    } catch (err) {
      setIsLoading(false);
      setError("Something goes wrong! Please try again!");
    }
  };

  const login = async (email, password) => {
    if (!email || !password) {
      setIsMessage(true);
      setError("Please enter both email and password");
      return;
    }

    setPending(true);
    setError(null);

    try {
      const responseData = await post("/users/login", { email, password });
      console.log("login",responseData)
      if (responseData.status === 202) {
        setPending(false);
        setIsMessage(true);
        setError(responseData.message);
      }
      if (responseData.status === 606) {
        setPending(false);
        setIsMessage(true);
        setStatus(responseData.status);
        setMessage(responseData.message);
      }
      if (responseData.status === 200) {
        setPending(false);
        saveStorage(responseData.token);
        saveToken(responseData.userId);
      }
    } catch (err) {
      if (err.message.includes("404")) {
        setIsMessage(true);

        setError(` Not found endpoint`);
      } else {
        setIsMessage(true);

        setError(`Something Went Wrong, Please Try Again`);
      }
      setPending(false);
    }
  };

  const saveToken = async (userId) => {
    setPending(true); // Set pending state when saving token

    const expoToken = await getExpoTokenStorage();
    console.log("useLoginForm", expoToken, userId);

    if (!expoToken) {
      setPending(false);
      return;
    }
    try {
      const responseData = await post("/api/saveToken", {
        tokenExpo: expoToken,
        tokenUser: userId,
      });
      console.log("saveToken responseData", responseData);
      if (responseData.status === 200) {
        console.log("Token saved successfully");
        setPending(false);
        setIsMessage(true);

        setSuccess("Login Successful!");

        // removeExpoTokenStorage();
      } else {
        setPending(false);
        setIsMessage(true);

        setError(
          `Failed to save token: ${responseData?.message || "Unknown error"}`
        );
      }
    } catch (err) {
      console.log("Error saving token:", err.message);
      setPending(false);
      setIsMessage(true);

      setError(`Error saving token: ${err.message || err}`);
    }
  };

  return {
    pending,
    error,
    login,
    saveToken,
    success,
    status,
    setStatus,
    setIsMessage,
    isMessage,
    initialToken,
    setInitialToken,
    verificationOTPCode,
    isLoading,
    message,
  };
};

export default useLoginForm;
