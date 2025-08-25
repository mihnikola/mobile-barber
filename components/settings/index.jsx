import { useCallback } from "react";
import Loader from "@/components/Loader";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import useUser from "./hooks/useUser";
import LoginScreen from "../login";
import SettingsComponent from "./SettingsComponent";
import { useIsFocused } from "@react-navigation/native";
const SettingsProfileComponent = () => {



  const { isLoading, isValid, tokenData } = useUser();
  const params = useLocalSearchParams();
  
  const { reevaluted } = params;

  const isFocused = useIsFocused();

  useFocusEffect(
    useCallback(() => {
      tokenData();
    }, [isFocused, reevaluted])
  );

  if (isLoading) {
    return <Loader />;
  }
  if (!isValid && !isLoading) {
    return <LoginScreen />;
  }
  if (isValid && !isLoading) {
    return <SettingsComponent />;
  }
};

export default SettingsProfileComponent;
