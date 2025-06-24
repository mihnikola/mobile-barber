// src/hooks/useEmail.js
import { useState, useCallback } from "react";

const usePassword = () => {
  const [password, setPassword] = useState("");

  const handlePasswordChange = useCallback((text) => {
    const trimmedPassword = text.trim();
    setPassword(trimmedPassword);
  }, []);

  return {
    password,
    handlePasswordChange,
  };
};

export default usePassword;
