import { useEffect } from "react";
import NotificationService from "./NotificationService";
import { useRouter } from "expo-router";

export default function useNotifications() {
  const router = useRouter();

  useEffect(() => {
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
  }, []);
}
