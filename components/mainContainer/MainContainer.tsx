import React, { useEffect } from "react";
import { Stack, useRootNavigationState, useRouter } from "expo-router";
import { PermissionsAndroid, Platform } from "react-native";
import messaging from "@react-native-firebase/messaging";
import * as Notifications from "expo-notifications";

// 📱 Android kanal — OBAVEZAN za prikaz notifikacija iz FCM konzole
Notifications.setNotificationChannelAsync("default", {
  name: "Default",
  importance: Notifications.AndroidImportance.MAX,
  vibrationPattern: [0, 250, 250, 250],
  lightColor: "#FF231F7C",
});

const MainContainer = () => {
  const router = useRouter();
  const navState = useRootNavigationState();

  //tri stanja notifikacija
  useEffect(() => {
    const showNotification = async (remoteMessage) => {
      // await Notifications.scheduleNotificationAsync({
      //   content: {
      //     title: remoteMessage.title,
      //     body: remoteMessage.body,
      //     data: { customData: '12345' }, // optional extra data
      //   },
      //   trigger: null, // null = show immediately
      // });
    };

    const getFcmToken = async () => {
      try {
        const token = await messaging().getToken();
        console.log("✅ FCM Token:", token);
      } catch (error) {
        console.error("❌ Error getting FCM token:", error);
      }
    };
    const requestPermission = async () => {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log("Notification permission granted.");
        getFcmToken();
      } else {
        console.log("Notification permission denied.");
      }
    };

    const unsubscribeOnMessage = messaging().onMessage(
      async (remoteMessage) => {
        console.log("📩 Foreground message:", remoteMessage);
        showNotification(remoteMessage.notification);
      }
    );
    const unsubscribeOnNotificationOpened = messaging().onNotificationOpenedApp(
      (remoteMessage) => {
        console.log(
          "📨 App opened from background state:",
          remoteMessage.notification
        );
        showNotification(remoteMessage.notification);
        // Navigate or handle as needed
      }
    );
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          console.log(
            "🚀 App opened from quit state:",
            remoteMessage.notification
          );
          showNotification(remoteMessage.notification);
          // Handle navigation or deep link
        }
      });

    // Initialize permissions and token
    requestPermission();

    return () => {
      unsubscribeOnMessage();
      unsubscribeOnNotificationOpened();
    };
  }, []);

  return (
    <Stack initialRouteName="(tabs)" screenOptions={{ headerShown: false }} />
  );
};

export default MainContainer;
