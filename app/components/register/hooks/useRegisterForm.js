// src/hooks/useRegisterForm.js
import { useState } from 'react';
import { useNavigation } from 'expo-router';
import axios from 'axios';
import { ToastAndroid } from 'react-native';

const showToast = (text) => {
  ToastAndroid.show(text, ToastAndroid.SHORT);
};

const useRegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  const handleSubmit = async (userData) => {
    setLoading(true);
    setError(null);

    try {
      const result = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/users`,
        userData
      );

      if (result.status === 201) {
        showToast("User created successfully!");
        setTimeout(() => {
          navigation.navigate("components/login/index");
        }, 1000);
      } else {
        setError(`Registration failed with status code: ${result.status}`);
        showToast(`Registration failed: ${result.status}`);
      }
    } catch (errorx) {
      setError(errorx.message || "An unexpected error occurred.");
      showToast(`Registration error: ${errorx.message || "An unexpected error occurred."}`);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, handleSubmit };
};

export default useRegisterForm;