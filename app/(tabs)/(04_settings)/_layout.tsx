import { Stack } from "expo-router";

export default function RootLayoutSettings() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="infoHelpCenter"
        options={{
          headerShown: true, // This overrides the parent
          title: "",
          headerStyle: {
            backgroundColor: "black", // Replace with your desired color
          },
          headerTintColor: "white", // This sets the color of the title text and back button arrow
        }}
      />

      <Stack.Screen
        name="infoUserProfile"
        options={{
          title: "",
          headerStyle: {
            backgroundColor: "black", // Replace with your desired color
          },
          headerTintColor: "white", // This sets the color of the title text and back button arrow }}
        }}
      />

      <Stack.Screen
        name="infoApp"
        options={{
          headerShown: true, // This overrides the parent
          title: "",
          headerStyle: {
            backgroundColor: "black", // Replace with your desired color
          },
          headerTintColor: "white", // This sets the color of the title text and back button arrow
        }}
      />
      <Stack.Screen
        name="infoPrivacy"
        options={{
          headerShown: true, // This overrides the parent

          title: "",
          headerStyle: {
            backgroundColor: "black", // Replace with your desired color
          },
          headerTintColor: "white", // This sets the color of the title text and back button arrow }}
        }}
      />
      {/* start auth */}
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="register" options={{ headerShown: false }} />
      <Stack.Screen
        name="forgotPass"
        options={{
          headerShown: true, // This overrides the parent

          title: "",
          headerStyle: {
            backgroundColor: "black", // Replace with your desired color
          },
          headerTintColor: "white", // This sets the color of the title text and back button arrow }}
        }}
      />
      <Stack.Screen
        name="otpCode"
        options={{
          headerShown: true, // This overrides the parent

          title: "",
          headerStyle: {
            backgroundColor: "black", // Replace with your desired color
          },
          headerTintColor: "white", // This sets the color of the title text and back button arrow }}
        }}
      />
      <Stack.Screen
        name="otpCodeRegister"
        options={{
          headerShown: true, // This overrides the parent

          title: "",
          headerStyle: {
            backgroundColor: "black", // Replace with your desired color
          },
          headerTintColor: "white", // This sets the color of the title text and back button arrow }}
        }}
      />
      <Stack.Screen
        name="changePassword"
        options={{
          headerShown: true, // This overrides the parent

          title: "",
          headerStyle: {
            backgroundColor: "black", // Replace with your desired color
          },
          headerTintColor: "white", // This sets the color of the title text and back button arrow }}
        }}
      />
      {/* end auth */}
    </Stack>
  );
}
