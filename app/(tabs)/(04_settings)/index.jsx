import SettingsComponent from "@/components/settings/SettingsComponent";
import { useIsFocused } from "@react-navigation/native";

const Settings = () => {

    const isFocused = useIsFocused(); // useIsFocused hook
    console.log("Settings isFocused", isFocused)
    return <SettingsComponent />;
}
export default Settings;