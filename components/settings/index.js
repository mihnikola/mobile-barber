import { SharedLoader } from "@/shared-components/SharedLoader";
import { useAuth } from "@/context/AuthContext";
import LoginScreen from "@/components/login";
import SettingsComponent from "@/components/settings/SettingsComponent";
import { useCallback, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
const Settings = () => {
  const { getTokenData } = useAuth();

  useFocusEffect(
    useCallback(() => {
      getTokenData();
    }, [])
  );

  // if (isLoading) {
  //   return <SharedLoader />;
  // }
  // if (!isToken) {
  //   return <LoginScreen />;
  // }
  // if (isToken) {
  return <SettingsComponent />;
  // }
};

export default Settings;
