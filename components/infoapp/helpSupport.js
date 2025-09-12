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
import { useLocalization } from "@/context/LocalizationContext";

const companyInfo = {
  name: "Fucking Ozzy Osbourne",
  email: "support@osbourne.com",
};

const HelpSupportScreen = () => {
  const { localization } = useLocalization();
  const handleEmailPress = () => {
    Linking.openURL(`mailto:${companyInfo.email}`);
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar backgroundColor="black" barStyle="dark-content" />

      <Image
        source={require("@/assets/images/settingsImage.jpg")}
        style={styles.headerImage}
      />
      <View style={styles.captureContainer}>
        <Text style={styles.capture}>{localization.SETTINGS.HELP.title}</Text>
      </View>
      <View style={styles.sectionContainer}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>{localization.SETTINGS.HELP.company}</Text>
          <Text style={styles.infoValue}>{companyInfo.name}</Text>
        </View>
        <TouchableOpacity onPress={handleEmailPress} style={styles.menuItem}>
          <MaterialCommunityIcons
            name="email-outline"
            size={24}
            color="#B0B0B0"
            style={styles.menuItemIcon}
          />
          <Text style={styles.menuItemText}>{localization.SETTINGS.HELP.support}</Text>
          <Text style={styles.menuItemSubText}>{companyInfo.email}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000ff",
  },
  captureContainer: {
    position: "absolute",
    marginHorizontal: 15, // Side padding for the list
  },
  sectionContainer: {
    padding: 20,
  },
  capture: {
    fontSize: 25,
    color: "white",
    fontWeight: "500",
    paddingVertical: 130,
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
    height: 180,
    opacity: 0.2,
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
