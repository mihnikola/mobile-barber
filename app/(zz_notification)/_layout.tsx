import { Stack } from "expo-router";
import { TouchableOpacity, Text } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function RootLayoutNotification() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="index"
        options={{
          title: "",
          headerShown: true,
          headerStyle: { backgroundColor: "black" },
          headerTintColor: "white",
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                router.push("/(tabs)/(03_calendar)");
              }}
              style={{ marginLeft: 10 }}
            >
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
}
