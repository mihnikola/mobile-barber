import { useEffect, useState } from "react";
import Loader from "@/components/Loader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import CalendarComponent from "../components/reservation/CalendarComponent";
import SignForm from "../components/SignForm/SignForm";
import { BackHandler } from "react-native";

export default function Explore() {
    const navigation = useNavigation();
  
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState(null);
  function handleBackButtonClick() {
    navigation.goBack();
    return true;
  }
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackButtonClick
      );
    };
  }, []);
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
      {!isLoading && token && <CalendarComponent />}
      {!isLoading && !token && (
        <>
          <SignForm options="calendar appointments" />
        </>
      )}
      {isLoading && !token && <Loader />}
    </>
  );
}
