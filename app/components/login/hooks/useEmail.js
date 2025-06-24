// src/hooks/useEmail.js
import { useState, useCallback } from "react";

const useEmail = () => {
  const [email, setEmail] = useState("");

  const handleEmailChange = useCallback((text) => {
    setEmail(text);
  }, []);

  return { email, handleEmailChange};
};

export default useEmail;
