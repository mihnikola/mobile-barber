import DateComponent from "@/components/reservation/DateComponent";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import { router, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";

const Calendar = () => {
  const [check, setCheck] = useState(false);
  const params = useLocalSearchParams();
  const { reevaluted } = params;
  console.log("reevalutedreevalutedreevaluted", reevaluted);
  const checkToken = async () => {
    try {
      console.log("reevalutedreevalutedreevaluted", reevaluted);

      const storedToken = await AsyncStorage.getItem("token");
      if (storedToken) {
        setCheck(true);
      } else {
        router.dismissAll();
        router.push("/(tabs)/(04_settings)/login");
      }
    } catch (error) {
      router.push("/(tabs)/(04_settings)/login");
    }
  };
  // useEffect that runs when the screen is focused
  const isF = useIsFocused();
  useFocusEffect(
    useCallback(() => {
      checkToken();
    }, [isF, reevaluted])
  ); // Dependency on isFocused to trigger the effect
  if (check) {
    return <DateComponent />;
  }
};

export default Calendar;
