import Constants from "expo-constants";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { useEffect, useState } from "react";
import { saveExpoTokenStorage } from "@/helpers/expoToken";
import { Platform } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

function handleRegistrationError(errorMessage) {
  alert(errorMessage);
  throw new Error(errorMessage);
}

async function registerForPushNotificationsAsync() {
  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      handleRegistrationError(
        "Permission not granted to get push token for push notification!"
      );
      return;
    }
    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ??
      Constants?.easConfig?.projectId;
    if (!projectId) {
      handleRegistrationError("Project ID not found");
    }
    try {
      const pushTokenString = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;
      console.log(pushTokenString);
      return pushTokenString;
    } catch (e) {
      handleRegistrationError(`${e}`);
    }
  } else {
    handleRegistrationError("Must use physical device for push notifications");
  }
}
const useNotificationServices = () => {
  const [expoPushToken, setExpoPushToken] = useState("");


  const redirectReservation = (response) => {
    const reservationIdValue =
      response?.notification?.request?.content?.data?.someData?.url;

    if (reservationIdValue && reservationIdValue !== undefined) {
      console.log("redirectReservation object", reservationIdValue);

      router.push({
        pathname: "/(tabs)/(03_calendar)/cancelModalReservation",
        params: { itemId: reservationIdValue, check: true },
      });
    }
  };
  useEffect(() => {
    registerForPushNotificationsAsync()
      .then((token) => setExpoPushToken(token ?? ""))
      .catch((error) => setExpoPushToken(`${error}`));

    //kada je aplikacija ubijena
    Notifications.getLastNotificationResponseAsync().then((response) => {
      if (response) {
        redirectReservation(response);
      }
    });
    //kada sam u aplikaciji
    const notificationListener = Notifications.addNotificationReceivedListener(
      (notificationData) => {
        if (notificationData) {
          redirectReservation(notificationData);
        }
      }
    );

    //kada sam van aplikacije
    const responseListener =
      Notifications.addNotificationResponseReceivedListener((response) => {
        if (response) {
          redirectReservation(response);
        }
      });

    return () => {
      notificationListener.remove();
      responseListener.remove();
    };
  }, []);

  useEffect(() => {
    if (expoPushToken) {
      saveExpoTokenStorage(expoPushToken);
    }
  }, [expoPushToken]);
  return { registerForPushNotificationsAsync, expoPushToken };
};
export default useNotificationServices;
