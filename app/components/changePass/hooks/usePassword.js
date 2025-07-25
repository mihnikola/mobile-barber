// src/hooks/usePassword.js
import { useState, useCallback } from 'react';

const usePassword = () => {
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const strongPasswordRegex =  /^(?=.*[A-Z])(?=.*\d)(?=.*[!"#$%&'()*+,\-./:;<=>?@\[\\\]^_`{|}~]).{8,}$/;

  const handlePasswordChange = useCallback((text) => {
    const trimmedPass = text.trim();
    setPassword(trimmedPass);
    setTimeout(() => {
      if (!strongPasswordRegex.test(trimmedPass)) {
        setPasswordError(
          "Password has to start with letter and has to be at least 8 characters long, one uppercase letter, one number, and one special character."
        );
      } else {
        setPasswordError("");
      }
    }, 500);
  }, []);

  const togglePasswordVisibility = useCallback(() => {
    setIsPasswordVisible(!isPasswordVisible);
  }, [isPasswordVisible]);

  return {
    password,
    passwordError,
    isPasswordVisible,
    handlePasswordChange,
    togglePasswordVisibility,
    setPassword,
    setIsPasswordVisible
  };
};

export default usePassword;