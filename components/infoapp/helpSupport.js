// HelpSupportScreen.js
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  ScrollView,
  Image,
  StatusBar,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const companyInfo = {
  name: "Fucking Ozzy Osbourne",
  email: "support@osbourne.com",
};

const HelpSupportScreen = () => {
  const navigation = useNavigation();

  // Function to open the email app with a pre-filled recipient
  const handleEmailPress = () => {
    Linking.openURL(`mailto:${companyInfo.email}`);
  };

  return (
    <ScrollView style={styles.container}>
              <StatusBar backgroundColor="black" barStyle="dark-content" />
        
      <Image
        source={require("@/assets/images/settingsImage.jpg")}
        style={styles.headerImage}
        resizeMode="cover"
      />
      <Text style={styles.sectionTitle}>Contact Information</Text>

      {/* Display Company Name */}
      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Company:</Text>
        <Text style={styles.infoValue}>{companyInfo.name}</Text>
      </View>

      {/* Display and make the email address clickable */}
      <TouchableOpacity onPress={handleEmailPress} style={styles.menuItem}>
        <MaterialCommunityIcons
          name="email-outline"
          size={24}
          color="#B0B0B0"
          style={styles.menuItemIcon}
        />
        <Text style={styles.menuItemText}>Email Support</Text>
        <Text style={styles.menuItemSubText}>{companyInfo.email}</Text>
      </TouchableOpacity>

      {/* You could add more items here like a FAQ link or phone number */}
      {/* Example for a different menu item */}
      {/*
      <MenuItem
        iconName="frequently-asked-questions"
        title="FAQ"
        onPress={() => console.log('FAQ pressed')}
        hasSubItems={true}
      />
      */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000ff",
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#333333",
    marginBottom: 20,
  },
  headerImage: {
    width: "100%",
    height: 300,
    opacity: 0.3,
  },
  infoLabel: {
    fontSize: 16,
    color: "#B0B0B0",
  },
  infoValue: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "600",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#333333",
  },
  menuItemIcon: {
    marginRight: 15,
  },
  menuItemText: {
    flex: 1,
    fontSize: 16,
    color: "#FFFFFF",
  },
  menuItemSubText: {
    fontSize: 14,
    color: "#B0B0B0",
    marginLeft: "auto", // Pushes the subtext to the right
  },
});

export default HelpSupportScreen;
