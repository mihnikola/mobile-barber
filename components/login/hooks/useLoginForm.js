import { useState } from "react";
import { saveStorage } from "@/helpers/token";
import { getData, post } from "@/api/apiService";
import { getExpoTokenStorage } from "@/helpers/expoToken";
import { router } from "expo-router";

const useLoginForm = () => {
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isMessage, setIsMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const verificationOTPCode = async (email, password) => {
    setIsLoading(true);

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
    console.log("responseData+++");

    setStatus(null);

    setIsLoading(true);
    setError(null);

    try {
      const responseData = await post("/users/login", { email, password });
console.log("responseData+++",responseData);

      if (responseData.status === 202) {
        setIsLoading(false);
        setIsMessage(true);
        setError(responseData.message);
      }
      if (responseData.status === 606) {
        setIsLoading(false);
        setIsMessage(true);
        setStatus(responseData.status);
        setMessage(responseData.message);
      }
      if (responseData.status === 200) {
        setIsLoading(false);
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
      setIsLoading(false);
    }
  };

  const loginViaGoogle = async (userData) => {
    setStatus(null);

    setIsLoading(true);
    setError(null);

    const { user } = userData;

    try {
      const responseData = await post("/users/loginViaGoogle", { user });
      if (responseData.status === 200 || responseData.status === 300) {
        setIsLoading(false);
        saveStorage(responseData.token);
        saveToken(responseData.userId);
      }

      if (responseData.status === 500) {
        setIsLoading(false);
        setError(responseData.message);
      }
    } catch (err) {
      if (err.message.includes("404")) {
        setIsMessage(true);

        setError(` Not found endpoint`);
      } else {
        setIsMessage(true);

        setError(`Something Went Wrong, Please Try Again`);
      }
      setIsLoading(false);
    }
  };

  const saveToken = async (userId) => {
    setIsLoading(true);

    const expoToken = await getExpoTokenStorage();

    if (!expoToken) {
      setIsLoading(false);
      return;
    }
    try {
      const responseData = await post("/api/saveToken", {
        tokenExpo: expoToken,
        tokenUser: userId,
      });
      if (responseData.status === 200) {
        setIsLoading(false);
        setIsMessage(true);

        setSuccess("Login Successful!");

        // removeExpoTokenStorage();
      } else {
        setIsLoading(false);
        setIsMessage(true);

        setError(
          `Failed to save token: ${responseData?.message || "Unknown error"}`
        );
      }
    } catch (err) {
      setIsLoading(false);
      setIsMessage(true);

      setError(`Error saving token: ${err.message || err}`);
    }
  };

  return {
    error,
    login,
    saveToken,
    success,
    status,
    setIsMessage,
    isMessage,
    verificationOTPCode,
    isLoading,
    message,
    loginViaGoogle,
  };
};

export default useLoginForm;
