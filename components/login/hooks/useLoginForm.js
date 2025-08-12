// src/hooks/useAuth.js
import { useEffect, useState } from "react";
import { saveStorage } from "@/helpers/token";
import { getData, post } from "@/api/apiService";
import {
  removeExpoTokenStorage,
  getExpoTokenStorage,
} from "@/helpers/expoToken";
import { usePushNotifications } from "@/components/home/hooks/usePushNotifications";

const useLoginForm = () => {
  const [data, setData] = useState(null);
  const [pending, setPending] = useState(false);
  const [status, setStatus] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isMessage, setIsMessage] = useState(false);
  const [initialToken, setInitialToken] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  const [message, setMessage] = useState(null);
    // const [errorVerification, setErrorVerification] = useState(null);
  // const [isMessageVerification, setIsMessageVerification] = useState(false);

  const { registerForPushNotifications } = usePushNotifications();

  const verificationOTPCode = async (email, password) => {
    setIsLoading(true);
    // setErrorVerification(null);
    try {
      const response = await getData("/users/sendOTPviaLogin", {
        params: { email, password },
      });
      console.log("verificationOTPCode++-+-",response);
      
      if (response.status === 200) {
        // setIsMessageVerification(true);
        setMessage(response.message);
        setIsLoading(false);
      }
    } catch (err) {
      setIsLoading(false);
      // setErrorVerification(`Not valid otp code`);

      // setIsMessageVerification(true);
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
    setData(null);

    try {
      const responseData = await post("/users/login", { email, password });
      if (responseData.status === 202) {
        setPending(false);
        setIsMessage(true);
        setSuccess(responseData.message);
        return;
      }
      if (responseData.status === 606) {
        setPending(false);
        setIsMessage(true);
        setStatus(responseData.status);
        setMessage(responseData.message);
        return;
      }
      if (responseData.status === 200) {
        setPending(false);
        saveStorage(responseData.token);
        setData("Login Successful!");
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

  useEffect(() => {
    if (data) {
      saveToken(data.userId);
    }
  }, [data]);

  const saveToken = async (userId) => {
    setPending(true); // Set pending state when saving token

    const expoToken = await getExpoTokenStorage();
    try {
      const responseData = await post("/api/saveToken", {
        tokenExpo: expoToken,
        tokenUser: userId,
      });

      if (responseData.status === 200) {
        console.log("Token saved successfully");
        setPending(false);
        setIsMessage(true);

        setSuccess("Login Successful!");

        removeExpoTokenStorage();
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
