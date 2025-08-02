// AboutScreen.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Application from "expo-application"; // Or another method to get the app version

const AboutApplication = () => {
  const navigation = useNavigation();

  // Get the app version. This is a common way to do it with Expo.
  // For a bare React Native project, you'd use a different method,
  // often a library like 'react-native-version-info'.
  const appVersion = Application.nativeApplicationVersion || "1.0.0";

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Application Information</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>App Version:</Text>
          <Text style={styles.infoValue}>{appVersion}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Build Number:</Text>
          <Text style={styles.infoValue}>
            {Application.nativeBuildVersion || "1"}
          </Text>
        </View>
      </View>

      <View style={styles.menuContainer}>
        {/* <MenuItem
          iconName="translate"
          title="Change Language"
          onPress={() => navigation.navigate("LanguageSelectionScreen")}
          hasSubItems={true}
        /> */}
        {/* You could add more items here like 'Terms of Service' or 'Credits' */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a",
    padding: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#333333",
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
  menuContainer: {
    // Styles for the menu section
  },
});

export default AboutApplication;
