import { useEffect } from "react";
import NotificationService from "./NotificationService";
import { useRouter, useSegments } from "expo-router";
// import { useAuth } from "@/context/AuthContext";

export default function useNotifications() {
  const router = useRouter();
  const segments = useSegments();
  // const { isToken } = useAuth();

  const isRouterReady = segments.length > 0;

  useEffect(() => {
    if (!isRouterReady) return;

    const onClick = (data) => {

      console.log("AJMO LEPOTANE MAWI", data)
      if (!data?.url) return;

      router.push({
        pathname: "/(reservation_notification)/",
        params: {
          itemId: data.url,
          notification: 1,
        },
      });
    };

    NotificationService.initializeListeners(onClick);

    return () => {
      NotificationService.cleanup();
    };
  }, [isRouterReady]);
}
