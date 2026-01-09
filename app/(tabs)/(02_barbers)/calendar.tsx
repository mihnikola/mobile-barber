import DateComponent from "@/components/reservation/DateComponent";
import { useLastPathNavigation } from "@/context/NavigationContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import { router, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { BackHandler } from "react-native";

const Calendar = () => {
  const [check, setCheck] = useState(false);
  const { reevaluted } = useLocalSearchParams();
  const { saveLastTab } = useLastPathNavigation();

  const checkToken = async () => {
    try {
      const storedToken = await AsyncStorage.getItem("token");
      if (storedToken) {
        setCheck(true);
      } else {
        // router.dismissAll();
        router.push({
          pathname: "/(z_auth)/",
          params: { data: "calendar" },
        });
      }
    } catch (error) {
      router.push("/(z_auth)/");
    }
  };
  // useEffect that runs when the screen is focused
  const isF = useIsFocused();
  useFocusEffect(
    useCallback(() => {
      checkToken();
    }, [isF, reevaluted])
  ); // Dependency on isFocused to trigger the effect
    useEffect(() => {
    const backAction = () => {
      console.log("xxqqqqqqqqq");
      router.back();
      saveLastTab("/(tabs)/(02_barbers)/employers");
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove(); // Cleanup function to remove the event listener
  }, []);
  if (check) {
    return <DateComponent />;
  }
};

export default Calendar;
