import React, { useEffect } from "react";
import { Platform } from "react-native";
import messaging from "@react-native-firebase/messaging";
import * as Notifications from "expo-notifications";
import { saveExpoTokenStorage } from "@/helpers/expoToken";
import { setupForegroundListener } from "@/helpers/notification";

export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    const setup = async () => {
      // Permission
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        const token = await messaging().getToken();
        console.log("🔑 FCM Token:", token);
        await saveExpoTokenStorage(token);
      } else console.log("🚫 Notification permission denied");

      // Android channel
      if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync("default", {
          name: "Default",
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: "#FF231F7C",
        });
      }
    };

    setup();

    // Foreground listener globalno
    const unsubscribeForeground = setupForegroundListener();

    return () => unsubscribeForeground();
  }, []);

  return <>{children}</>;
};
