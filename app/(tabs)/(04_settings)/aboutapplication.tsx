import { useLocalization } from "@/context/LocalizationContext";
import { View, ScrollView, Platform } from "react-native";
import { coverSettingsImage } from "@/constants";
import * as Application from "expo-application";
import HeaderCoverImageContainer from "@/components/layout/HeaderCoverImageContainer";
import { fonts, makeStyles } from "@/theme";
import { AppText, withScreen } from "@/components/ui";

const AboutApplicationScreen = () => {
  const styles = useStyles();
  const appName = "Book Hair";
  const developerName = "FTA DOO";
  const appVersion = Application.nativeApplicationVersion;

  const { localization } = useLocalization();

  return (
    <ScrollView style={styles.container}>
      <HeaderCoverImageContainer
        title={localization.SETTINGS.ABOUTAPP.title}
        image={coverSettingsImage}
      />
      <View style={styles.sectionContainer}>
        <View style={styles.infoRow}>
          <AppText variant="bodyLg" style={styles.label}>
            {localization.SETTINGS.ABOUTAPP.name}
          </AppText>
          <AppText variant="bodyLg" style={styles.value}>{appName}</AppText>
        </View>

        <View style={styles.infoRow}>
          <AppText variant="bodyLg" style={styles.label}>
            {localization.SETTINGS.ABOUTAPP.version}
          </AppText>
          <AppText variant="bodyLg" style={styles.value}>{appVersion}</AppText>
        </View>

        <View style={styles.infoRow}>
          <AppText variant="bodyLg" style={styles.label}>{localization.SETTINGS.ABOUTAPP.dev}</AppText>
          <AppText variant="bodyLg" style={styles.value}>{developerName}</AppText>
        </View>
      </View>
    </ScrollView>
  );
};
const useStyles = makeStyles((colors) => ({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 28,
    fontFamily: fonts.bold,
    color: colors.text,
    marginBottom: 30,
    textAlign: "center",
  },
  sectionContainer: {
    padding: 20,
  },

  capture: {
    fontSize: 25,
    color: colors.text,
    fontFamily: fonts.regular,
    paddingVertical: 130,
  },
  icon: {
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  subTitle: {
    fontSize: 12,
    color: colors.textTertiary,
    marginTop: 2,
  },
  section: {
    marginBottom: 15,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
    marginBottom: 20,
  },
  label: {
    marginBottom: 5,
  },
  value: {

    lineHeight: 24,
  },

  copyright: {
    fontSize: 14,
    color: colors.text,
    textAlign: "center",
    marginTop: 20,
  },
  headerImage: {
    width: "100%",
    height: 180,
    opacity: 0.2,
  },
  switch: {
    transform: Platform.OS === "ios" ? [{ scaleX: 0.8 }, { scaleY: 0.8 }] : [],
  },
}));

export default withScreen(AboutApplicationScreen);
