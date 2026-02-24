// src/hooks/useRegisterForm.js
import { useState } from "react";
import { useLocalization } from "@/context/LocalizationContext";
import { post } from "@/api/apiService";

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
      const result = await post(`/users`, sendUserData);

      console.log("xxxxxxxxxxxxx",result)
      setIsMessage(true);

      if (result.status === 400) {
        setError(localization.LOGIN.error);
      }
      if (result.status === 202) {
        setError(localization.REGISTER.emailError);
      }
      if (result.status === 200) {
        setSuccess(localization.REGISTER.createUser);
      }
    } catch (errorx) {
      setIsMessage(true);
      if (errorx.message.includes("404")) {
        setError(localization.SERVER_RESPONSE.notFound);
      } else {
        setError(localization.REGISTER.postError);
      }
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, handleSubmit, success, setIsMessage, isMessage };
};

export default useRegisterForm;
