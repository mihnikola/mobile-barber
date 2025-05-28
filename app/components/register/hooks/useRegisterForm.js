// src/hooks/useRegisterForm.js
import { useState } from "react";
import axios from "axios";
import { ToastAndroid } from "react-native";

const showToast = (text) => {
  ToastAndroid.show(text, ToastAndroid.SHORT);
};

const useRegisterForm = ({change}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const changeToLogin = () => {
    change(true);
  }
  const handleSubmit = async (userData) => {
    setLoading(true);
    setError(null);

    try {
      const result = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/users`,
        userData
      );
      if (result.status === 400) {
        showToast(result.data.message);
      } else if (result.status === 202) {
        showToast(result.data.message);
      } else if (result.status === 201) {
        showToast(result.data.message);
        // navigation.navigate("components/login/index");
        changeToLogin();
      } else {
        showToast(`Registration failed: ${result.status}`);
      }
    } catch (errorx) {
      if (err.message.includes("404")) {
        showToast(` Not found endpoint`);
      } else {
        showToast(`Something Went Wrong, Please Try Again`);
      }
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, handleSubmit };
};

export default useRegisterForm;
