import { Stack } from "expo-router";
import { TouchableOpacity, Text } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function RootLayoutReservationNotification() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="index"
        options={{
          title: "",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
