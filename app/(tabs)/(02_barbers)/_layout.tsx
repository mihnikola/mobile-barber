import useFetchLocations from "@/components/places/useFetchLocations";
import { Stack } from "expo-router";

export default function RootLayoutBarbers() {
  const { locationsData } = useFetchLocations();
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ title: "", headerShown: false }} />
      <Stack.Screen
        name="employers"
        options={{
          title: "",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="services"
        options={{
          title: "",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="calendar"
        options={{
          title: "",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="reservation"
        options={{
          title: "",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="reservationSuccess"
        options={{
          title: "",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="locations"
        options={{
          title: "",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
