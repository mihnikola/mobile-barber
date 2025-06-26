// /app/layout/RootLayout.tsx
import { ReservationProvider } from "@/context/ReservationContext";
import SplashScreen from "@/shared-components/SplashScreen";
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

export default function RootLayout() {
  const [isLoading, setIsLoading] = useState(true);
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  if (!loaded) {
    return null;
  }

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
