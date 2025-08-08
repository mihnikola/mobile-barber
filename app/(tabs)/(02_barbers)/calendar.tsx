import DateComponent from "@/components/reservation/DateComponent";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";

const Calendar = () => {
  const [check, setCheck] = useState(false);
  const params = useLocalSearchParams();
  const { reevaluted } = params;
  
  const checkToken = async () => {
    try {
      const storedToken = await AsyncStorage.getItem("token");
      console.log("storedToken+++", storedToken);
      if (storedToken) {
        setCheck(true);
      } else {
      
        router.push({
          pathname: "/(tabs)/(04_settings)/login",
          params: { data: 1 },
        });
      }
    } catch (error) {
      console.error("Error reading token:", error);
       router.push({
          pathname: "/(tabs)/(04_settings)/login",
          params: { data: 1 },
        });
    }
  };
  // useEffect that runs when the screen is focused
  useEffect(() => {
    console.log("useEffect+++");

    checkToken();
  }, [reevaluted]); // Dependency on isFocused to trigger the effect
  if (check) {
    return <DateComponent />;
  }
};

export default Calendar;
