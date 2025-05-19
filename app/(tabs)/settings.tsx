import { useEffect, useState } from "react";
import Loader from "@/components/Loader";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SignForm from "../components/SignForm/SignForm";
import InfoComponent from "@/shared-components/InfoComponent";
import SettingsComponent from "../components/settings/SettingsComponent";

export default function Settings() {
  const [isLoading, setIsLoading] = useState(false);

  const [token, setToken] = useState<string | null>(null);

  const isFocused = useIsFocused(); // useIsFocused hook
  // Function to check for token in AsyncStorage
  const checkToken = async () => {
    setIsLoading(true);
    try {
      const storedToken = await AsyncStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
        console.log("Token exists:", storedToken);
      } else {
        setToken(null);
        console.log("No token found");
      }
    } catch (error) {
      console.error("Error reading token:", error);
    }
  };
  // useEffect that runs when the screen is focused
  useEffect(() => {
    if (isFocused) {
      // Check token only when this screen/tab is focused
      checkToken();
      setIsLoading(false);
    }
  }, [isFocused]); // Dependency on isFocused to trigger the effect

  

  return (
    <>
      {!isLoading && token && <SettingsComponent />}
      {!isLoading && !token && (
        <>
          <SignForm />
          <InfoComponent title="Sign in to see your settings" />
        </>
      )}
      {isLoading && <Loader />}
    </>
  );
}
