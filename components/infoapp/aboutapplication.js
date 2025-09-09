import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  Switch,
  Platform,
  StatusBar,
} from "react-native";

const aboutapplication = () => {
  const appName = "Barber Demo";
  const appVersion = "1.0.2";
  const developerName = "FusionTech Agency";

  // State to manage the switch's value. 'true' for Serbian, 'false' for English.
  const [isSerbian, setIsSerbian] = useState("en");

  // Use useEffect to update the switch's state if the language changes from outside this component

  const toggleSwitch = () => {
    const newLanguage = isSerbian ? "en" : "sr";
    setIsSerbian(!isSerbian); // Update the local state
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar backgroundColor="black" barStyle="dark-content" />

      <Image
        source={require("@/assets/images/settingsImage.jpg")}
        style={styles.headerImage}
      />
      <View style={styles.captureContainer}>
        <Text style={styles.capture}>About application</Text>
      </View>
      <View style={styles.sectionContainer}>
        <View style={styles.infoRow}>
          <Text style={styles.label}>App Name:</Text>
          <Text style={styles.value}>{appName}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Version:</Text>
          <Text style={styles.value}>{appVersion}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Developed by:</Text>
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
  title: {
    fontSize: 16,
    color: "#FFFFFF",
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

export default aboutapplication;
