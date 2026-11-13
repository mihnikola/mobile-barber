import { AppText, Icon, type IconName, Pressable } from "@/components/ui";
import {
  Platform,
  StatusBar,
  Switch,
} from "react-native";
import { fonts, makeStyles, useTheme } from "@/theme";

export const MenuItem = ({
  iconName,
  title,
  onPress,
  isToggle = false,
  toggleValue,
  onToggle,
  isLogout = false,
}) => {
  const { colors } = useTheme();
  const styles = useStyles();
  return (<Pressable
    style={[styles.menuItem, isLogout && styles.logoutMenuItem]}
    onPress={onPress}
    disabled={isToggle}
  >
    <Icon name={iconName as IconName} size={24} color="ink" style={styles.menuItemIcon} />
    <AppText variant="bodyStrong" style={styles.menuItemText}>{title}</AppText>
    {isToggle ? (
      <Switch
        trackColor={{ false: colors.lineStrong, true: colors.primary }}
        thumbColor={toggleValue ? colors.surface : colors.surface}
        ios_backgroundColor={colors.ink}
        onValueChange={onToggle}
        value={toggleValue}
        style={styles.menuItemToggle}
      />
    ) : (
      <Icon name="chevronRightThin" size={24} style={styles.menuItemArrow} color="inkMuted" />
    )}
  </Pressable>);
};

const useStyles = makeStyles((colors) => ({
  container: {
    flex: 1,
    backgroundColor: colors.surface, // Dark background as per image
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0, // Adjust for Android status bar
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.line, // Darker border for separation
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.ink, // White text
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
    marginBottom: 10,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 15,
    borderWidth: 2,
    borderColor: colors.lineStrong, // Subtle border around image
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "600",
    color: colors.ink,
    fontFamily: fonts.sans,
    marginBottom: 2,
  },
  profileEmail: {
    fontSize: 14,
    color: colors.inkMuted, // Light gray for email
  },
  editButton: {
    backgroundColor: colors.surfaceSunken, // Darker background for button
    borderRadius: 20,
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  menuContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
  },
  logoutMenuItem: {
    borderBottomWidth: 0, // No border for logout
  },
  menuItemIcon: {
    marginRight: 15,
  },
  menuItemText: {
    flex: 1, // Allows text to take up available space
  },
  logoutText: {
    color: colors.ink,
    fontFamily: fonts.sansSemiBold,
  },
  menuItemArrow: {
    marginLeft: 10,
  },
  menuItemToggle: {
    // Specific styles for the Switch component if needed
    transform: Platform.OS === "ios" ? [{ scaleX: 0.8 }, { scaleY: 0.8 }] : [], // Adjust size for iOS
  },
}));
