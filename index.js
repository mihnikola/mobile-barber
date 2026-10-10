
import { ExpoRoot } from "expo-router";
import { AppRegistry } from "react-native";
import messaging from "@react-native-firebase/messaging";

// ------------------------------------------------------
// BACKGROUND FCM HANDLER
// Mora biti na top-level nivou
// ------------------------------------------------------
messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log("📩 BACKGROUND FCM MESSAGE:", remoteMessage);

  // Obrada background poruke
});


function App() {
  const ctx = require.context("./app");

  return <ExpoRoot context={ctx} />;
}

AppRegistry.registerComponent("main", () => App);