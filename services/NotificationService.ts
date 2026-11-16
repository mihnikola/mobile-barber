// import * as Notifications from "expo-notifications";
// import { Platform } from "react-native";
// import {
//   getToken,
//   getMessaging,
//   onMessage,
//   onTokenRefresh,
//   getInitialNotification,
//   onNotificationOpenedApp,
//   deleteToken,
//   getAPNSToken,
//   registerDeviceForRemoteMessages,
//   isDeviceRegisteredForRemoteMessages,
// } from "@react-native-firebase/messaging";
// const sleep = (ms: number) =>
//   new Promise<void>((resolve) => setTimeout(resolve, ms));
// export class NotificationService {
//   deviceToken: string = "";
//   subscriptions: Array<() => void> = [];
//   hasReceivedForeground = false;
//   hasHandledInitial = false;
//   private tokenRefreshStarted = false;
//   private getTokenPromise: Promise<string> | null = null;
//   constructor() {
//     this.setForegroundHandler();
//   }
//   setForegroundHandler() {
//     Notifications.setNotificationHandler({
//       handleNotification: async () => ({
//         shouldShowBanner: true,
//         shouldShowList: true,
//         shouldPlaySound: true,
//         shouldSetBadge: false,
//       }),
//     });
//   }
//   async requestPermission() {
//     const { status } = await Notifications.requestPermissionsAsync();
//     return status === "granted";
//   }
//   /**
//    * iOS-only prerequisite: an FCM token is DERIVED from the APNs token.
//    * If getToken() runs before APNs registration finishes, you get an
//    * INVALID token — the #1 cause of dead tokens on iOS.
//    */
//   private async ensureApnsReady(): Promise<boolean> {
//     if (Platform.OS !== "ios") return true; // Android has no APNs step
//     const messaging = getMessaging();
//     if (!(await isDeviceRegisteredForRemoteMessages(messaging))) {
//       await registerDeviceForRemoteMessages(messaging);
//     }
//     // APNs token arrives asynchronously — poll briefly instead of guessing.
//     for (let attempt = 0; attempt < 10; attempt++) {
//       const apnsToken = await getAPNSToken(messaging);
//       if (apnsToken) return true;
//       await sleep(500);
//     }
//     console.log("❌ APNs token not available — FCM token would be invalid");
//     return false;
//   }
//   async getFCMToken(): Promise<string> {
//     // Never run overlapping getToken calls (they corrupt in-flight registration)
//     if (this.getTokenPromise) return this.getTokenPromise;
//     this.getTokenPromise = this.fetchValidToken().finally(() => {
//       this.getTokenPromise = null;
//     });
//     return this.getTokenPromise;
//   }
//   private async fetchValidToken(): Promise<string> {
//     if (!(await this.ensureApnsReady())) return "";
//     const messaging = getMessaging();
//     // ⚡ NO deleteToken() here. Deleting invalidates the token SERVER-SIDE,
//     // so every push sent between delete and re-register fails with
//     // "registration-token-not-registered" — that is exactly the "invalid
//     // token" you were seeing. getToken() alone returns the cached token
//     // while it is still valid, or a fresh one automatically when it isn't.

