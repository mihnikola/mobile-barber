// /app/layout/RootLayout.tsx
import { ReservationProvider } from "@/context/ReservationContext";
import {
  DarkTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useEffect, useState } from "react";
import { BooleanProvider } from "@/context/BooleanContext";
import MainContainer from "../components/mainContainer/MainContainer";
import SplashScreen from "@/shared-components/SuccessScreen";
import * as Notifications from "expo-notifications";
import { router } from "expo-router";

function useNotificationObserver() {
  useEffect(() => {
    let isMounted = true;

    function redirect(notification: Notifications.Notification) {
      const url = notification.request.content.data?.url;
      if (url) {
        router.push(url);
      }
    }

    Notifications.getLastNotificationResponseAsync().then((response) => {
      if (!isMounted || !response?.notification) {
        return;
      }
      redirect(response?.notification);
    });

    const subscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        redirect(response.notification);
      }
    );

    return () => {
      isMounted = false;
      subscription.remove();
    };
  }, []);
}
export default function RootLayout() {
  useNotificationObserver();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  // </ThemeProvider> ako treba light dark

  // Create a custom dark theme with your desired background color
  const MyDarkTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      background: "#000000", // <-- Your desired background color
    },
  };
  if (!isLoading) {
    return (
      <ThemeProvider value={MyDarkTheme}>
        <BooleanProvider>
          <ReservationProvider>
            <MainContainer />
          </ReservationProvider>
        </BooleanProvider>
      </ThemeProvider>
    );
  }
}
