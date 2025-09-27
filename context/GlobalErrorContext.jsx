// GlobalErrorContext.jsx
import { registerErrorHandler } from '@/helpers/error-handler';
import React, { createContext, useContext, useState, useEffect } from 'react';

const GlobalErrorContext = createContext();

export const useGlobalError = () => useContext(GlobalErrorContext);

export const GlobalErrorProvider = ({ children }) => {
  const [error, setError] = useState(null);

  const showError = (title, message) => {
    setError({ title, message });
  };

  const hideError = () => {
    setError(null);
  };

  // Register the showError function when the provider mounts
  useEffect(() => {
    registerErrorHandler(showError);
  }, []);

  return (
    <GlobalErrorContext.Provider value={{ error, showError, hideError }}>
      {children}
    </GlobalErrorContext.Provider>
  );
};