//     for (let attempt = 1; attempt <= 3; attempt++) {
//       try {
//         const token = await getToken(messaging);
//         if (token) {
//           this.deviceToken = token;
//           console.log("🔥 FCM TOKEN:", token);
//           return token;
//         }
//       } catch (err) {
//         console.log(`getToken attempt ${attempt} failed:`, err);
//       }
//       await sleep(1000 * attempt);
//     }
//     console.log("❌ Could not obtain a valid FCM token");
//     return "";
//   }
//   /**
//    * Escape hatch — call ONLY when your own server responds
//    * UNREGISTERED / "registration-token-not-registered" for a stored token.
//    * Never call this on every app start.
//    */
//   async forceRefreshToken(): Promise<string> {
//     const messaging = getMessaging();
//     try {
//       await deleteToken(messaging);
//     } catch (err) {
//       console.log("deleteToken failed (safe on first run):", err);
//     }
//     this.deviceToken = "";
//     await sleep(500); // let FCM propagate the invalidation
//     return this.getFCMToken();
//   }
//   /*
//       * Tokens rotate at ANY moment (app restore, reinstall, security events,
//      * APNs change). This listener is what keeps deviceToken permanently valid.
//      */
//   private listenToTokenRefresh() {
//     if (this.tokenRefreshStarted) return;
//     this.tokenRefreshStarted = true;
//     const unsub = onTokenRefresh(getMessaging(), (token) => {
//       console.log("🔁 FCM token refreshed:", token);
//       this.deviceToken = token;
//       // If you later add a backend: POST the new token to it HERE,
//       // so the server never keeps a stale token.
//     });
//     this.subscriptions.push(() => {
//       unsub();
//       this.tokenRefreshStarted = false;
//     });
//   }
//   // FOREGROUND
//   listenToForegroundMessages() {
//     const unsub = onMessage(getMessaging(), async (remoteMessage) => {
//       console.log("📩 Foreground FCM:", remoteMessage);
//       // ⚡ iOS DUPLICATE FIX: on iOS, expo-notifications is the
//       // UNUserNotificationCenter delegate and our handler returns
//       // shouldShowBanner: true — so the SYSTEM already displays this
//       // remote notification in the foreground. Scheduling a local copy
//       // on top of it produced the duplicate. Android never displays
//       // foreground FCM messages, so there we must show it ourselves.
//       const hasNotificationPayload =
//         !!remoteMessage.notification?.title || !!remoteMessage.notification?.body;
//       if (Platform.OS === "ios" && hasNotificationPayload) {
//         // Keep tap routing alive for the system-displayed notification
//         // (tap responses from remote notifications also arrive in the
//         // expo click listener below).
//         this.hasReceivedForeground = true;
//         return;
//       }
//       await Notifications.scheduleNotificationAsync({
//         content: {
//           title:
//             remoteMessage.notification?.title ??
//             remoteMessage.data?.title ??
//             "Notification",
//           body:
//             remoteMessage.notification?.body ?? remoteMessage.data?.body ?? "",
//           data: remoteMessage.data,
//         },
//         trigger: null,
//       });
//       this.hasReceivedForeground = true;
//     });
//     this.subscriptions.push(unsub);
//   }
//   // KILLED STATE — handled only once
//   async handleKilledState(callback: (data: any) => void) {
//     if (this.hasHandledInitial) return;
//     const initial = await getInitialNotification(getMessaging());
//     if (initial?.data && initial.data.url) {
//       console.log("🚀 App opened from KILLED with valid data:", initial.data);
//       this.hasHandledInitial = true;
//       callback(initial.data);
//     } else {
//       this.hasHandledInitial = true; // Mark as handled even when empty
//     }
//   }
//   // BACKGROUND STATE
//   listenToBackgroundOpens(callback: (data: any) => void) {
//     const unsub = onNotificationOpenedApp(getMessaging(), (msg) => {
//       if (!msg?.data || !msg.data.url) return;
//       // Firebase guarantees: fires ONLY from BACKGROUND
//       console.log("📨 App opened from BACKGROUND:", msg.data);
//       callback(msg.data);
//     });
//     this.subscriptions.push(unsub);
//   }
//   async initializeListeners(onClick: (data?: any) => void) {
//     // 0) Token-rotation listener FIRST so no refresh is ever missed
//     this.listenToTokenRefresh();
//     // 1) Permission
//     const permissionGranted = await this.requestPermission();
//     if (!permissionGranted) {
//       console.log("❌ Notification permission denied");
//       return;
//     }
//     // 2) Valid FCM token (APNs-ready on iOS, retried, NO delete)
//     const token = await this.getFCMToken();
//     if (!token) {
//       console.log("❌ FCM token not obtained");
//       return;
//     }
//     console.log("🔥 FCM token:", token);
//     // 3) KILLED state
//     await this.handleKilledState(onClick);
//     // 4) BACKGROUND state (never mixed with killed!)
//     this.listenToBackgroundOpens(onClick);
//     // 5) FOREGROUND FCM → local notifications
//     this.listenToForegroundMessages();
//     // 6) CLICK on LOCAL notification
//     const clickListener = Notifications.addNotificationResponseReceivedListener(
//       (response) => {
//         if (!this.hasReceivedForeground) return;
//         const data = response.notification.request.content.data;
//         console.log("👉 Foreground notification clicked:", data);
//         onClick(data);
//         this.hasReceivedForeground = false;
//       },
//     );
//     this.subscriptions.push(() => clickListener.remove());
//   }
//   cleanup() {
//     this.subscriptions.forEach((u) => {
//       try {
//         u();
//       } catch { }
//     });
//     this.subscriptions = [];
//   }
// }
// export default new NotificationService();
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