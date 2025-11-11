import { useRootNavigationState, useRouter } from "expo-router";
import { useEffect } from "react";
import * as Notifications from "expo-notifications";
import messaging from "@react-native-firebase/messaging";
import { PermissionsAndroid, Platform } from "react-native";

export function usePushNotifications() {
  
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
        console.log('✅ FCM Token:', token);
      } catch (error) {
        console.error('❌ Error getting FCM token:', error);
      }
    };
    const requestPermission = async () => {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Notification permission granted.');
        getFcmToken();
      } else {
        console.log('Notification permission denied.');
      }
    };



    const unsubscribeOnMessage = messaging().onMessage(async remoteMessage => {
      console.log('📩 Foreground message:', remoteMessage);
      showNotification(remoteMessage.notification);
    });
    const unsubscribeOnNotificationOpened = messaging().onNotificationOpenedApp(
      remoteMessage => {
        console.log('📨 App opened from background state:', remoteMessage.notification);
        showNotification(remoteMessage.notification);
        // Navigate or handle as needed
      },
    );
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log('🚀 App opened from quit state:', remoteMessage.notification);
          showNotification(remoteMessage.notification)
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
}
