import { ReservationProvider } from "@/context/ReservationContext";
import { LocalizationProvider } from "@/context/LocalizationContext";
import { NavigationProvider } from "@/context/NavigationContext";
import { CompanyProvider } from "@/context/CompanyContext";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import { AuthProvider } from "@/context/AuthContext";
import SplashScreen from "@/shared-components/SuccessScreen";
import { GlobalErrorProvider } from "@/context/GlobalErrorContext";
import GlobalErrorHandler from "@/shared-components/GlobalErrorHandler";
import MainContainer from "@/components/mainContainer/MainContainer";
import messaging from "@react-native-firebase/messaging";
import { PermissionsAndroid, Platform } from "react-native";
import * as Notifications from "expo-notifications";
import { useRootNavigationState, useRouter } from "expo-router";

export default function RootLayout() {
  const [isLoading, setIsLoading] = useState(false);
  // const router = useRouter();
  // const [initialNotification, setInitialNotification] = useState(null);

  // useEffect(() => {
  //   async function setupFCM() {
  //     // 🔹 Android 13+ permissions
  //     if (Platform.OS === "android" && Platform.Version >= 33) {
  //       await PermissionsAndroid.request(
  //         PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
  //       );
  //     }

  //     // 🔹 Foreground listener
  //     const unsubscribeForeground = messaging().onMessage(
  //       async (remoteMessage) => {
  //         console.log("📲 Foreground message:", remoteMessage);

  //         // Prikaz notifikacije preko expo-notifications
  //         await Notifications.scheduleNotificationAsync({
  //           content: {
  //             title: remoteMessage.notification?.title || "Nova poruka",
  //             body:
  //               remoteMessage.notification?.body ||
  //               "Stigla je nova notifikacija!",
  //             sound: true,
  //           },
  //           trigger: null, // odmah
  //         });

  //         // Redirect na ekran definisan u data.screen
  //         const targetRoute = remoteMessage.data?.screen || "/notifications";
  //         router.replace(targetRoute);
  //       }
  //     );

  //     // 🔹 Background klik na notifikaciju
  //     const unsubscribeBackground = messaging().onNotificationOpenedApp(
  //       (remoteMessage) => {
  //         const targetRoute = remoteMessage.data?.screen || "/notifications";
  //         router.replace(targetRoute);
  //       }
  //     );

  //     // 🔹 Killed / cold start
  //     const remoteMessage = await messaging().getInitialNotification();
  //     if (remoteMessage) {
  //       // NE poziva router odmah, sačuvaj u state
  //       setInitialNotification(remoteMessage);
  //     }

  //     return () => {
  //       unsubscribeForeground();
  //       unsubscribeBackground();
  //     };
  //   }

  //   setupFCM();
  // }, []);

  // // 🔹 Kada root layout mountuje i hook je spreman, redirect
  // useEffect(() => {
  //   if (initialNotification) {
  //     const targetRoute = initialNotification.data?.screen || "/notifications";
  //       router.replace("/(tabs)/(03_calendar)");
  //     console.log("xxxxqweqweqwe",targetRoute)
  //     setInitialNotification(null); // reset
  //   }
  // }, [initialNotification]);
  //   const router = useRouter();
  // const navState = useRootNavigationState();
  // const pendingScreen = useRef(null);

  // // 1️⃣ Registruj FCM listenere
  // useEffect(() => {
  //   // 🔹 Foreground
  //   const unsubscribeForeground = messaging().onMessage(async (remoteMessage) => {
  //     console.log("📲 Foreground message:", remoteMessage);

  //     const target = remoteMessage.data?.screen || "/notifications";
  //     pendingScreen.current = target; // Sačuvaj
  //   });

  //   // 🔹 Background (app otvoren)
  //   const unsubscribeBackground = messaging().onNotificationOpenedApp((remoteMessage) => {
  //     const target = remoteMessage.data?.screen || "/notifications";
  //     pendingScreen.current = target;
  //   });

  //   // 🔹 Killed (cold start)
  //   (async () => {
  //     const msg = await messaging().getInitialNotification();
  //     if (msg) {
  //       console.log("📬 Opened from killed state: (tabs)/(03_calendar)/");
  //       pendingScreen.current = "(tabs)/(03_calendar)/";
  //     }
  //   })();

  //   return () => {
  //     unsubscribeForeground();
  //     unsubscribeBackground();
  //   };
  // }, []);

  // // 2️⃣ Kada router bude spreman, uradi redirect ako postoji pending ruta
  // useEffect(() => {
  //   if (navState?.key && pendingScreen.current) {
  //     console.log("✅ Router ready, redirecting to:", pendingScreen.current);
  //     router.replace(pendingScreen.current);
  //     pendingScreen.current = null;
  //   }
  // }, [navState?.key]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  // Create a custom dark theme with your desired background color
  const MyDarkTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      background: "#000000",
    },
  };

  if (!isLoading) {
    return (
      <ThemeProvider value={MyDarkTheme}>
        <LocalizationProvider>
          <CompanyProvider>
            <AuthProvider>
              <GlobalErrorProvider>
                <GlobalErrorHandler />
                <ReservationProvider>
                  <MainContainer />
                </ReservationProvider>
              </GlobalErrorProvider>
            </AuthProvider>
          </CompanyProvider>
        </LocalizationProvider>
      </ThemeProvider>
    );
  }
}
