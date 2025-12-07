import { Ionicons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { TouchableOpacity } from "react-native";

export default function RootLayoutCalendar() {

  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "", headerShown: false }} />
      <Stack.Screen
        name="rateReservation"
        options={{
          title: "",
          headerShown: true,
          headerStyle: { backgroundColor: "black" },
          headerTintColor: "white",
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                router.replace("/(tabs)/(03_calendar)");
              }}
            >
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="cancelReservation"
         options={{
          title: "",
          headerShown: true,
          headerStyle: { backgroundColor: "black" },
          headerTintColor: "white",
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                router.replace("/(tabs)/(03_calendar)");
              }}
            >
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
          ),
        }}
      />
      
    </Stack>
  );
}
