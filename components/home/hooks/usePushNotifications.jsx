import { router } from "expo-router";

export function usePushNotifications() {

  const opalica = () => {
    console.log("major");
    router.replace("/(tabs)/(03_calendar)");
    console.log("vojnik");
  };

  return { opalica };
}
