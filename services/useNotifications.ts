import { useEffect } from "react";
import NotificationService from "./NotificationService";
import { useRouter, useSegments } from "expo-router";

export default function useNotifications() {
  const router = useRouter();
  const segments = useSegments();
  const isRouterReady = segments.length > 0; // kada su segmenti loadovani

  useEffect(() => {
    if (!isRouterReady) return;

    const onClick = (data?: any) => {
      if (!data?.url) return;
      router.replace({
        pathname: "/(zz_notification)",
        params: { itemId: data.url },
      });
    };

    NotificationService.initializeListeners(onClick);

    return () => {
      NotificationService.cleanup();
    };
  }, [isRouterReady]);
}
