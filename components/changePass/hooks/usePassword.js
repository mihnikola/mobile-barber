// src/hooks/usePassword.js
import { useLocalization } from "@/context/LocalizationContext";
import { useState, useCallback } from "react";

const usePassword = () => {
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const strongPasswordRegex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!"#$%&'()*+,\-./:;<=>?@\[\\\]^_`{|}~]).{8,}$/;

  const { localization } = useLocalization();

  const handlePasswordChange = useCallback((text) => {
    const trimmedPass = text.trim();
    setPassword(trimmedPass);
    setTimeout(() => {
      if (!strongPasswordRegex.test(trimmedPass)) {
        setPasswordError(localization.EMAIL.errorRegex);
      } else {
        setPasswordError("");
      }
    }, 500);
  }, []);

  const togglePasswordVisibility = useCallback(() => {
    setIsPasswordVisible(!isPasswordVisible);
  }, [isPasswordVisible]);

  return {
    password,
    passwordError,
    isPasswordVisible,
    handlePasswordChange,
    togglePasswordVisibility,
    setPassword,
    setIsPasswordVisible,
  };
};

export default usePassword;
