import * as Notifications from "expo-notifications";
import messaging from "@react-native-firebase/messaging";
import { saveExpoTokenStorage } from "@/helpers/expoToken";

export class NotificationService {
  deviceToken: string = "";
  subscriptions: Array<() => void> = [];
  hasReceivedForeground = false;

  constructor() {
    this.setForegroundHandler();
  }

  setForegroundHandler() {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });
  }

  async requestPermission() {
    const { status } = await Notifications.requestPermissionsAsync();
    return status === "granted";
  }

  async getFCMToken() {
    if (this.deviceToken) return this.deviceToken;

    try {
      const token = await messaging().getToken();
      if (token) {
        setTimeout(async () => {
          await saveExpoTokenStorage(token);
        }, 1000);
      } else {
        console.error("❌ [FCM] Token is NULL (Firebase not issuing token)");
      }
      this.deviceToken = token;
    } catch (err) {
      console.log("Error getting FCM token", err);
    }

    return this.deviceToken;
  }

  listenToTokenRefresh() {
    const unsub = messaging().onTokenRefresh((token) => {
      setTimeout(async () => {
          await saveExpoTokenStorage(token);
        }, 1000);
      this.deviceToken = token;
      console.log("🔄 New FCM token:", token);
    });
    this.subscriptions.push(unsub);
  }

  // FOREGROUND → Prikazujemo lokalnu
  listenToForegroundMessages() {
    const unsub = messaging().onMessage(async (remoteMessage) => {
      console.log("📩 Foreground FCM:", remoteMessage);

      await Notifications.scheduleNotificationAsync({
        content: {
          title:
            remoteMessage.notification?.title ??
            remoteMessage.data?.title ??
            "Notification",
          body:
            remoteMessage.notification?.body ?? remoteMessage.data?.body ?? "",
          data: remoteMessage.data,
        },
        trigger: null,
      });

      this.hasReceivedForeground = true;
    });

    this.subscriptions.push(unsub);
  }

  // BACKGROUND / KILLED
  async listenToInitialNotification(callback: (data: any) => void) {
    const initial = await messaging().getInitialNotification();

    if (initial?.data) {
      console.log("🚀 App opened from QUIT state:", initial.data);
      callback(initial.data);
    }
  }

  initializeListeners(onClick: (data?: any) => void) {
    // 1) request permissions + get token
    this.requestPermission();
    this.getFCMToken();

    // 2) handle killed state
    this.listenToInitialNotification(onClick);

    // 3) background open
    const unsubOpen = messaging().onNotificationOpenedApp((msg) => {
      console.log("📨 App opened from background:", msg.data);
      onClick(msg.data);
    });
    this.subscriptions.push(unsubOpen);

    // 4) foreground
    this.listenToForegroundMessages();

    // 5) click on local notification
    const clickListener = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        if (this.hasReceivedForeground) {
          const data = response.notification.request.content.data;
          console.log("👉 Foreground notification clicked:", data);
          onClick(data);
          this.hasReceivedForeground = false;
        }
      }
    );

    this.subscriptions.push(() => clickListener.remove());

    // 6) FCM token refresh
    this.listenToTokenRefresh();
  }

  cleanup() {
    this.subscriptions.forEach((u) => {
      try {
        u();
      } catch {}
    });
    this.subscriptions = [];
  }
}

export default new NotificationService();
