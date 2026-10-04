import AppInitialized from "@/components/wrapper/AppInitialized";
import useInternetGuard from "@/services/useInternetGuard";
import NoInternetModal from "@/shared-components/InternetModal";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { ColorsBarber } from "@/constants/Colors";

export default function RootLayout() {
  const isConnected = useInternetGuard();
  const [loaded, error] = useFonts({
    "OldStandard-Regular": require("@/assets/fonts/OldStandardTT-Regular.ttf"),
    "OldStandard-Bold": require("@/assets/fonts/OldStandardTT-Bold.ttf"),
    "OldStandard-Italic": require("@/assets/fonts/OldStandardTT-Italic.ttf"),
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
              backgroundColor: ColorsBarber.dark.background,
            },
            headerTintColor: "white",
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
