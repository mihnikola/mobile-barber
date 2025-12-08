import { Ionicons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { TouchableOpacity } from "react-native";

export default function RootLayoutSettings() {
  return (
    
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="aboutapplication"
        options={{
          title: "",
          headerShown: true,
          headerStyle: { backgroundColor: "black" },
          headerTintColor: "white",
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                console.log("aboutapplication")

                router.back();
              }}
            >
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="helpSupport"
        options={{
          title: "",
          headerShown: true,
          headerStyle: { backgroundColor: "black" },
          headerTintColor: "white",
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                console.log("helpSupport")

                router.back();
              }}
            >
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="languageSupport"
        options={{
          title: "",
          headerShown: true,
          headerStyle: { backgroundColor: "black" },
          headerTintColor: "white",
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                console.log("languageSupport")

                router.back();
              }}
            >
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="privacypolicy"
        options={{
          title: "",
          headerShown: true,
          headerStyle: { backgroundColor: "black" },
          headerTintColor: "white",
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                router.back();
              }}
            >
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="userprofile"
         options={{
          title: "",
          headerShown: true,
          headerStyle: { backgroundColor: "black" },
          headerTintColor: "white",
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                console.log("userprofile")
                router.back();
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
