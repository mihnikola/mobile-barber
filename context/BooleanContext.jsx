// BooleanContext.js

import { getData, getInitialToken, removeData, storeData, storeInitialToken } from '@/helpers';
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

  const addInitialToken = () => {
    storeInitialToken().then((result) => {
      if (result) {
        setInitialToken();
      }
    });
  }
  const getInitialTokenData = () => {
    getInitialToken().then((result) => {
      if (result) {
        setInitialToken(result);
      }
    });
  }

  const addTokenData = (value) => {
    storeData(value).then((res) => {
      if (res) {
        setIsToken(res);
      }
    })
  }

  const getTokenData = () => {
    getData().then((res) => {
      if (res) {
        setIsToken(res);
      }
    })
  }

  const removeTokenData = () => {
    removeData().then((res) => {
      if (res) {
        setIsToken(null);
      }
    })
  }


  return (
      <BooleanContext.Provider value={{
        initialToken,
        addInitialToken,
        getInitialTokenData,
        addTokenData,
        getTokenData,
        isToken,
        changeDoctorId,
        doctorId,
        removeTokenData
      }}>
        {children}
      </BooleanContext.Provider>
  );
};

