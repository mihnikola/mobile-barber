// /app/layout/RootLayout.tsx
import { ReservationProvider } from "@/context/ReservationContext";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { BooleanProvider } from "@/context/BooleanContext";
import MainContainer from "./components/mainContainer/MainContainer";
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


  if (!isLoading) {
    return (
      <BooleanProvider>
        <ReservationProvider>
            <MainContainer />
            <StatusBar style="auto" />
        </ReservationProvider>
      </BooleanProvider>
    );
  }
}
