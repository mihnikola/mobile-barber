import { Stack } from "expo-router";

export default function RootLayoutCalendar() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(03_calendar)" options={{ title:"", headerShown: false }} />
      <Stack.Screen
        name="modalReservation"
        options={{
          title: "",
          headerShown: true,
          headerStyle: {
            backgroundColor: "black", // Replace with your desired color
          },
          headerTintColor: "white", // This sets the color of the title text and back button arrow
        }}
      />
    </Stack>
  );
}
