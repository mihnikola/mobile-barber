import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Platform, StatusBar, StyleSheet, Switch, Text, TouchableOpacity } from "react-native";

  export const MenuItem = ({ iconName, title, onPress, isToggle = false, toggleValue, onToggle, isLogout = false }) => (
    <TouchableOpacity
      style={[styles.menuItem, isLogout && styles.logoutMenuItem]}
      onPress={onPress}
      disabled={isToggle} // Disable touch feedback for the whole row if it's a toggle
    >
      <MaterialCommunityIcons
        name={iconName}
        size={24}
        color={isLogout ? '#E57373' : '#B0B0B0'} // Red for logout, light gray for others
        style={styles.menuItemIcon}
      />
      <Text style={[styles.menuItemText, isLogout && styles.logoutText]}>{title}</Text>
      {isToggle ? (
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }} // Example track colors
          thumbColor={toggleValue ? '#f5dd4b' : '#f4f3f4'} // Example thumb colors
          ios_backgroundColor="#3e3e3e"
          onValueChange={onToggle}
          value={toggleValue}
          style={styles.menuItemToggle}
        />
      ) : (
        <MaterialCommunityIcons
          name="chevron-right"
          size={24}
          color="#B0B0B0"
          style={styles.menuItemArrow}
        />
      )}
    </TouchableOpacity>
  );

  const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a', // Dark background as per image
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0, // Adjust for Android status bar
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333333', // Darker border for separation
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF', // White text
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
    marginBottom: 10,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 15,
    borderWidth: 2,
    borderColor: '#4a4a4a', // Subtle border around image
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  profileEmail: {
    fontSize: 14,
    color: '#B0B0B0', // Light gray for email
  },
  editButton: {
    backgroundColor: '#3a3a3a', // Darker background for button
    borderRadius: 20,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  logoutMenuItem: {
    borderBottomWidth: 0, // No border for logout
    marginTop: 20, // Add some space above logout
  },
  menuItemIcon: {
    marginRight: 15,
  },
  menuItemText: {
    flex: 1, // Allows text to take up available space
    fontSize: 16,
    color: '#FFFFFF',
  },
  logoutText: {
    color: '#E57373', // Red for logout text
    fontWeight: '600',
  },
  menuItemArrow: {
    marginLeft: 10,
  },
  menuItemToggle: {
    // Specific styles for the Switch component if needed
    transform: Platform.OS === 'ios' ? [{ scaleX: 0.8 }, { scaleY: 0.8 }] : [], // Adjust size for iOS
  },
});