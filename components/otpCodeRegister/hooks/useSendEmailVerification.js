import { useState, useCallback } from "react";
import { getData } from "@/api/apiService";

const useSendEmailVerification = () => {
  const [isLoadingVerification, setIsLoadingVerification] = useState(false);
  const [errorVerification, setErrorVerification] = useState(null);
  const [messageVerification, setMessageVerification] = useState(null);
  const [isMessageVerification, setIsMessageVerification] = useState(false);

  const verificationOTPCode = useCallback(async (paramsData) => {
    const { email, password } = paramsData;
    console.log("verificationOTPCode+++",{ email, password })
    setIsLoadingVerification(true);
    setErrorVerification(null);
    try {
      const response = await getData("/users/sendOTPviaLogin", {
        params: { email, password },
      });
      console.log("verificationOTPCode", response);
      if (response.status === 200) {
        setIsMessageVerification(true);
        setMessageVerification(response.message);
        setIsLoadingVerification(false);
      }
    } catch (err) {
      setIsLoadingVerification(false);
      setErrorVerification(`Not valid otp code`);

      setIsMessageVerification(true);
    }
  });

  return {
    verificationOTPCode,
    isMessageVerification,
    isLoadingVerification,
    setIsMessageVerification,
    errorVerification,
    messageVerification,
    setErrorVerification,
  };
};

export default useSendEmailVerification;
