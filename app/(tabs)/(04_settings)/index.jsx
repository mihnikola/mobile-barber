import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SettingsComponent from "@/components/infoapp/SettingsComponent";

export default function Settings() {
  const [check, setCheck] = useState(false);
  const checkToken = async () => {
    try {
      const storedToken = await AsyncStorage.getItem("token");

      if (storedToken) {
        setCheck(true);
      } else {
        // router.push("/(tabs)/(04_settings)/login");
        router.dismissAll();
        router.push("/(tabs)/(04_settings)/login");
      }
    } catch (error) {
      console.error("Error reading token:", error);
      router.dismissAll();
      router.push("/(tabs)/(04_settings)/login");
    }
  };
  // useEffect that runs when the screen is focused
  useEffect(() => {
    checkToken();
  }, []); // Dependency on isFocused to trigger the effect
  if (check) {
    return <SettingsComponent />;
  }
}
