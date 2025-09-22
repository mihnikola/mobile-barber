// src/hooks/useEmail.js
import { useState } from "react";

const useEmail = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleEmailChange = (text) => {
    setEmail(text);
  };

  return { email, emailError, handleEmailChange, setEmail };
};

export default useEmail;
