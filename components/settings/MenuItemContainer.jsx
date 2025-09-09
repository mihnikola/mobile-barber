import { ScrollView, StyleSheet } from "react-native";
import { MenuItem } from "./MenuItem";

const MenuItemContainer = ({ onPress }) => {
  return (
    <ScrollView style={styles.menuContainer}>
      <MenuItem
        iconName="translate"
        title="Change Language"
        onPress={() => onPress("2")}
      />
      <MenuItem
        iconName="contacts"
        title="About Application"
        onPress={() => onPress("100")}
      />

      <MenuItem
        iconName="face-agent"
        title="Help & Support"
        onPress={() => onPress("900")}
      />
      <MenuItem
        iconName="file-document"
        title="Legal & Policy"
        onPress={() => onPress("200")}
      />
      <MenuItem
        iconName="logout"
        title="Logout"
        onPress={() => onPress("6")}
        isLogout
      />
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  menuContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
});
export default MenuItemContainer;
