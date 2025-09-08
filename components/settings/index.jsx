import LoginScreen from "../login";
import SettingsComponent from "./SettingsComponent";
import { SharedLoader } from "@/shared-components/SharedLoader";
import { useAuth } from "@/context/AuthContext";
const SettingsProfileComponent = () => {
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

export default SettingsProfileComponent;
