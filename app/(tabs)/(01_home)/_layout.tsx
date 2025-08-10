import { Stack } from "expo-router";

export default function RootLayoutHome() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="(01_home)"
        options={{ title: "", headerShown: false }}
      />
      <Stack.Screen
        name="whoWeAre"
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
  );
}
