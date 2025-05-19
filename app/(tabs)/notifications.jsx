import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import SignForm from "../components/SignForm/SignForm";
import InfoComponent from "@/shared-components/InfoComponent";
import Loader from "@/components/Loader";
import NotificationComponent from "../components/notifications/NotificationComponent";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function NotificationLayout() {

  const [isLoading, setIsLoading] = useState(false);

  const [token, setToken] = useState(null);

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
   useEffect(() => {
    if (isFocused) {
      // Check token only when this screen/tab is focused
      checkToken();
      setIsLoading(false);
    }
  }, [isFocused]); // Dependency on isFocused to trigger the effect
  return (
    <>
      {!isLoading && token && <NotificationComponent />}
      {!isLoading && !token && (
        <>
          <SignForm />
          <InfoComponent title="Sign in to see your notifications" />
        </>
      )}
      {isLoading && <Loader />}
    </>
  );
}
