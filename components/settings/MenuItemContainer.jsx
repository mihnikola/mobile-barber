import { ScrollView, StyleSheet } from "react-native";
import { MenuItem } from "./MenuItem";
import { useLocalization } from "@/context/LocalizationContext";

const MenuItemContainer = ({ onPress, isToken }) => {
  const { localization } = useLocalization();
  return (
    <ScrollView style={styles.menuContainer}>
      <MenuItem
        iconName="translate"
        title={localization.SETTINGS.changeLanguage.capture}
        onPress={() => onPress("2")}
      />
      <MenuItem
        iconName="contacts"
        title={localization.SETTINGS.ABOUTAPP.title}
        onPress={() => onPress("100")}
      />

      <MenuItem
        iconName="face-agent"
        title={localization.SETTINGS.HELP.title}
        onPress={() => onPress("900")}
      />
      <MenuItem
        iconName="file-document"
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
