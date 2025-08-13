// src/hooks/useEmailOtpCode.js
import { useState, useCallback } from "react";
import { getData, post } from "@/api/apiService";
import { saveStorage } from "@/helpers/token";
import {
  getExpoTokenStorage,
  removeExpoTokenStorage,
} from "@/helpers/expoToken";

const useSubmitOtpCode = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [isMessage, setIsMessage] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const checkOtpCodeValidation = useCallback(async (email, otpCode) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getData("/users/verifyEmail", {
        params: { email, otpCode },
      });
      console.log("reessadasdsa", response);
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

  const checkOtpCodeVerification = useCallback(
    async (email, password, otpCode) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await post("/users/loginVerify", {
          email,
          password,
          otpCode,
        });

        console.log("checkOtpCodeVerification", response);
        /*
 status: 69, ok
    token, ok
    userId: user._id,
    message: "Your account has been verified! Welcome to hell!",
    */
        if (response.status === 69) {
          saveStorage(response.token);
          saveToken(response.userId, response.message);
        }
        if (response.status === 202) {
          setIsMessage(true);
          setError(response.message);
          setIsLoading(false);
        }
      } catch (err) {
        setIsLoading(false);
        setError(`Not valid otp code`);

        setIsMessage(true);
      }
    }
  );

  const saveToken = async (userId, messageData) => {
    setIsLoading(true); // Set pending state when saving token
    const expoTokenData = await getExpoTokenStorage(); // Assuming this function exists

    console.log("useSubmitOtpCode",expoTokenData)
    
      if(!expoTokenData){
          return;
        }
    try {
      const responseData = await post("/api/saveToken", {
        tokenExpo: expoTokenData,
        tokenUser: userId,
      });
      console.log("saveToken responseData",responseData)

      if (responseData.status === 200) {
        // removeExpoTokenStorage();
        setIsMessage(true);
        setIsLoading(false);
        setMessage(messageData);
        setIsVerified(true);
      } else {
        setIsLoading(false);
        setIsMessage(true);

        setError(
          `Failed to save token: ${responseData?.message || "Unknown error"}`
        );
      }
    } catch (err) {
      console.log("Error saving token:", err.message);
      setIsLoading(false);
      setIsMessage(true);

      setError(`Error saving token: ${err.message || err}`);
    }
  };

  return {
    message,
    setMessage,
    isLoading,
    error,
    checkOtpCodeValidation,
    checkOtpCodeVerification,
    isMessage,
    setIsMessage,
    isVerified,
    setIsVerified,
  };
};

export default useSubmitOtpCode;
