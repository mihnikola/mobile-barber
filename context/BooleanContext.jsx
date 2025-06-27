// BooleanContext.js

import { getInitialToken, storeInitialToken } from '@/helpers/initialToken';
// import { removeExpoTokenStorage, saveExpoTokenStorage, getExpoTokenStorage } from '@/helpers/expoToken';
import { getStorage, saveStorage, removeStorage } from '@/helpers/token';
import AsyncStorage from '@react-native-async-storage/async-storage';


import React, { createContext, useState } from 'react';

// Create the context with a default value of false
export const BooleanContext = createContext();

// Provider component
export const BooleanProvider = ({ children }) => {
  // Initialize the state with the default value of false
  const [initialToken, setInitialToken] = useState(null);
  const [isToken, setIsToken] = useState(null);
  const [doctorId, setDoctorId] = useState(null);

  const changeDoctorId = (data) => {
    setDoctorId(data);
  }

  //initial token data

  const addInitialTokenData = async () => {
    const valueToStore = { name: 'John Doe', age: 30 };
    await AsyncStorage.setItem('initialToken', JSON.stringify(valueToStore));
    setInitialToken(valueToStore);
  }
  const getInitialTokenData = async () => {
    return await AsyncStorage.getItem("initialToken");
  }

  //token data
  const addTokenData = (value) => {
    saveStorage(value).then((res) => {
      if (res) {
        setIsToken(res);
      }
    })
  }

  const getTokenData = () => {
    getStorage().then((res) => {
      if (res) {
        setIsToken(res);
      }
    })
  }

  const removeTokenData = () => {
    removeStorage().then((res) => {
      if (res) {
        setIsToken(null);
      }
    })
  }


  return (
    <BooleanContext.Provider value={{
      getInitialTokenData,
      addInitialTokenData,
      initialToken,

      addTokenData,
      getTokenData,
      removeTokenData,
      isToken,

      changeDoctorId,
      doctorId,
    }}>
      {children}
    </BooleanContext.Provider>
  );
};

