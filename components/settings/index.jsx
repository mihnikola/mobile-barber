import LoginScreen from "../login";
import SettingsComponent from "./SettingsComponent";
import { SharedLoader } from "@/shared-components/SharedLoader";
import { useAuth } from "@/context/AuthContext";
const SettingsProfileComponent = () => {
  const { isToken, isLoading } = useAuth();

  if (isLoading) {
    return <SharedLoader />;
  }
  if (!isToken && !isLoading) {
    return <LoginScreen />;
  }
  if (isToken && !isLoading) {
    return <SettingsComponent />;
  }
};

export default SettingsProfileComponent;
