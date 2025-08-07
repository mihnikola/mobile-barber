import { Stack } from "expo-router";

export default function RootLayoutBarbers() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="index"
      />
      <Stack.Screen
        name="services"
        options={{
          title: "",
          headerStyle: {
            backgroundColor: "black", // Replace with your desired color
          },
          headerTintColor: "white", // This sets the color of the title text and back button arrow
        }}
      />
       <Stack.Screen
        name="calendar"
        options={{
          title: "",
          headerStyle: {
            backgroundColor: "black", // Replace with your desired color
          },
          headerTintColor: "white", // This sets the color of the title text and back button arrow
        }}
      />
       <Stack.Screen
        name="reservation"
        options={{
          title: "",
          headerStyle: {
            backgroundColor: "black", // Replace with your desired color
          },
          headerTintColor: "white", // This sets the color of the title text and back button arrow
        }}
      />
         <Stack.Screen
        name="reservationSuccess"
        options={{
          title: "",
          headerShown: false
        }}
      />
    </Stack>
  );
}
