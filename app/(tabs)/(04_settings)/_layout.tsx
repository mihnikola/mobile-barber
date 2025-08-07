import { Stack } from "expo-router";

export default function RootLayoutSettings() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(04_settings)" options={{title:"",  headerShown: false }} />
    </Stack>
  );
}
