import AppInitialized from "@/components/wrapper/AppInitialized";
import useInternetGuard from "@/services/useInternetGuard";
import NoInternetModal from "@/components/app/InternetModal";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { fonts, ThemeProvider, useTheme } from "@/theme";

/** Theme first: everything below (incl. the root stack) reads colors from it. */
export default function RootLayout() {
  return (
    <ThemeProvider>
      <RootStack />
    </ThemeProvider>
  );
}

function RootStack() {
  const { colors } = useTheme();
  const isConnected = useInternetGuard();
  const [loaded, error] = useFonts({
    [fonts.regular]: require("@/assets/fonts/BarlowCondensed-Regular.ttf"),
    [fonts.bold]: require("@/assets/fonts/BarlowCondensed-Bold.ttf"),
    [fonts.italic]: require("@/assets/fonts/BarlowCondensed-Italic.ttf"),
  });

  if (!loaded && !error) {
    return null;
  }
  return (
    <AppInitialized>
      <NoInternetModal visible={!isConnected} />

      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="index"
          options={{ title: "", headerShown: false, animation: "fade" }}
        />

        <Stack.Screen
          name="introScreen"
          options={{
            title: "",
            headerShown: true,
            headerStyle: {
              backgroundColor: colors.background,
            },
            headerTintColor: colors.text,
          }}
        />

        <Stack.Screen
          name="(tabs)"
          options={{
            title: "",
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="(z_auth)"
          options={{
            title: "",
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="(reservation_notification)"
          options={{
            title: "",
            headerShown: false,
          }}
        />
      </Stack>
    </AppInitialized>
  );
}
