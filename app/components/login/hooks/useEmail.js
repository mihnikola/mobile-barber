// src/hooks/useEmail.js
import { useState, useCallback } from "react";

const useEmail = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleEmailChange = useCallback((text) => {
    setEmail(text);
  }, []);

  return { email, emailError, handleEmailChange, setEmail };
};

export default useEmail;
