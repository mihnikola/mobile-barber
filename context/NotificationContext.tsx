import React, { createContext, useContext, useState } from "react";

interface NotificationContextType {
  lastNotification: any;
  setLastNotification: (notification: any) => void;
}

const NotificationContext = createContext<NotificationContextType>({
  lastNotification: null,
  setLastNotification: () => {},
});

export const NotificationProviderContext = ({ children }: { children: React.ReactNode }) => {
  const [lastNotification, setLastNotification] = useState<any>(null);

  return (
    <NotificationContext.Provider value={{ lastNotification, setLastNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);
