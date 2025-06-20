// /app/layout/RootLayout.tsx
import { ReservationProvider } from "@/context/ReservationContext";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { useColorScheme } from "react-native";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ReservationProvider>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
             <Stack.Screen
              name="components/services/index"
              options={{ title: "", headerShown: false  }}
            />
          <Stack.Screen
              name="components/login/index"
              options={{ title: "", headerShown: false }}
            />
            <Stack.Screen
              name="components/register/index"
              options={{ title: "", headerShown: false }}
            />
             <Stack.Screen
              name="components/reservation/index"
              options={{ title: "" }}
            />
            <Stack.Screen
              name="components/reservation/datereservation"
              options={{ title: "", headerShown: false }}
            />
            <Stack.Screen
              name="components/reservation/makereservation"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="components/reservation/reservationdetails"
              options={{ title: "", headerShown: false }}
            />
             <Stack.Screen
              name="components/infoapp/userprofile"
              options={{ title: "", headerShown: false }}
            />
            <Stack.Screen
              name="components/infoapp/aboutapplication"
              options={{ title: "", headerShown: false }}
            />
             <Stack.Screen
              name="components/infoapp/privacypolicy"
              options={{ title: "", headerShown: false }}
            />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </ReservationProvider>
  );
}
