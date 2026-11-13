// Global (app-level) error state: account deleted / token unauthorized.
import { registerGlobalHandler } from "@/helpers/error-handler";

import { createContext, type ReactNode, useContext, useEffect, useState } from "react";
import { useLocalization } from "./LocalizationContext";
import { router } from "expo-router";
import { routes } from "@/lib/navigation/routes";

import type { ApiRecord, GlobalErrorContextValue } from "./types";

const GlobalErrorContext = createContext<GlobalErrorContextValue | undefined>(undefined);

export const useGlobalError = () => useContext(GlobalErrorContext) as GlobalErrorContextValue;

export const GlobalErrorProvider = ({ children }: { children: ReactNode }) => {
  const [error, setError] = useState<ApiRecord | null>(null);
  const { localization } = useLocalization();

  /** App-level: after a fatal auth error go back home (intentionally kept in the provider). */
  const hideError = () => {
    router.replace(routes.home.root);
    setError(null);
  };

  // Register the showError function when the provider mounts
  useEffect(() => {
    registerGlobalHandler((data: { type: string }) => {
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
