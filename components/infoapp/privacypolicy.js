import { useLocalization } from "@/context/LocalizationContext";
import SharedCoverImage from "@/shared-components/SharedCoverImage";
import { View, Text, StyleSheet, ScrollView, StatusBar } from "react-native";
import useCompany from "../home/hooks/useCompany";
import { useEffect } from "react";
import SharedTabHeader from "@/shared-components/SharedTabHeader";

const privacypolicy = () => {
  const developerName = "FusionTech Agency";

  const { localization } = useLocalization();
  const { company, getCompany } = useCompany();

  useEffect(() => {
    getCompany();
  }, []);
  return (
    <ScrollView style={styles.container}>
      <StatusBar backgroundColor="black" barStyle="dark-content" />

      <SharedTabHeader
        image={company?.media?.coverImageSettings}
        title={localization.SETTINGS.LEGAL.title}
      />
      <View style={styles.sectionContainer}>
        <Text style={styles.text}>{localization.SETTINGS.LEGAL.update}</Text>
        <Text style={styles.paragraph}>
          {localization.SETTINGS.LEGAL.paragraph}
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
    position: "absolute",
    marginHorizontal: 15,
  },
  headerImage: {
    width: "100%",
    height: 180,
    opacity: 0.2,
  },
  capture: {
    fontSize: 25,
    color: "white",
    fontWeight: "500",
    paddingVertical: 130,
  },
  text: {
    color: "white",
    fontSize: 16,
    lineHeight: 24,
  },

  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    color: "white",
    textAlign: "justify",
  },
  copyright: {
    marginBottom: 50,
    fontSize: 14,
    color: "white",
    textAlign: "center",
  },
});

export default privacypolicy;
