// src/hooks/useEmail.js
import { useState, useCallback } from "react";

const useEmail = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleEmailChange = useCallback((text) => {
    const trimmedEmail = text.trim().toLowerCase();
          setEmail(trimmedEmail);

    if (trimmedEmail) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError(""); // No errors
    }
  }, []);

  return { email, emailError, handleEmailChange, setEmail };
};

export default useEmail;
