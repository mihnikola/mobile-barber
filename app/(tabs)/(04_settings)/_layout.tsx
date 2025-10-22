import { Stack } from "expo-router";

export default function RootLayoutSettings() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}
