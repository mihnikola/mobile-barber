import { Stack } from "expo-router";

export default function RootLayoutSettings() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="aboutapplication"
        options={{
          title: "",
          headerShown: false
        }}
      />
      <Stack.Screen
        name="helpSupport"
        options={{
          title: "",
          headerShown: false
        }}
      />
      <Stack.Screen
        name="languageSupport"
        options={{
          title: "",
          headerShown: false
        }}
      />
      <Stack.Screen
        name="privacypolicy"
        options={{
          title: "",
          headerShown: false
        }}
      />
      <Stack.Screen
        name="userprofile"
        options={{
          title: "",
          headerShown: false
        }}
      />
    </Stack>
  );
}
