import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import {
  getMessaging,
  register,
  unregister,
  onRegistered,
  onMessage,
  getInitialNotification,
  onNotificationOpenedApp,
  getAPNSToken,
  registerDeviceForRemoteMessages,
  isDeviceRegisteredForRemoteMessages,
} from "@react-native-firebase/messaging";

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));
const ANDROID_CHANNEL_ID = "default";

type TokenHandler = (fid: string) => void | Promise<void>;
type ClickHandler = (data?: any) => void;

export class NotificationService {
  deviceToken = ""; // this is now the FID (Firebase Installation ID)
  private subscriptions: Array<() => void> = [];
  private initialized = false;
  private hasHandledInitial = false;
  private registerPromise: Promise<string> | null = null;
  private onToken: TokenHandler | null = null;
  private lastSentToken = "";
  private lastClick = { key: "", at: 0 };

  constructor() {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowBanner: true,
        shouldShowList: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });
  }

  // ---------- PERMISSION (expo-notifications, not deprecated RNFB requestPermission) ----------
  async requestPermission(): Promise<boolean> {
    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync(ANDROID_CHANNEL_ID, {
        name: "Default",
        importance: Notifications.AndroidImportance.MAX,
      });
    }
    const current = await Notifications.getPermissionsAsync();
    if (current.status === "granted") return true;
    if (!current.canAskAgain) return false;
    const { status } = await Notifications.requestPermissionsAsync();
    return status === "granted";
  }

  // ---------- iOS APNs (register() does NOT do this for you) ----------
  private async ensureApnsReady(): Promise<boolean> {
    if (Platform.OS !== "ios") return true;
    const messaging = getMessaging();
    if (!isDeviceRegisteredForRemoteMessages(messaging)) {
      await registerDeviceForRemoteMessages(messaging);
    }
    for (let i = 0; i < 10; i++) {
      if (await getAPNSToken(messaging)) return true;
      await sleep(500);
    }
    console.log("❌ APNs token not available (simulator / missing push capability?)");
    return false;
  }

  // ---------- FID REGISTRATION ----------
  /** Resolves with the FID. Safe to call multiple times (no overlapping register calls). */
  async getFCMToken(): Promise<string> {
    if (this.deviceToken) return this.deviceToken;
    if (this.registerPromise) return this.registerPromise;
    this.registerPromise = this.registerDevice().finally(() => {
      this.registerPromise = null;
    });
    return this.registerPromise;
  }

  private async registerDevice(): Promise<string> {
    if (!(await this.ensureApnsReady())) return "";
    const messaging = getMessaging();

    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        await register(messaging); // FID arrives through onRegistered
        // onRegistered may fire slightly after register() resolves
        for (let i = 0; i < 10 && !this.deviceToken; i++) await sleep(300);
        if (this.deviceToken) return this.deviceToken;
      } catch (err) {
        console.log(`register attempt ${attempt} failed:`, err);
      }
      await sleep(1000 * attempt);
    }
    console.log("❌ Could not register device with FCM");
    return "";
  }

  /** Single place where the FID is stored AND synced to the backend. Never throws. */
  private async saveToken(fid: string) {
    this.deviceToken = fid;
    if (fid === this.lastSentToken || !this.onToken) return;
    try {
      await this.onToken(fid);
      this.lastSentToken = fid;
      console.log("✅ FID synced to backend:", fid);
    } catch (err) {
      console.log("❌ Failed to sync FID to backend:", err);
    }
  }

  /** Replaces onTokenRefresh. Also replays the cached FID immediately if already registered. */
  private listenToRegistration() {
    const unsub = onRegistered(getMessaging(), (fid) => {
      console.log("🔁 FCM registered (FID):", fid);
      void this.saveToken(fid);
    });
    this.subscriptions.push(unsub);
  }

  /** Call on LOGOUT (replaces deleteToken). Remove the FID from your backend too. */
  async unregisterDevice() {
    try {
      await unregister(getMessaging());
    } catch (err) {
      console.log("unregister failed:", err);
    }
    this.deviceToken = "";
    this.lastSentToken = "";
  }

  /** Use ONLY when your backend reports registration-token-not-registered. */
  async forceRefreshToken(): Promise<string> {
    await this.unregisterDevice();
    return this.getFCMToken();
  }

  // ---------- CLICK ROUTING (deduped) ----------
  private handleClick(data: any, onClick: ClickHandler) {
    if (!data?.url) return;
    const key = String(data.url);
    const now = Date.now();
    if (this.lastClick.key === key && now - this.lastClick.at < 2000) return;
    this.lastClick = { key, at: now };
    onClick(data);
  }

  // ---------- FOREGROUND ----------
  private listenToForegroundMessages() {
    const unsub = onMessage(getMessaging(), async (remoteMessage) => {
      const hasNotification =
        !!remoteMessage.notification?.title || !!remoteMessage.notification?.body;
      // iOS already displays notification payloads in foreground via the handler
      if (Platform.OS === "ios" && hasNotification) return;

      await Notifications.scheduleNotificationAsync({
        content: {
          title:
            remoteMessage.notification?.title ??
            (remoteMessage.data?.title as string) ??
            "Notification",
          body:
            remoteMessage.notification?.body ??
            (remoteMessage.data?.body as string) ??
            "",
          data: remoteMessage.data ?? {},
        },
        trigger: Platform.OS === "android" ? { channelId: ANDROID_CHANNEL_ID } : null,
      });
    });
    this.subscriptions.push(unsub);
  }

  // ---------- INIT ----------
  async initializeListeners(onClick: ClickHandler, onToken?: TokenHandler) {
    if (this.initialized) return;
    this.initialized = true;
    if (onToken) this.onToken = onToken;

    // 1) Listeners first — work even if permission/registration fails
    this.listenToRegistration();
    this.listenToForegroundMessages();

    this.subscriptions.push(
      onNotificationOpenedApp(getMessaging(), (msg) => this.handleClick(msg?.data, onClick)),
    );

    const clickListener = Notifications.addNotificationResponseReceivedListener((response) =>
      this.handleClick(response.notification.request.content.data, onClick),
    );
    this.subscriptions.push(() => clickListener.remove());

    // 2) Killed state (once)
    if (!this.hasHandledInitial) {
      this.hasHandledInitial = true;
      const initial = await getInitialNotification(getMessaging());
      if (initial?.data) this.handleClick(initial.data, onClick);
    }

    // 3) Permission + FID registration
    if (!(await this.requestPermission())) {
      console.log("❌ Notification permission denied");
      return;
    }
    const fid = await this.getFCMToken();
    if (!fid) console.log("❌ FCM registration failed");
  }

  cleanup() {
    this.subscriptions.forEach((u) => {
      try { u(); } catch {}
    });
    this.subscriptions = [];
    this.initialized = false;
  }
}

export default new NotificationService();