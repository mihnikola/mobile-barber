// src/notifications/notificationListeners.ts
import * as Notifications from "expo-notifications";
import { router } from "expo-router";

export function registerNotificationListeners() {
  // 1️⃣ Foreground message received
  const receiveListener =
    Notifications.addNotificationReceivedListener((notification) => {
      const data = notification.request?.content?.data;
      console.log("📩 FOREGROUND MESSAGE:", data);
      
      // Ovde možeš da radiš state update, Redux,, Zustand itd.
    });

  // 2️⃣ User clicked notification (works in foreground, background, quit)
  const clickListener =
    Notifications.addNotificationResponseReceivedListener((response) => {
      const data = response.notification?.request?.content?.data;
      console.log("👆 NOTIFICATION CLICK:", data);

      // Npr. redirect
      if (data?.url) {
        router.push({
          pathname: "/(zz_notification)",
          params: { itemId: data.url },
        });
      }
    });

  // Cleanup
  return () => {
    receiveListener.remove();
    clickListener.remove();
  };
}
