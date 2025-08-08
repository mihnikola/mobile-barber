import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  StatusBar,
  Platform,
  TouchableOpacity,
} from "react-native";
import { removeStorage } from "@/helpers/token";
import { useState } from "react";
import { SharedQuestion } from "@/shared-components/SharedQuestion";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { MenuItem } from "./MenuItem";
import useUser from "./hooks/useUser";
import Loader from "@/components/Loader";
import { router } from "expo-router";
const SettingsComponent = () => {
  const [isMessage, setIsMessage] = useState(false);
  const { userData, isLoading, error } = useUser();

  if (isLoading) {
    return <Loader />;
  }

  const onPressHandler = (data: any) => {
    if (data === "1") {
      router.push("/(tabs)/(04_settings)/infoUserProfile");
    }
    if (data === "100") {
      router.push("/(tabs)/(04_settings)/infoApp");

    }
    if (data === "200") {
      router.push("/(tabs)/(04_settings)/infoPrivacy");

    }
    if (data === "900") {
      router.push("/(tabs)/(04_settings)/infoHelpCenter");

    }
    if (data === "6") {
      setIsMessage(true);
    }
  };

  const logoutHandler = async () => {
    setIsMessage(false);
    removeStorage().then((s) => {
      router.push("/(tabs)/(01_home)");
    });
  };
  return (
    <View style={styles.container}>
      {/* Status Bar style adjustment for dark background */}
      <StatusBar barStyle="dark-content" backgroundColor="black" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Profile</Text>
      </View>

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image source={{ uri: userData?.image }} style={styles.profileImage} />
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{userData?.name}</Text>
          <Text style={styles.profileEmail}>{userData?.email}</Text>
        </View>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => onPressHandler("1")}
        >
          <MaterialCommunityIcons name="pencil" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Menu Items */}
      <ScrollView style={styles.menuContainer}>
       

        <MenuItem
          iconName="contacts"
          title="About Application"
          onPress={() => onPressHandler("100")}
        />
          <MenuItem
          iconName="file-document"
          title="Legal & Policy"
          onPress={() => onPressHandler("200")}
        />
 <MenuItem
          iconName="face-agent"
          title="Help & Support"
          onPress={() => onPressHandler("900")}
        />
      
        
        <MenuItem
          iconName="logout"
          title="Logout"
          onPress={() => onPressHandler("6")}
          isLogout={true}
        />
        {isMessage && (
          <SharedQuestion
            isOpen={isMessage}
            onClose={() => setIsMessage(false)}
            onLogOut={logoutHandler}
            icon={
              <FontAwesome
                name="question-circle-o" // The specific FontAwesome icon to use
                size={64} // Size of the icon
                color="white" // Corresponds to text-blue-500
              />
            }
            title="Are you sure you want to sign out from application?" // Title of the modal
            buttonTextYes="Ok" // Text for the action button
            buttonTextNo="Cancel"
          />
        )}
      </ScrollView>
    </View>
  );
};

export default SettingsComponent;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black", // Dark background as per image
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0, // Adjust for Android status bar
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#333333", // Darker border for separation
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF", // White text
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#333333",
    marginBottom: 10,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 15,
    borderWidth: 2,
    borderColor: "#4a4a4a", // Subtle border around image
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 2,
  },
  profileEmail: {
    fontSize: 14,
    color: "#B0B0B0", // Light gray for email
  },
  editButton: {
    backgroundColor: "black", // Darker background for button
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
    borderBottomColor: "#333333",
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
    color: "#FFFFFF",
  },
  logoutText: {
    color: "#E57373", // Red for logout text
    fontWeight: "600",
  },
  menuItemArrow: {
    marginLeft: 10,
  },
  menuItemToggle: {
    // Specific styles for the Switch component if needed
    transform: Platform.OS === "ios" ? [{ scaleX: 0.8 }, { scaleY: 0.8 }] : [], // Adjust size for iOS
  },
});
