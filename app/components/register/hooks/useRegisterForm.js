// src/hooks/useRegisterForm.js
import { useState } from "react";
import axios from "axios";
import { ToastAndroid } from "react-native";
import { useNavigation } from "@react-navigation/native";

const useRegisterForm = () => {
  const showToast = (text) => {
    ToastAndroid.show(text, ToastAndroid.SHORT);
  };
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
      showToast("Please fill out all fields.");
      return;
    }

    if (confirmPassword !== password) {
      showToast("Your passwords does not match");
      return;
    }

    if (emailError) {
      showToast(emailError);
      return;
    }
    if (passwordError) {
      showToast(passwordError);
      return;
    }

    const sendUserData = {
      name,
      email,
      password,
      phoneNumber: "+381"+phoneNumber,
    };

    setLoading(true);
    setError(null);

    try {
      const result = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/users`,
        sendUserData
      );
      if (result.status === 400) {
        showToast(result.data.message);
      } else if (result.status === 202) {
        showToast(result.data.message);
      } else if (result.status === 201) {
        showToast(result.data.message);
        navigation.navigate("components/login/index");
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
