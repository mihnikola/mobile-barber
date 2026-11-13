// GlobalErrorContext.jsx
import { registerGlobalHandler } from "@/helpers/error-handler";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useLocalization } from "./LocalizationContext";
import { router } from "expo-router";
import { routes } from "@/lib/navigation/routes";

const GlobalErrorContext = createContext(/** @type {any} TODO(phase4): real type */ (undefined));

export const useGlobalError = () => useContext(GlobalErrorContext);

export const GlobalErrorProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const { localization } = useLocalization();

  const hideError = () => {
    router.replace(routes.home.root);
    setError(null);
  };

  // Register the showError function when the provider mounts
  useEffect(() => {
    registerGlobalHandler((data) => {
      switch (data.type) {
        case "ACCOUNT_DELETED":
          setError({ title: localization.DETERMINATION.error });
          break;

        case "UNAUTHORIZED_TOKEN":
          setError({ title: localization.AUTHORIZATION.error });
          break;
      }
    });
  }, []);

  return (
    <GlobalErrorContext.Provider value={{ error, hideError }}>
      {children}
    </GlobalErrorContext.Provider>
  );
};
