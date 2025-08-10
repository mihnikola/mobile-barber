import * as Notifications from "expo-notifications";
import { router } from "expo-router";
import { useEffect, useRef } from "react";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

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
const useNotificationListener = () => {
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    //kada sam u aplikaciji
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notificationData) => {
        if (notificationData) {
          redirectReservation(notificationData);
        }
      });

    //kada sam van aplikacije
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        if (response) {
          redirectReservation(response);
        }
      });

    //kada je aplikacija ubijena
    Notifications.getLastNotificationResponseAsync().then((response) => {
      if (response) {
        redirectReservation(response);
      }
    });

    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);


};
export default useNotificationListener;
