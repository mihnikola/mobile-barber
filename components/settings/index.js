import { SharedLoader } from "@/shared-components/SharedLoader";
import { useAuth } from "@/context/AuthContext";
import LoginScreen from "@/components/login";
import SettingsComponent from "@/components/settings/SettingsComponent";
const Settings = () => {
  const { isToken, isLoading } = useAuth();

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
