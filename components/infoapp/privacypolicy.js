import { PRIVACY_DATA } from "@/constants";
import { useLocalization } from "@/context/LocalizationContext";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  StatusBar,
} from "react-native";

const privacypolicy = () => {
  const supportEmail = "support@fta.com";
  const privacyPolicyURL = "[Link to your Privacy Policy]"; // IMPORTANT!
  const termsOfServiceURL = "[Link to your Terms of Service]"; // IMPORTANT!
  const developerName = "FusionTech Agency";

  const {localization} = useLocalization();

  const openLink = async (url) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        alert(`Don't know how to open this URL: ${url}`);
      }
    } catch (error) {
      console.error("An error occurred while opening the link:", error);
      alert("Could not open the link.");
    }
  };
  return (
    <ScrollView style={styles.container}>
      <StatusBar backgroundColor="black" barStyle="dark-content" />

      <Image
        source={require("@/assets/images/settingsImage.jpg")}
        style={styles.headerImage}
      />
      <View style={styles.captureContainer}>
        <Text style={styles.capture}>{localization.SETTINGS.LEGAL.title}</Text>
      </View>
      <View style={styles.sectionContainer}>
        <Text style={styles.text}>{localization.SETTINGS.LEGAL.update}</Text>
        <Text style={styles.paragraph}>{localization.SETTINGS.LEGAL.paragraph}</Text>
        <View style={styles.section}>
          <Text style={styles.label}>Support:</Text>
          <TouchableOpacity
            onPress={() => Linking.openURL(`mailto:${supportEmail}`)}
          >
            <Text style={styles.linkText}>{supportEmail}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.legalSection}>
          <TouchableOpacity onPress={() => openLink(privacyPolicyURL)}>
            <Text style={styles.linkText}>Privacy Policy</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openLink(termsOfServiceURL)}>
            <Text style={styles.linkText}>Terms of Service</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.copyright}>
          © 2025 {developerName}. All rights reserved.
        </Text>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1, // Crucial for ScrollView to take full height
    backgroundColor: "black",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white",
  },
  sectionContainer: {
    padding: 20,
  },
  captureContainer: {
    position: "absolute",
    marginHorizontal: 15, // Side padding for the list
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
  linkText: {
    fontSize: 16,
    color: "#007bff",
    textDecorationLine: "underline",
    marginBottom: 5,
  },
  section: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
    marginBottom: 5,
  },
  legalSection: {
    marginTop: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    color: "white",
    textAlign: "justify",
  },
  headerImage: {
    width: "100%",
    height: 180,
    opacity: 0.2,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    marginBottom: 30,
    textAlign: "center",
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
  },
});

export default privacypolicy;
