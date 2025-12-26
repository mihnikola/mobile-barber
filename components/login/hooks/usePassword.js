// src/hooks/useEmail.js
import { useState, useCallback, useRef } from "react";

const usePassword = () => {
  const passwordInputRef = useRef(null);
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handlePasswordChange = useCallback((text) => {
    const trimmedPassword = text.trim();
    setPassword(trimmedPassword);
  }, []);

  const togglePasswordVisibility = useCallback(() => {
    setIsPasswordVisible(!isPasswordVisible);
  }, [isPasswordVisible]);

  return { password, handlePasswordChange, setPassword, togglePasswordVisibility, isPasswordVisible, passwordInputRef };
};

export default usePassword;
