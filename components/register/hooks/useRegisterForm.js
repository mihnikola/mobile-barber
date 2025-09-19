// src/hooks/useRegisterForm.js
import { useState } from "react";
import axios from "axios";
import { useLocalization } from "@/context/LocalizationContext";

const useRegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isMessage, setIsMessage] = useState(false);
  const { localization } = useLocalization();

  const handleSubmit = async (userData) => {
    const {
      name,
      email,
      password,
      phoneNumber,
      emailError,
      passwordError,
      confirmPassword,
    } = userData;

    if (!name || !confirmPassword || !password || !email) {
      setIsMessage(true);
      setError(localization.REGISTER.error);
      return;
    }

    if (confirmPassword !== password) {
      setIsMessage(true);
      setError(localization.LOGIN.notMatch);
      return;
    }

    const sendUserData = {
      name,
      email,
      password,
      phoneNumber: phoneNumber ? "+381" + phoneNumber : "",
    };

    setLoading(true);
    setError(null);

    try {
      const result = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/users`,
        sendUserData
      );

      if (result.status === 400) {
        setIsMessage(true);
        setError(localization.LOGIN.error);
      } else if (result.status === 202) {
        setIsMessage(true);
        setError(localization.REGISTER.emailError);
      } else if (result.status === 200) {
        setIsMessage(true);
        setSuccess(localization.REGISTER.createUser);
      } else {
        setIsMessage(true);
        setError(localization.REGISTER.postError);
      }
    } catch (errorx) {
      if (errorx.message.includes("404")) {
        setIsMessage(true);
        setError(localization.SERVER_RESPONSE.notFound);
      } else {
        setIsMessage(true);
        setError(localization.SERVER_RESPONSE.error);
      }
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, handleSubmit, success, setIsMessage, isMessage };
};

export default useRegisterForm;
