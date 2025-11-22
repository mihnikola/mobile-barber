import { Stack } from "expo-router";

export default function RootLayoutAuth() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ title:"", headerShown: false }} />
      <Stack.Screen
        name="changePassword"
        options={{
          title: "",
          headerShown: true,
          headerStyle: {
            backgroundColor: "black", // Replace with your desired color
          },
          headerTintColor: "white", // This sets the color of the title text and back button arrow
        }}
      />
      <Stack.Screen
        name="forgotPass"
        options={{
          title: "",
          headerShown: true,
          headerStyle: {
            backgroundColor: "black", // Replace with your desired color
          },
          headerTintColor: "white", // This sets the color of the title text and back button arrow
        }}
      />
      <Stack.Screen
        name="infoApp"
        options={{
          title: "",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="infoHelpCenter"
        options={{
          title: "",
          headerShown: false,
        }}
      />
       <Stack.Screen
        name="infoPrivacy"
        options={{
          title: "",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="infoUserProfile"
        options={{
          title: "",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="languageChange"
        options={{
          title: "",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="otpCode"
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
