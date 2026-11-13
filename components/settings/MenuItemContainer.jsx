import { ScrollView, StyleSheet } from "react-native";
import { MenuItem } from "./MenuItem";
import { useLocalization } from "@/context/LocalizationContext";
import { useTheme } from "@/theme";

/** System → Light → Dark → System … */
const NEXT_MODE = { system: "light", light: "dark", dark: "system" };

const MenuItemContainer = ({ onPress, isToken }) => {
  const { localization } = useLocalization();
  const { mode, setMode } = useTheme();
  return (
    <ScrollView style={styles.menuContainer}>
      <MenuItem
        iconName="translate"
        title={localization.SETTINGS.changeLanguage.capture}
        onPress={() => onPress("2")}
      />
      <MenuItem
        iconName="theme"
        title={`${localization.SETTINGS.THEME.title}: ${localization.SETTINGS.THEME[mode]}`}
        onPress={() => setMode(NEXT_MODE[mode])}
      />
      <MenuItem
        iconName="contacts"
        title={localization.SETTINGS.ABOUTAPP.title}
        onPress={() => onPress("100")}
      />

      <MenuItem
        iconName="support"
        title={localization.SETTINGS.HELP.title}
        onPress={() => onPress("900")}
      />
      <MenuItem
        iconName="document"
        title={localization.SETTINGS.LEGAL.title}
        onPress={() => onPress("200")}
      />
      {isToken &&
        <MenuItem
          iconName="logout"
          title={localization.SETTINGS.LOGOUT.title}
          onPress={() => onPress("6")}
          isLogout

        />
      }
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  menuContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
});
export default MenuItemContainer;
