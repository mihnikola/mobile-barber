// HelpSupportScreen.js
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Linking,
  ScrollView,
} from "react-native";
import { useLocalization } from "@/context/LocalizationContext";
import withSafeArea from "@/components/wrapper/WrapperSafeArea";
import { coverSettingsImage } from "@/constants";
import HeaderCoverImageContainer from "@/shared-components/HeaderCoverImageContainer";
import { ColorsBarber } from "@/constants/Colors";
import { TouchableOpacity } from "@/shared-components/TouchableOpacity";
import { colors, fonts } from "@/theme";
import { Icon } from "@/components/ui";

const companyInfo = {
  name: "FusionTechAgency Ltd",
  email: "fusiontechagency.support@gmail.com",
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
          <Icon name="email" size={24} style={styles.menuItemIcon} color="text" />
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
    fontFamily: fonts.regular,
    paddingVertical: 130,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: fonts.bold,
    color: colors.text,
    marginBottom: 20,
  },
  infoRow: {
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
    marginBottom: 20,
  },

  infoLabel: {
    fontSize: 16,
    color: ColorsBarber.dark.textColor,
    fontFamily: fonts.bold,
  },
  infoValue: {
    fontSize: 16,
    color: ColorsBarber.dark.textColor,
    fontFamily: fonts.regular,
  },
  menuItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  menuItemIcon: {
    marginRight: 15,
  },
  menuItemText: {
    flex: 1,
    fontSize: 16,
    color: ColorsBarber.dark.textColor,
    fontFamily: fonts.bold,
  },
  menuItemSubText: {
    fontSize: 14,
    color: ColorsBarber.dark.textColor,
    fontFamily: fonts.regular,
  },
});

export default withSafeArea(HelpSupportScreen);
