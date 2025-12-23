import AppInitialized from "@/components/wrapper/AppInitialized";
import useInternetGuard from "@/services/useInternetGuard";
import NoInternetModal from "@/shared-components/InternetModal";
import { Stack } from "expo-router";

export default function RootLayout() {
  const isConnected = useInternetGuard();

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
            headerShown: false,
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
          name="(zz_notification)"
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
