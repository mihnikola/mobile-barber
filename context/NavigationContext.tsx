import { createContext, type ReactNode, useContext, useState } from "react";

import type { NavigationContextValue } from "./types";

export const NavigationContext = createContext<NavigationContextValue | null>(null);

export const NavigationProvider = ({ children }: { children: ReactNode }) => {
  const [lastPath, setLastPath] = useState<string | null>(null);
  const [btnValue, setBtnValue] = useState(false);

  const saveLastTab = (path: string | null, btn?: boolean) => {
    if (btn) setBtnValue(true);
    setLastPath(path);
  };

  return (
    <NavigationContext.Provider value={{ lastPath, saveLastTab, btnValue }}>
      {children}
    </NavigationContext.Provider>
  );
};

/* ───────────────────────────── */
/* Custom Hooks                  */
/* ───────────────────────────── */

export const useNavigation = () => {
  const context = useContext(NavigationContext);

  if (!context) {
    throw new Error("useNavigation must be used inside NavigationProvider");
  }

  return context;
};

export const useLastPathNavigation = () => {
  const context = useContext(NavigationContext);

  if (!context) {
    throw new Error(
      "useLastPathNavigation must be used inside NavigationProvider"
    );
  }

  return {
    lastPath: context.lastPath,
    btnValue: context.btnValue,
    saveLastTab: context.saveLastTab,
  };
};
