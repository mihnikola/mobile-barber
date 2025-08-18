// src/hooks/useRegisterForm.js
import { useState } from "react";
import axios from "axios";

const useRegisterForm = () => {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isMessage, setIsMessage] = useState(false);

  const handleSubmit = async (userData) => {
    const {
      name,
      email,
      password,
      phoneNumber,
      emailError,
      passwordError,
      confirmPassword,
    } = userData;

    if (!name || !confirmPassword || !password || !email || !phoneNumber) {
      setIsMessage(true);
      setError("Please fill out all fields.");
      return;
    }

    if (confirmPassword !== password) {
      setIsMessage(true);

      setError("Your passwords does not match");
      return;
    }

    const sendUserData = {
      name,
      email,
      password,
      phoneNumber: "+381" + phoneNumber,
    };

    setLoading(true);
    setError(null);

    try {
      const result = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/users`,
        sendUserData
      );
      console.log("handleSubmit+++",result);

      if (result.status === 400) {
        setIsMessage(true);
        setSuccess(result.data.message);
      } else if (result.status === 202) {
        setIsMessage(true);
        setError(result.data.message);
      } else if (result.status === 200) {
        setIsMessage(true);

        setSuccess(result.data.message);
      } else {
        setIsMessage(true);

        setError(`Registration failed: ${result.status}`);
      }
    } catch (errorx) {
      if (errorx.message.includes("404")) {
        setIsMessage(true);

        setError(` Not found endpoint`);
      } else {
        setIsMessage(true);

        setError(`Something Went Wrong, Please Try Again`);
      }
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, handleSubmit, success, setIsMessage, isMessage };
};

export default useRegisterForm;
