// HelpSupportScreen.js
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  ScrollView,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useLocalization } from "@/context/LocalizationContext";
import withSafeArea from "@/components/wrapper/WrapperSafeArea";
import { coverSettingsImage } from "@/constants";
import HeaderCoverImageContainer from "@/shared-components/HeaderCoverImageContainer";
import { ColorsBarber } from "@/constants/Colors";

const companyInfo = {
  name: "FusionTech DOO",
  email: "fta@support.com",
};

const HelpSupportScreen = () => {
  const { localization } = useLocalization();
  const handleEmailPress = () => {
    Linking.openURL(`mailto:${companyInfo.email}`);
  };

  return (
    <ScrollView style={styles.container}>
      <HeaderCoverImageContainer
        title={localization.SETTINGS.HELP.title}
        image={coverSettingsImage}
      />
      <View style={styles.sectionContainer}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>
            {localization.SETTINGS.HELP.company}
          </Text>
          <Text style={styles.infoValue}>{companyInfo.name}</Text>
        </View>
        <TouchableOpacity onPress={handleEmailPress} style={styles.menuItem}>
          <MaterialCommunityIcons
            name="email-outline"
            size={24}
            color={ColorsBarber.dark.textColor}
            style={styles.menuItemIcon}
          />
          <Text style={styles.menuItemText}>
            {localization.SETTINGS.HELP.support}
          </Text>
          <Text style={styles.menuItemSubText}>{companyInfo.email}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:  ColorsBarber.dark.background,
  },

  sectionContainer: {
    padding: 20,
  },
  capture: {
    fontSize: 25,
    color: ColorsBarber.dark.textColor,
    fontFamily: "OldStandard-Regular",
    paddingVertical: 130,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: "OldStandard-Bold",
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

  infoLabel: {
    fontSize: 16,
    color: ColorsBarber.dark.textColor,
    fontFamily: "OldStandard-Bold",
  },
  infoValue: {
    fontSize: 16,
    color: ColorsBarber.dark.textColor,
    fontFamily: "OldStandard-Regular",
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
    color: ColorsBarber.dark.textColor,
    fontFamily: "OldStandard-Bold",
  },
  menuItemSubText: {
    fontSize: 14,
    color: ColorsBarber.dark.textColor,
    fontFamily: "OldStandard-Regular",
    marginLeft: "auto", // Pushes the subtext to the right
  },
});

export default withSafeArea(HelpSupportScreen);
