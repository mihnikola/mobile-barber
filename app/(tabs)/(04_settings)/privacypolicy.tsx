import { useLocalization } from "@/context/LocalizationContext";
import { View, Text, StyleSheet, ScrollView, StatusBar } from "react-native";
import SharedTabHeader from "@/shared-components/SharedTabHeader";
import { useCompany } from "@/context/CompanyContext";
import SharedCoverImage from "@/shared-components/SharedCoverImage";
import { router } from "expo-router";
import SharedBackButton from "@/shared-components/SharedBackButton";

const privacypolicy = () => {
  const developerName = "FusionTech Agency";

  const { localization } = useLocalization();
  const { company } = useCompany();

  return (
    <ScrollView style={styles.container}>
      {/* <StatusBar backgroundColor="black" barStyle="dark-content" /> */}
      <SharedBackButton onPress={router.back} />

      {/* <SharedTabHeader
        image={company?.media?.coverImageSettings}
        title={localization.SETTINGS.LEGAL.title}
      /> */}
      <SharedCoverImage image={company?.media?.coverImageSettings} />
      <View style={styles.captureContainer}>
        {localization.code === "en" && (
          <Text style={styles.engCapture}>
            {localization.SETTINGS.LEGAL.title}
          </Text>
        )}
        {localization.code === "sr" && (
          <Text style={styles.srbCapture}>
            {localization.SETTINGS.LEGAL.title}
          </Text>
        )}
      </View>
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
    padding: 10,
  },
  captureContainer: {
    position: "absolute",
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
    padding:10,
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

export default privacypolicy;
