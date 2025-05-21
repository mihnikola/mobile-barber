// src/hooks/useRegisterForm.js
import { useState } from 'react';
import axios from 'axios';
import { ToastAndroid } from 'react-native';
import { useNavigation } from '@react-navigation/native';

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

      if(result.status === 202){
        showToast(result.data.message);
      }else if (result.status === 201) {
        showToast(result.data.message);
        setTimeout(() => {
          navigation.navigate("components/login/index");
        }, 1000);
      } else {
        showToast(`Registration failed: ${result.status}`);
      }
    } catch (errorx) {
      showToast(`Registration error: ${errorx.message || "An unexpected error occurred."}`);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, handleSubmit };
};

export default useRegisterForm;