import AppInitialized from "@/components/wrapper/AppInitialized";
import { Stack } from "expo-router";
import messaging from "@react-native-firebase/messaging";

export default function RootLayout() {
  messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    console.log("Message handled in the background!", remoteMessage);
  });

  return (
    <AppInitialized>
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
              backgroundColor: "black",
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
            headerShown: true,
            headerStyle: {
              backgroundColor: "black",
            },
            headerTintColor: "white",
          }}
        />
      </Stack>
    </AppInitialized>
  );
}
