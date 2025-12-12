import { Ionicons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { TouchableOpacity } from "react-native";

export default function RootLayoutCalendar() {

  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "", headerShown: false }} />
          
    </Stack>
  );
}
