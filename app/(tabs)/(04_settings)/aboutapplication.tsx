import { useLocalization } from "@/context/LocalizationContext";
import SharedCoverImage from "@/shared-components/SharedCoverImage";
import { View, Text, ScrollView, StyleSheet, Platform } from "react-native";
import { router } from "expo-router";
import SharedBackButton from "@/shared-components/SharedBackButton";
import SharedTitle from "@/shared-components/SharedTitle";
import withSafeArea from "@/components/wrapper/WrapperSafeArea";
import { coverSettingsImage } from "@/constants";
import * as Application from "expo-application";

const aboutapplication = () => {
  const appName = "Barber Demo";
  const developerName = "Munja Trans";
  const appVersion = Application.nativeApplicationVersion;

  const { localization } = useLocalization();

  return (
    <ScrollView style={styles.container}>
      <SharedBackButton onPress={router.back} />
      <SharedCoverImage image={coverSettingsImage} />
      <SharedTitle title={localization.SETTINGS.ABOUTAPP.title} />
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
    backgroundColor: "black",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    marginBottom: 30,
    textAlign: "center",
  },
  sectionContainer: {
    padding: 20,
  },
  captureContainer: {
    position: "absolute",
    marginHorizontal: 15, // Side padding for the list
  },
  capture: {
    fontSize: 25,
    color: "white",
    fontWeight: "500",
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
    color: "#B0B0B0",
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
    borderBottomColor: "#333333",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    color: "white",
    lineHeight: 24,
  },

  copyright: {
    fontSize: 14,
    color: "white",
    textAlign: "center",
    marginTop: 20,
  },
  headerImage: {
    width: "100%",
    height: 180,
    opacity: 0.2,
  },
  switch: {
    // Platform-specific adjustments if needed
    transform: Platform.OS === "ios" ? [{ scaleX: 0.8 }, { scaleY: 0.8 }] : [],
  },
});

export default withSafeArea(aboutapplication);
