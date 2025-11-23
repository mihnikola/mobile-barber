import { useEffect } from "react";
import messaging from "@react-native-firebase/messaging";
import { router } from "expo-router";

export const useHomeNotification = () => {
  useEffect(() => {
    const redirectReservation = (notification: any) => {
      const id = notification?.data?.url;
      if (id) {
        router.replace({
          pathname: "/(zz_notification)",
          params: { itemId: id },
        });
      }
    };

    // 1️⃣ Background click
    const unsubscribeBackground = messaging().onNotificationOpenedApp((remoteMessage) => {
      if (remoteMessage) redirectReservation(remoteMessage);
    });

    // 2️⃣ Killed state
    messaging().getInitialNotification().then((remoteMessage) => {
      if (remoteMessage) redirectReservation(remoteMessage);
    });

    return () => unsubscribeBackground();
  }, []);
};
