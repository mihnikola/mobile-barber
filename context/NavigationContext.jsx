import React, { createContext, useContext, useState } from "react";

export const NavigationContext = createContext(null);

export const NavigationProvider = ({ children }) => {
  const [lastPath, setLastPath] = useState(null);
  const [btnValue, setBtnValue] = useState(false);

  const saveLastTab = (path, btn) => {
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
