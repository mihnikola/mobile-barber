import React, { useEffect, useRef, useState } from "react";
import { Stack, useRootNavigationState, useRouter } from "expo-router";
import { PermissionsAndroid, Platform } from "react-native";
import messaging from "@react-native-firebase/messaging";
import * as Notifications from "expo-notifications";

const MainContainer = () => {
  const router = useRouter();
  const navState = useRootNavigationState();
  const [initialNotification, setInitialNotification] = useState(null);
  const valueX = useRef(null);
  useEffect(() => {
    console.log("van");
    if (navState?.key && initialNotification) {
      console.log("in", initialNotification);

      // router.replace("(tabs)/(03_calendar)/");
    }
  }, [navState?.key]);

  useEffect(() => {
    async function setupFCM() {
      // Android 13+ permission
      if (Platform.OS === "android" && Platform.Version >= 33) {
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
        );
      }

      // Foreground listener
      const unsubscribeForeground = messaging().onMessage(
        async (remoteMessage) => {
          console.log("📲 Foreground message:", remoteMessage);

          await Notifications.scheduleNotificationAsync({
            content: {
              title: remoteMessage.notification?.title || "Nova poruka",
              body:
                remoteMessage.notification?.body ||
                "Stigla je nova notifikacija!",
              sound: true,
            },
            trigger: null,
          });

          setInitialNotification(remoteMessage);
        }
      );

      // Background listener
      const unsubscribeBackground = messaging().onNotificationOpenedApp(
        (remoteMessage) => {
          if (remoteMessage) {
            console.log("📩 Background message:", remoteMessage);

            setInitialNotification(remoteMessage);
          }
        }
      );

      // Killed / cold start
      const xxxxqweqweqwe = await messaging().getInitialNotification();
      if (xxxxqweqweqwe && navState) {
        console.log("xxxxqweqweqwe",xxxxqweqweqwe)
        router.push({
          pathname: "/(tabs)/(03_calendar)/cancelReservation",
          params: { itemId: "68ef6c9f67d47ee2df80c153" },
        });
        // valueX.current = xxxxqweqweqwe;
        // setInitialNotification({ ...xxxxqweqweqwe }); // kopija objekta
      }

      return () => {
        unsubscribeForeground();
        unsubscribeBackground();
      };
    }

    setupFCM();
  }, []);

  return (
    <>
      {/* Prosledjujemo ref direktno */}

      <Stack screenOptions={{ headerShown: false }} initialRouteName="(tabs)" />
    </>
  );
};

export default MainContainer;
