import { Stack } from "expo-router";

export default function RootLayoutAuth() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ title: "", headerShown: false }} />
      <Stack.Screen
        name="changePassword"
        options={{
          title: "",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="forgotPass"
        options={{
          title: "",
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="otpCode"
        options={{
          title: "",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
