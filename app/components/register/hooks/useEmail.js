// src/hooks/useEmail.js
import { useState, useCallback } from "react";

const useEmail = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleEmailChange = useCallback((text) => {
    const trimmedEmail = text.trim().toLowerCase();
    const hasInternalSpaces = text.includes(" ") || trimmedEmail.includes(" "); // Simple check for any space

    setEmail(trimmedEmail);

    if (hasInternalSpaces || !emailRegex.test(trimmedEmail)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError(""); // No errors
    }
  }, []);

  return { email, emailError, handleEmailChange, setEmail };
};

export default useEmail;
