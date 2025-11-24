// verifyFCMSetup.js
import * as Notifications from "expo-notifications";
import messaging from "@react-native-firebase/messaging";
import { Platform } from "react-native";
import { router } from "expo-router";
import { saveExpoTokenStorage } from "./expoToken";

export async function verifyFCMSetup() {
  console.log("🔍 [FCM CHECK] Starting verification...");

  try {
    // 1️⃣ Registracija uređaja
    await messaging().registerDeviceForRemoteMessages();
    console.log("✅ [FCM] Device registered for remote messages");

    // 2️⃣ iOS/Android dozvole
    const settings = await Notifications.requestPermissionsAsync();
    if (settings.granted || settings.status === "granted") {
      console.log("✅ [Permissions] Notifications granted");
    } else {
      console.warn("⚠️ [Permissions] Notifications NOT granted");
    }

    // 3️⃣ Notification channel (Android)
    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "Default",
        importance: Notifications.AndroidImportance.MAX,
      });
      console.log("✅ [Android] Notification channel 'default' ready");
    }

    // 4️⃣ Dobij token
    const token = await messaging().getToken();
    if (token) {
      setTimeout(async () => {
        await saveExpoTokenStorage(token);
      }, 1000);
      console.log("✅ [FCM Token]:", token);
    } else {
      console.error("❌ [FCM] Token is NULL (Firebase not issuing token)");
    }

    // 5️⃣ Foreground listener test
    messaging().onMessage(async (remoteMessage) => {
      console.log("📩 [FCM Foreground Message]:", remoteMessage);
      await Notifications.scheduleNotificationAsync({
        content: {
          title: remoteMessage?.notification?.title ?? "Nova poruka",
          body: remoteMessage?.notification?.body ?? "",
          data: remoteMessage?.data,
        },
        trigger: null,
      });
    });

    const redirectReservation = (notification) => {
      const id = notification.data.url;
      router.replace({
        pathname: "/(zz_notification)",
        params: { itemId: id },
      });
    };
    Notifications.addNotificationResponseReceivedListener((response) => {
      const data = response.notification?.request?.content;

      console.log("👆 LOCAL NOTIFICATION CLICKED:", data);
      redirectReservation(data);
    });
    console.log("✅ [FCM] Foreground listener active");

    // 6️⃣ Background listener
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log("🕘 [FCM Background Message]:", remoteMessage);
    });

    console.log("✅ [FCM] Background handler registered");
    console.log("🚀 [FCM CHECK] All setup complete!");
  } catch (error) {
    console.error("❌ [FCM ERROR]:", error);
  }
}
