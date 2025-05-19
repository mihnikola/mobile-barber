// src/hooks/useAuth.js
import { useState } from 'react';
import {saveStorage} from '../../../../helpers/index'
import { ToastAndroid } from 'react-native';
import { post } from '../../../../api/apiService';
import { useNavigation } from '@react-navigation/native';
// import { pushTokenFunc } from '../../../../helpers/pushToken';

const showToast = (text) => {
  ToastAndroid.show(text, ToastAndroid.SHORT);
};

const useLoginForm = () => {
  const [data, setData] = useState(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  const login = async (email, password) => {
    if (!email || !password) {
      showToast("Please enter both email and password");
      return;
    }

    setPending(true);
    setError(null);
    setData(null);

    try {
      const responseData = await post('/users/login', { email, password });
      setData(responseData);
      saveStorage(responseData.token);
      // pushTokenFunc(responseData.token);
      setPending(false);
      showToast("Login Successful!");
      navigation.navigate("(tabs)", { screen: "index" });
    } catch (err) {
      setError(err.message || err);
      setPending(false);
      showToast(`Login Error: ${err.message || err}`);
    }
  };

  return { data, pending, error, login };
};

export default useLoginForm;