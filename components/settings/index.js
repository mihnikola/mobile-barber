import { SharedLoader } from "@/shared-components/SharedLoader";
import { useAuth } from "@/context/AuthContext";
import LoginScreen from "@/components/login";
import SettingsComponent from "@/components/settings/SettingsComponent";
import { useCallback, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
const Settings = () => {

  return <SettingsComponent />;
};

export default Settings;
