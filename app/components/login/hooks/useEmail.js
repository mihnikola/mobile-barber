// src/hooks/useEmail.js
import { useState, useCallback } from "react";

const useEmail = () => {
  const [email, setEmail] = useState("");

  const handleEmailChange = useCallback((text) => {
    const trimmedEmail = text.trim().toLowerCase();
    setEmail(trimmedEmail);
  }, []);

  return { email, handleEmailChange, setEmail };
};

export default useEmail;
