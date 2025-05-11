// src/hooks/useEmail.js
import { useState, useCallback } from "react";

const usePassword = () => {
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handlePasswordChange = useCallback((text) => {
    const trimmedPassword = text.trim();
    setPassword(trimmedPassword);
  }, []);

  const togglePasswordVisibility = useCallback(() => {
    setIsPasswordVisible(!isPasswordVisible);
  }, [isPasswordVisible]);

  return { password, handlePasswordChange, setPassword, togglePasswordVisibility, isPasswordVisible };
};

export default usePassword;
