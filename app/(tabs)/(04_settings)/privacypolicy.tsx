import { useLocalization } from "@/context/LocalizationContext";
import { View, StyleSheet, ScrollView } from "react-native";
import { coverSettingsImage } from "@/constants";
import HeaderCoverImageContainer from "@/shared-components/HeaderCoverImageContainer";
import { colors, fonts } from "@/theme";
import { AppText, withScreen } from "@/components/ui";

const PrivacyPolicyScreen = () => {
  const developerName = "FusionTech Agency";

  const { localization } = useLocalization();

  return (
    <ScrollView style={styles.container}>
      <HeaderCoverImageContainer
        title={localization.SETTINGS.LEGAL.title}
        image={coverSettingsImage}
      />

      <View style={styles.sectionContainer}>
        <AppText variant="bodyLg" style={styles.paragraph}>
          {localization.SETTINGS.LEGAL.paragraph}
        </AppText>
        <AppText size={25} style={styles.paragraphTitle}>
          {localization.SETTINGS.LEGAL.policyTitle}
        </AppText>
        <AppText variant="bodyLg" style={styles.paragraph}>
          {localization.SETTINGS.LEGAL.policy}
        </AppText>
        <AppText size={25} style={styles.paragraphTitle}>
          {localization.SETTINGS.LEGAL.conditionTitle}
        </AppText>
        <AppText variant="bodyLg" style={styles.paragraph}>
          {localization.SETTINGS.LEGAL.condition}
        </AppText>
        <AppText style={styles.copyright}>
          {localization.SETTINGS.LEGAL.footerBottom} {developerName}
        </AppText>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  sectionContainer: {
    padding: 20,
  },
  captureContainer: {
    marginHorizontal: 15,
  },
  headerImage: {
    width: "100%",
    height: 180,
    opacity: 0.2,
  },
  srbCapture: {
    fontSize: 25,
    color: colors.text,
    fontFamily: fonts.regular,
    paddingVertical: 130,
  },
  engCapture: {
    fontSize: 35,
    color: colors.text,
    fontFamily: fonts.regular,
    paddingVertical: 140,
  },
  text: {
    color: colors.text,
    fontFamily: fonts.regular,

    fontSize: 16,
    lineHeight: 24,
  },
  paragraphTitle: {

    padding: 10,
  },

  paragraph: {
    lineHeight: 24,

    textAlign: "justify",
  },
  copyright: {
    marginBottom: 50,
    marginTop: 20,

    textAlign: "center",
  },
});

export default withScreen(PrivacyPolicyScreen);
