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
          headerShown: true,
          headerStyle: {
            backgroundColor: "black",
          },
          headerTintColor: "white",
        }}
      />
      <Stack.Screen
        name="services"
        options={{
          title: "",
          headerShown: locationsData?.length > 1 ? true : false,
          headerStyle: {
            backgroundColor: "black",
          },
          headerTintColor: "white",
        }}
      />
      <Stack.Screen
        name="calendar"
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
        name="reservation"
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
