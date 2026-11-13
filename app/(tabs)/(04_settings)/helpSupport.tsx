// HelpSupportScreen.js
import React from "react";
import {
  View,
  Linking,
  ScrollView,
} from "react-native";
import { useLocalization } from "@/context/LocalizationContext";
import { coverSettingsImage } from "@/constants";
import HeaderCoverImageContainer from "@/components/layout/HeaderCoverImageContainer";
import { fonts, makeStyles } from "@/theme";
import { AppText, Icon, Pressable, withScreen } from "@/components/ui";

const companyInfo = {
  name: "FusionTechAgency Ltd",
  email: "fusiontechagency.support@gmail.com",
};

const HelpSupportScreen = () => {
  const styles = useStyles();
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
          <AppText variant="bodyStrong">
            {localization.SETTINGS.HELP.company}
          </AppText>
          <AppText variant="body">{companyInfo.name}</AppText>
        </View>
        <Pressable onPress={handleEmailPress} style={styles.menuItem}>
          <Icon name="email" size={24} style={styles.menuItemIcon} color="ink" />
          <AppText variant="bodyStrong" style={styles.menuItemText}>
            {localization.SETTINGS.HELP.support}
          </AppText>
          <AppText variant="bodySm">{companyInfo.email}</AppText>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const useStyles = makeStyles((colors) => ({
  container: {
    flex: 1,
    backgroundColor:  colors.bg,
  },

  sectionContainer: {
    padding: 20,
  },
  capture: {
    fontSize: 25,
    color: colors.ink,
    fontFamily: fonts.displaySemiBold,
    paddingVertical: 130,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: fonts.sansSemiBold,
    color: colors.ink,
    marginBottom: 20,
  },
  infoRow: {
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
    marginBottom: 20,
  },

  menuItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
  },
  menuItemIcon: {
    marginRight: 15,
  },
  menuItemText: {
    flex: 1,
  },
}));

export default withScreen(HelpSupportScreen);
