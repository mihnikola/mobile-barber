import useUser from "./hooks/useUser";
import LoginScreen from "../login";
import SettingsComponent from "./SettingsComponent";
import { useCallback, useEffect, useState } from "react";
import { SharedLoader } from "@/shared-components/SharedLoader";
import { useFocusEffect } from "expo-router";
import { useIsFocused } from "@react-navigation/native";
const SettingsProfileComponent = () => {
  const [mja, setM] = useState(false);
  const {
    isLoading,
    tokenData,
    fetchUserData,
    isValidToken,
    logoutFromFIrebase,
  } = useUser();

  const isFocused = useIsFocused();
  useFocusEffect(
    useCallback(() => {
      setM(true);
    }, [isFocused])
  );
  useEffect(() => {
    if (mja) {
      console.log("SettingsProfileComponent useEffect aloooooooooooooooo");
      tokenData();
      fetchUserData();
      setM(false);
    }
  }, [mja]);

  if (isLoading) {
    return <SharedLoader />;
  }
  if (!isValidToken && !isLoading) {
    return <LoginScreen tokenData={tokenData} />;
  }
  if (isValidToken && !isLoading) {
    return <SettingsComponent logoutFromFIrebase={logoutFromFIrebase} />;
  }
};

export default SettingsProfileComponent;
