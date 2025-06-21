import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  BackHandler,
  TouchableOpacity,
  Linking,
  Image,
} from "react-native";

const aboutapplication = () => {
   const appName = "Barber Demo";
  const appVersion = "1.0.2"
  const developerName = "FusionTech Agency"; 
  const supportEmail = "support@fta.com"; 
  const privacyPolicyURL = "[Link to your Privacy Policy]"; // IMPORTANT!
  const termsOfServiceURL = "[Link to your Terms of Service]"; // IMPORTANT!

  const navigation = useNavigation();
  const openLink = async (url) => {
    console.log("url",url);
    // try {
    //   const supported = await Linking.canOpenURL(url);
    //   if (supported) {
    //     await Linking.openURL(url);
    //   } else {
    //     alert(`Don't know how to open this URL: ${url}`);
    //   }
    // } catch (error) {
    //   console.error('An error occurred while opening the link:', error);
    //   alert('Could not open the link.');
    // }
  };
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        navigation.navigate("(tabs)", { screen: "settings" });
        return true;
      };
      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [])
  );
  return (
    <ScrollView style={styles.container}>
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

      {supportEmail && (
        <View style={styles.section}>
          <Text style={styles.label}>Support:</Text>
          <TouchableOpacity
            onPress={() => Linking.openURL(`mailto:${supportEmail}`)}
          >
            <Text style={styles.linkText}>{supportEmail}</Text>
          </TouchableOpacity>
        </View>
      )}

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
    color: 'white',
    marginBottom: 30,
    textAlign: "center",
  },
  section: {
    marginBottom: 15,
    display: "flex",
    flexDirection: "row",
    justifyContent: 'space-between'
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: 'white',
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    color: 'white',
    lineHeight: 24,
  },
  linkText: {
    fontSize: 16,
    color: "#007bff",
    textDecorationLine: "underline",
    marginBottom: 5,
  },
  legalSection: {
    marginTop: 30,
    marginBottom: 20,
    alignItems: "center",
  },
  copyright: {
    fontSize: 14,
    color: 'white',
    textAlign: "center",
    marginTop: 20,
  },
  headerImage: {
    width: "100%",
    height: 300,
    opacity: 0.3,
  },
});

export default aboutapplication;
