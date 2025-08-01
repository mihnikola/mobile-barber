// src/hooks/useEmail.js
import { useState, useCallback } from "react";

const useEmail = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleEmailChange = useCallback((text) => {
    setEmail(text);

    if (text.includes(" ") || !emailRegex.test(text)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError(""); // No errors
    }


  }, []);

  return { email, emailError, handleEmailChange, setEmail };
};

export default useEmail;
