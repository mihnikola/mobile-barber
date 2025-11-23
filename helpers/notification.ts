import messaging from "@react-native-firebase/messaging";
import * as Notifications from "expo-notifications";
import { router } from "expo-router";

// Globalni foreground listener
export const setupForegroundListener = () => {
  // Create Android channel early
  Notifications.setNotificationChannelAsync("default", {
    name: "Default",
    importance: Notifications.AndroidImportance.MAX,
  });

  // Foreground – convert FCM → Expo local notif
  const subFG = messaging().onMessage(async (remoteMessage) => {
    console.log("📩 Foreground FCM:", remoteMessage);

    await Notifications.scheduleNotificationAsync({
      content: {
        title: remoteMessage.notification?.title,
        body: remoteMessage.notification?.body,
        data: remoteMessage.data,
      },
      trigger: null,
    });
  });

  // Click on Expo notification (foreground)

  Notifications.addNotificationResponseReceivedListener((response) => {
    try {
      const data = response.notification.request.content;

      console.log("👆 NOTIFICATION CLICKED:", data);

      router.push({
        pathname: "/(zz_notification)",
        params: { itemId: data },
      });
    } catch (err) {
      console.log("❌ ERROR HANDLING CLICK", err);
    }
  });

  //   Notifications.addNotificationResponseReceivedListener((response) => {
  //     console.log("🔵 CLICK EVENT TRIGGERED", response);
  //   });

  return () => {
    subFG();
    Notifications.removeNotificationSubscription(clickListener);
  };
};
