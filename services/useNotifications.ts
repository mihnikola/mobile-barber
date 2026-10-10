// import { useEffect } from "react";
// import NotificationService from "./NotificationService";
// import { useRouter, useSegments } from "expo-router";

// export default function useNotifications() {
//   const router = useRouter();
//   const segments = useSegments();

//   const isRouterReady = segments.length > 0;

//   useEffect(() => {
//     if (!isRouterReady) return;

//     const onClick = (data) => {
//       console.log("data", data);
//       if (!data || data.url === null || data.url === undefined) {
//         router.push("/(tabs)/");
//         return;
//       }

//       router.push({
//         pathname: "/(reservation_notification)/",
//         params: {
//           itemId: data.url,
//           notification: 1,
//         },
//       });
//     };

//     NotificationService.initializeListeners(onClick);

//     return () => {
//       NotificationService.cleanup();
//     };
//   }, [isRouterReady]);
// }
import { useEffect, useRef } from "react";
import NotificationService from "./NotificationService";
import { useRouter, useSegments } from "expo-router";

export default function useNotifications() {
  const router = useRouter();
  const segments = useSegments();
  const isNavigating = useRef(false);

  const isRouterReady = segments.length > 0;

  useEffect(() => {
    if (!isRouterReady) return;

    const onClick = (data: any) => {
      console.log("🔥 Notification Click Payload:", data);

      if (isNavigating.current) return;

      const targetId = data?.url;

      if (!targetId || targetId === "null" || String(targetId).trim() === "") {
        return;
      }

      isNavigating.current = true;

      // ⚡ Čeka prvi render frejm pri buđenju ekrana...
      requestAnimationFrame(() => {
        // ...i navodi navigaciju u drugom frejmu kada je Native View Layout sigurno spreman
        requestAnimationFrame(() => {
          try {
            if (router.canDismiss()) {
              router.dismissAll();
            }

            router.push({
              pathname: "/(reservation_notification)/",
              params: {
                itemId: String(targetId),
                notification: "1",
              },
            });
          } catch (error) {
            console.error("❌ Greška pri push navigaciji:", error);
          } finally {
            isNavigating.current = false;
          }
        });
      });
    };

    NotificationService.initializeListeners(onClick);

    return () => {
      NotificationService.cleanup();
    };
  }, [isRouterReady]);
}