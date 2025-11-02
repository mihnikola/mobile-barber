import React, { useEffect, useRef, useState } from "react";
import { Stack, useRootNavigationState, useRouter } from "expo-router";
import { PermissionsAndroid, Platform } from "react-native";
import messaging from "@react-native-firebase/messaging";
import * as Notifications from "expo-notifications";
import InitialComponent from "../initalComponents/InitialComponent";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import SplashScreen from "@/shared-components/SplashScreen";

const MainContainer = () => {
  const router = useRouter();

  // const { initialToken, isLoading, addInitialTokenData } = useAuth();

  const navState = useRootNavigationState();
  const [initialNotification, setInitialNotification] = useState(null);
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
        console.log("xxxxqweqweqwe", xxxxqweqweqwe);
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

  // if (isLoading) {
  //   return <SplashScreen />;
  // }

  // if (!initialToken) {
  //   return <InitialComponent addToken={addInitialTokenData} />;
  // }

  return (
    // <AuthProvider>
      <Stack initialRouteName="(tabs)" screenOptions={{ headerShown: false }} />
    // </AuthProvider>
  );
};

export default MainContainer;
