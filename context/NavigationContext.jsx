import React, { createContext, useContext, useRef } from "react";
import { useRootNavigationState, useRouter } from "expo-router";

const NavigationContext = createContext(null);

export const NavigationProvider = ({ children }) => {
  const router = useRouter();
  const routerRef = useRef(router);
  const navState = useRootNavigationState();

  // Čuvamo router ref tako da može biti dostupan kasnije
  routerRef.current = router;

  const navigate = (path) => {
    if (routerRef.current) {
      console.log("objectdara", path);
      routerRef.current.replace(path);
      console.log("madara", path);
    } else {
      console.warn("Router is not ready yet!");
    }
  };

  useEffect(() => {
    if (navState?.key && pendingScreen.current && !hasRedirected.current) {
      // ✅ Router je sada spreman
      navigate();
      
      router.replace(pendingScreen.current);
      hasRedirected.current = true; // da se ne izvrši opet
    }
  }, [navState?.key]);

  return (
    <NavigationContext.Provider value={{ navigate, router: routerRef.current }}>
      {children}
    </NavigationContext.Provider>
  );
};

// Hook za lak pristup
export const useNavigationService = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error(
      "useNavigationService must be used within a NavigationProvider"
    );
  }
  return context;
};
