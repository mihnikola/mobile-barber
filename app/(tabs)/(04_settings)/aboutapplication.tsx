import { useLocalization } from "@/context/LocalizationContext";
import { View, Text, ScrollView, StyleSheet, Platform } from "react-native";
import { coverSettingsImage } from "@/constants";
import * as Application from "expo-application";
import HeaderCoverImageContainer from "@/shared-components/HeaderCoverImageContainer";
import { colors, fonts } from "@/theme";
import { withScreen } from "@/components/ui";

const AboutApplicationScreen = () => {
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
          <Text style={styles.label}>
            {localization.SETTINGS.ABOUTAPP.name}
          </Text>
          <Text style={styles.value}>{appName}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>
            {localization.SETTINGS.ABOUTAPP.version}
          </Text>
          <Text style={styles.value}>{appVersion}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>{localization.SETTINGS.ABOUTAPP.dev}</Text>
          <Text style={styles.value}>{developerName}</Text>
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
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
    fontSize: 16,
    fontFamily: fonts.regular,
    color: colors.text,
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    color: colors.text,
    fontFamily: fonts.regular,

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
});

export default withScreen(AboutApplicationScreen);
