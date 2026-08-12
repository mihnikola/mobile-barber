import { useLocalization } from "@/context/LocalizationContext";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import withSafeArea from "@/components/wrapper/WrapperSafeArea";
import { coverSettingsImage } from "@/constants";
import HeaderCoverImageContainer from "@/shared-components/HeaderCoverImageContainer";

const privacypolicy = () => {
  const developerName = "FusionTech Agency";

  const { localization } = useLocalization();

  return (
    <ScrollView style={styles.container}>
      <HeaderCoverImageContainer
        title={localization.SETTINGS.LEGAL.title}
        image={coverSettingsImage}
      />

      <View style={styles.sectionContainer}>
        <Text style={styles.paragraph}>
          {localization.SETTINGS.LEGAL.paragraph}
        </Text>
        <Text style={styles.paragraphTitle}>
          {localization.SETTINGS.LEGAL.policyTitle}
        </Text>
        <Text style={styles.paragraph}>
          {localization.SETTINGS.LEGAL.policy}
        </Text>
        <Text style={styles.paragraphTitle}>
          {localization.SETTINGS.LEGAL.conditionTitle}
        </Text>
        <Text style={styles.paragraph}>
          {localization.SETTINGS.LEGAL.condition}
        </Text>
        <Text style={styles.copyright}>
          {localization.SETTINGS.LEGAL.footerBottom} {developerName}
        </Text>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
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
    color: "white",
    fontWeight: "500",
    paddingVertical: 130,
  },
  engCapture: {
    fontSize: 35,
    color: "white",
    fontWeight: "500",
    paddingVertical: 140,
  },
  text: {
    color: "white",
    fontSize: 16,
    lineHeight: 24,
  },
  paragraphTitle: {
    fontSize: 25,
    color: "white",
    padding: 10,
  },

  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    color: "white",
    textAlign: "justify",
  },
  copyright: {
    marginBottom: 50,
    marginTop: 20,
    fontSize: 14,
    color: "white",
    textAlign: "center",
  },
});

// export default withSafeArea(privacypolicy);
export default privacypolicy;
