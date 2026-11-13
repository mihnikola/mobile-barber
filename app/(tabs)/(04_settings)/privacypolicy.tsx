import { useLocalization } from "@/context/LocalizationContext";
import { View, ScrollView } from "react-native";
import HeaderCoverImageContainer from "@/components/layout/HeaderCoverImageContainer";
import { makeStyles } from "@/theme";
import { AppText, withScreen } from "@/components/ui";

const PrivacyPolicyScreen = () => {
  const styles = useStyles();
  const developerName = "FusionTech Agency";

  const { localization } = useLocalization();

  return (
    <ScrollView style={styles.container}>
      <HeaderCoverImageContainer title={localization.SETTINGS.LEGAL.title} />

      <View style={styles.sectionContainer}>
        <AppText variant="body" color="inkMuted">
          {localization.SETTINGS.LEGAL.paragraph}
        </AppText>
        <AppText variant="title" style={styles.paragraphTitle}>
          {localization.SETTINGS.LEGAL.policyTitle}
        </AppText>
        <AppText variant="body" color="inkMuted">
          {localization.SETTINGS.LEGAL.policy}
        </AppText>
        <AppText variant="title" style={styles.paragraphTitle}>
          {localization.SETTINGS.LEGAL.conditionTitle}
        </AppText>
        <AppText variant="body" color="inkMuted">
          {localization.SETTINGS.LEGAL.condition}
        </AppText>
        <AppText variant="bodySm" color="inkFaint" style={styles.copyright}>
          {localization.SETTINGS.LEGAL.footerBottom} {developerName}
        </AppText>
      </View>
    </ScrollView>
  );
};
const useStyles = makeStyles((colors) => ({
  container: { flex: 1, backgroundColor: colors.bg },
  sectionContainer: { paddingHorizontal: 16, paddingBottom: 32, gap: 12 },
  paragraphTitle: { marginTop: 12 },
  copyright: { marginTop: 12, textAlign: "center" },
}))

export default withScreen(PrivacyPolicyScreen);
