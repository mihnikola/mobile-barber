import { useLocalization } from "@/context/LocalizationContext";
import { View, ScrollView } from "react-native";
import { coverSettingsImage } from "@/constants";
import HeaderCoverImageContainer from "@/components/layout/HeaderCoverImageContainer";
import { fonts, makeStyles } from "@/theme";
import { AppText, withScreen } from "@/components/ui";

const PrivacyPolicyScreen = () => {
  const styles = useStyles();
  const developerName = "FusionTech Agency";

  const { localization } = useLocalization();

  return (
    <ScrollView style={styles.container}>
      <HeaderCoverImageContainer
        title={localization.SETTINGS.LEGAL.title}
        image={coverSettingsImage}
      />

      <View style={styles.sectionContainer}>
        <AppText variant="legacyBodyLg" style={styles.paragraph}>
          {localization.SETTINGS.LEGAL.paragraph}
        </AppText>
        <AppText variant="legacyBody" size={25} style={styles.paragraphTitle}>
          {localization.SETTINGS.LEGAL.policyTitle}
        </AppText>
        <AppText variant="legacyBodyLg" style={styles.paragraph}>
          {localization.SETTINGS.LEGAL.policy}
        </AppText>
        <AppText variant="legacyBody" size={25} style={styles.paragraphTitle}>
          {localization.SETTINGS.LEGAL.conditionTitle}
        </AppText>
        <AppText variant="legacyBodyLg" style={styles.paragraph}>
          {localization.SETTINGS.LEGAL.condition}
        </AppText>
        <AppText variant="legacyBody" style={styles.copyright}>
          {localization.SETTINGS.LEGAL.footerBottom} {developerName}
        </AppText>
      </View>
    </ScrollView>
  );
};
const useStyles = makeStyles((colors) => ({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
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
    color: colors.ink,
    fontFamily: fonts.regular,
    paddingVertical: 130,
  },
  engCapture: {
    fontSize: 35,
    color: colors.ink,
    fontFamily: fonts.regular,
    paddingVertical: 140,
  },
  text: {
    color: colors.ink,
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
}));

export default withScreen(PrivacyPolicyScreen);
