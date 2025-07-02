import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  Alert,
  ScrollView,
  StatusBar,
  Platform,
  TouchableOpacity,
} from "react-native";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { removeStorage } from "@/helpers/token";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { SharedQuestion } from "@/shared-components/SharedQuestion";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { MenuItem } from "./MenuItem";
import useUser from "./../infoapp/hooks/useUser";
import usePhoneNumber from "./../infoapp/hooks/usePhoneNumber";
import Loader from "@/components/Loader";
import useUserChange from "./../infoapp/hooks/useUserChange";
import useName from "./../infoapp/hooks/useName";
const SettingsComponent = () => {
  const navigation = useNavigation();

  // Mock user data - replace with actual data fetched from your backend/context
  // const userData = {
  //   profilePicture: "https://placehold.co/100x100/333/FFF?text=SS", // Placeholder image, dark background for consistency
  //   fullName: "Shane Smith",
  //   email: "shane.smith@example.com",
  // };

  const [isMessage, setIsMessage] = useState(false);

  const { userData, isLoading, error } = useUser();

  if (isLoading) {
    return <Loader />;
  }

  const onPressHandler = (data) => {
    if (data === "1") {
      navigation.navigate("components/infoapp/userprofile");
    }
    if (data === "2") {
      navigation.navigate("components/infoapp/aboutapplication");
    }
    if (data === "4") {
      navigation.navigate("components/infoapp/privacypolicy");
    }
    if (data === "6") {
      setIsMessage(true);
    }
  };

  const logoutHandler = async () => {
    removeStorage().then((s) => {
      navigation.navigate("(tabs)", { screen: "index" });
    });
  };

  return (
    <View style={styles.container}>
      {/* Status Bar style adjustment for dark background */}
      <StatusBar barStyle="light-content" backgroundColor="#1a1a1a" />

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
          iconName="location-enter"
          title="My location"
          onPress={() => console.log("My Bookings pressed")}
        />

        <MenuItem
          iconName="contacts"
          title="About Application"
          onPress={() => console.log("Settings pressed")}
        />

        <MenuItem
          iconName="file-document"
          title="Privacy Policy"
          onPress={() => console.log("Privacy Policy pressed")}
        />
        <MenuItem
          iconName="file-document-outline"
          title="Terms & Conditions"
          onPress={() => console.log("Terms & Conditions pressed")}
        />
        <MenuItem
          iconName="logout"
          title="Logout"
          onPress={()=>onPressHandler("6")}
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
  // return (
  //   <ScrollView style={styles.container}>
  //     <Image
  //       source={require("@/assets/images/settingsImage.jpg")}
  //       style={styles.headerImage}
  //       resizeMode="cover"
  //     />
  //     <View style={styles.containerInfo}>
  //       <SettingItem
  //         title="User profile"
  //         icon="person.outline"
  //         handlePress={() => onPressHandler("1")}
  //       />

  //       <SettingItem
  //         title="Privacy policy"
  //         icon="lock"
  //         handlePress={() => onPressHandler("4")}
  //       />

  //       <SettingItem
  //         title="About application"
  //         icon="info"
  //         handlePress={() => onPressHandler("2")}
  //       />
  //       <SettingItem
  //         title="Log out"
  //         icon="logout"
  //         handlePress={() => onPressHandler("6")}
  //       />
  //     </View>
  //
  //   </ScrollView>
  // );
};

export default SettingsComponent;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a", // Dark background as per image
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
    backgroundColor: "#3a3a3a", // Darker background for button
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
