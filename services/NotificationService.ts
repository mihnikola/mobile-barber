import * as Notifications from "expo-notifications";
import {
  getToken,
  getMessaging,
  onMessage,
  getInitialNotification,
  onNotificationOpenedApp,
} from "@react-native-firebase/messaging";

export class NotificationService {
  deviceToken: string = "";
  subscriptions: Array<() => void> = [];
  hasReceivedForeground = false;
  hasHandledInitial = false; // ⚡ Ključni flag – sprečava pogrešne triggere

  constructor() {
    this.setForegroundHandler();
  }
  //kaze gpt deprecated
  // setForegroundHandler() {
  //   Notifications.setNotificationHandler({
  //     handleNotification: async () => ({
  //       shouldShowAlert: true,
  //       shouldPlaySound: true,
  //       shouldSetBadge: false,
  //     }),
  //   });
  // }
  setForegroundHandler() {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowBanner: true,
        shouldShowList: true,
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
      const token = await getToken(getMessaging());

      if (token) {
        this.deviceToken = token;
      }
    } catch (err) {
      console.log("Error getting FCM token", err);
    }

    return this.deviceToken;
  }

  // FOREGROUND
  listenToForegroundMessages() {
    const unsub = onMessage(getMessaging(), async (remoteMessage) => {
      console.log("📩 Foreground FCM:", remoteMessage);

      const hasNotification =
        remoteMessage.notification?.title || remoteMessage.notification?.body;
      const hasDataPayload =
        remoteMessage.data?.title || remoteMessage.data?.body;

      if (!hasNotification && !hasDataPayload) {
        return;
      }

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

  // KILLED STATE — SAMO JEDNOM
  async handleKilledState(callback: (data: any) => void) {
    if (this.hasHandledInitial) return;

    const initial = await getInitialNotification(getMessaging());
    if (initial?.data && initial.data.url) {
      console.log(
        "🚀 App opened from KILLED sa validnim podacima:",
        initial.data,
      );
      this.hasHandledInitial = true;
      callback(initial.data);
    } else {
      this.hasHandledInitial = true; // Obeleži kao rešeno čak i ako je prazno
    }
  }

  // BACKGROUND STATE
  listenToBackgroundOpens(callback: (data: any) => void) {
    const unsub = onNotificationOpenedApp(getMessaging(), (msg) => {
      if (!msg?.data || !msg.data.url) return;
      // Firebase GARANTUJE: ovo se okida SAMO iz BACKGROUNDA
      console.log("📨 App opened from BACKGROUND:", msg.data);

      callback(msg.data);
    });

    this.subscriptions.push(unsub);
  }

  async initializeListeners(onClick: (data?: any) => void) {
    // 1) Permissions + token
    //  const permissionGranted = await this.requestPermission();
    // this.requestPermission();
    // this.getFCMToken();
    // 1. Sačekaj permission
    const permissionGranted = await this.requestPermission();

    if (!permissionGranted) {
      console.log("❌ Notification permission denied");
      return;
    }

    // 2. Sačekaj FCM token
    const token = await this.getFCMToken();

    if (!token) {
      console.log("❌ FCM token nije dobijen");
      return;
    }

    console.log("🔥 FCM token:", token);

    // 2) KILLED state
    await this.handleKilledState(onClick);

    // 3) BACKGROUND state (ne meša se sa killed!)
    this.listenToBackgroundOpens(onClick);

    // 4) FOREGROUND FCM → lokalne notifikacije
    this.listenToForegroundMessages();

    // 5) CLICK NA LOKALNU notifikaciju
    const clickListener = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        if (!this.hasReceivedForeground) return;

        const data = response.notification.request.content.data;
        console.log("👉 Foreground notification clicked:", data);

        onClick(data);
        this.hasReceivedForeground = false;
      },
    );

    this.subscriptions.push(() => clickListener.remove());
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
