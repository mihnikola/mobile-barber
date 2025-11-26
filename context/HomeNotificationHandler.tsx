import { useEffect } from "react";
import messaging from "@react-native-firebase/messaging";
import { router } from "expo-router";

export const useHomeNotification = () => {
  useEffect(() => {
    const redirectReservation = (data: any) => {
      const id = data?.url;
      if (id) {
        router.replace({
          pathname: "/(zz_notification)",
          params: { itemId: id },
        });
      }
    };

    // 1️⃣ App opened from background
    // const unsubscribeOpen = messaging().onNotificationOpenedApp(
    //   (remoteMessage) => {
    //     console.log("🔥 Background click:", remoteMessage);
    //     if (remoteMessage?.data) {
    //       redirectReservation(remoteMessage.data);
    //     }
    //   }
    // );

    // 2️⃣ App opened from quit (killed)
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage?.data) {
          console.log("🚀 Quit click:", remoteMessage);
          redirectReservation(remoteMessage.data);
        }
      });

    // return () => {
    //   unsubscribeOpen();
    // };
  }, []);
};
