import { SharedLoader } from "@/shared-components/SharedLoader";
import { useAuth } from "@/context/AuthContext";
import LoginScreen from "@/components/login";
import SettingsComponent from "@/components/settings/SettingsComponent";
import { useEffect } from "react";
const Settings = () => {
  const { isToken, isLoading, fetchUserData } = useAuth();

  useEffect(() => {
    if (isToken) {
      fetchUserData();
    }
  }, [isToken]);
  if (isLoading) {
    return <SharedLoader />;
  }
  if (!isToken) {
    return <LoginScreen />;
  }
  if (isToken) {
    return <SettingsComponent />;
  }
};

export default Settings;
