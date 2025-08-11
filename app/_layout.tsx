// /app/layout/RootLayout.tsx
import { ReservationProvider } from "@/context/ReservationContext";
import {
  DarkTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { BooleanProvider } from "@/context/BooleanContext";
import MainContainer from "../components/mainContainer/MainContainer";
import SplashScreen from "@/shared-components/SuccessScreen";

export default function RootLayout() {
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
            <StatusBar style="auto" />
          </ReservationProvider>
        </BooleanProvider>
      </ThemeProvider>
    );
  }
}
