import { ExpoRoot } from "expo-router";
import { AppRegistry } from "react-native";
import messaging from "@react-native-firebase/messaging";

// ------------------------------------------------------
//  REQUIRED: Background notifications handler
//  (mora biti definisan van React komponente)
// ------------------------------------------------------
messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log("📩 BACKGROUND FCM MESSAGE:", remoteMessage);
  // 👉 ovde NE SMEŠ da navigiraš!
  // 👉 samo možeš da obradiš podatke, sačuvaš u storage itd.
});

function App() {
  const ctx = require.context("./app");
  return <ExpoRoot context={ctx} />;
}

AppRegistry.registerComponent("main", () => App);
