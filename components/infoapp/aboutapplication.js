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
        resizeMode="cover"
      />

      <View style={styles.section}>
        <Text style={styles.label}>App Name:</Text>
        <Text style={styles.value}>{appName}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Version:</Text>
        <Text style={styles.value}>{appVersion}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Developed by:</Text>
        <Text style={styles.value}>{developerName}</Text>
      </View>
      <View style={styles.section}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Language</Text>
          <Text style={styles.subTitle}>
            {isSerbian ? "Srpski / Serbian" : "English / Engleski"}
          </Text>
        </View>
        <Switch
          onValueChange={toggleSwitch}
          value={isSerbian}
          trackColor={{ false: "#767577", true: "#757080ff" }}
          thumbColor={isSerbian ? "#36a3ceff" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          style={styles.switch}
        />
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "black",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    marginBottom: 30,
    textAlign: "center",
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
    height: 300,
    opacity: 0.3,
  },
  switch: {
    // Platform-specific adjustments if needed
    transform: Platform.OS === "ios" ? [{ scaleX: 0.8 }, { scaleY: 0.8 }] : [],
  },
});

export default aboutapplication;
