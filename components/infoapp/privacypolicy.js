import {
  View,
  Text,
  Image,
  StyleSheet,
  BackHandler,
  ScrollView,
  TouchableOpacity,
  Linking,
  StatusBar,
} from "react-native";
import { useCallback } from "react";
import { useFocusEffect } from "expo-router";

const privacypolicy = () => {
  const supportEmail = "support@fta.com";
  const privacyPolicyURL = "[Link to your Privacy Policy]"; // IMPORTANT!
  const termsOfServiceURL = "[Link to your Terms of Service]"; // IMPORTANT!
  const developerName = "FusionTech Agency"; 

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        return true;
      };
      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [])
  );
  const openLink = async (url) => {
    console.log("url", url);
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        alert(`Don't know how to open this URL: ${url}`);
      }
    } catch (error) {
      console.error('An error occurred while opening the link:', error);
      alert('Could not open the link.');
    }
  };
  return (
    <ScrollView style={styles.container}>
            <StatusBar backgroundColor="black" barStyle="dark-content" />
      
      <Image
        source={require("@/assets/images/settingsImage.jpg")}
        style={styles.headerImage}
        resizeMode="cover"
      />
      <Text style={styles.header}># Privacy Policy for Barber Demo App</Text>
      <Text style={styles.text}>**Last Updated:** June 21, 2025</Text>
      {/* ... the rest of your Privacy Policy text goes here, each section preferably in its own Text component or parsed markdown */}
      <Text style={styles.paragraph}>
        This Privacy Policy describes how FusionTech Agency. We collects, uses,
        and discloses your information in connection with your use of our mobile
        application, Barber App. By using the App, you agree to the collection
        and use of information in accordance with this policy. 1. Information We
        Collect We collect various types of information to provide and improve
        our App and its features. 1.1. Information You Provide Directly to Us
        When you use our App, you may provide us with certain personal
        information, including but not limited to: Account Information: Your
        name, email address, username, password, and other registration details.
        Profile Information: Profile picture, biography, preferences, or other
        details you choose to add to your profile. Communications: Information
        you provide when you contact us for support, send us feedback, or
        participate in surveys. User Content: Any content you create, upload, or
        share within the App (e.g., photos, videos, text, comments, task
        descriptions, messages). 1.2. Information We Collect Automatically When
        you access and use the App, we may automatically collect certain
        information about your device and your usage patterns, including: Device
        Information: Device model, operating system version, unique device
        identifiers (e.g., UDID, advertising ID), mobile network information.
        Usage Data: Information about how you interact with the App, such as
        features accessed, screens viewed, time spent on features, crashes, and
        other performance data. Log Data: Server logs may include your device's
        IP address, access dates and times, app features or pages viewed, and
        other system activity. Location Information: Precise Location: With your
        explicit permission, we may collect precise location data from your
        device's GPS, Wi-Fi, or cellular network. This is used for [e.g.,
        location-based services, showing nearby content, providing navigation].
        You can disable this in your device settings. Approximate Location: We
        may infer your approximate location from your IP address or device
        settings. Analytics Information: We may use third-party analytics tools
        (e.g., Google Analytics for Firebase, Mixpanel) to help us measure
        traffic and usage trends for the App. These tools collect information
        sent by your device, including the pages you visit and other information
        that assists us in improving the App. 1.3. Information from Third-Party
        Services (if applicable) If you link, connect, or log in to the App
        using a third-party service (e.g., Google, Facebook), the third-party
        service may send us information such as your registration and profile
        information from that service. The information we receive depends on
        your privacy settings with the third-party service. [List specific
        third-party services, e.g., Google Sign-In, Facebook Login] 2. How We
        Use Your Information We use the information we collect for various
        purposes, including: To Provide and Maintain the App: To operate,
        deliver, maintain, and improve the functionality of the App. To
        Personalize Your Experience: To tailor content, features, and
        advertisements to your interests. To Process Transactions: If the App
        involves purchases or payments. To Send Notifications: To send push
        notifications, alerts, and other messages relevant to your use of the
        App (e.g., task reminders, chat messages). For Communication: To respond
        to your inquiries, provide customer support, and send you important
        updates or announcements. For Analytics and Research: To understand how
        users interact with our App, analyze trends, and perform research to
        improve our services and features. For Security and Fraud Prevention: To
        protect the security and integrity of the App, prevent fraudulent
        activities, and enforce our terms of service. For Legal Compliance: To
        comply with legal obligations, resolve disputes, and enforce our
        agreements. 3. How We Share Your Information We may share your
        information in the following ways: With Service Providers: We engage
        third-party companies and individuals to facilitate our App and
        services, provide App-related services (e.g., hosting, maintenance,
        analytics, push notifications), or assist us in analyzing how our App is
        used. These third parties have access to your information only to
        perform these tasks on our behalf and are obligated not to disclose or
        use it for any other purpose. [List examples of types of service
        providers, e.g., cloud hosting providers, analytics providers, push
        notification services (like Expo, Firebase)] With Other Users (if
        applicable): If the App has social or collaborative features, your
        profile information and user-generated content may be visible to other
        users. For example, in a [e.g., social network, task management, chat
        app], your username and shared content may be public. For Business
        Transfers: In connection with, or during negotiations of, any merger,
        sale of company assets, financing, or acquisition of all or a portion of
        our business by another company. For Legal Reasons: If required to do so
        by law or in response to valid requests by public authorities (e.g., a
        court order or government agency). With Your Consent: We may disclose
        your personal information for any other purpose with your consent.
        Aggregated or Anonymized Data: We may share aggregated or de-identified
        information that cannot reasonably be used to identify you. 4. Data
        Retention We retain your personal information only for as long as is
        necessary for the purposes set out in this Privacy Policy, or as
        required by law (e.g., for tax, accounting, or other legal
        requirements). When we have no ongoing legitimate business need to
        process your personal information, we will either delete or anonymize it
        or, if this is not possible (for example, because your personal
        information has been stored in backup archives), then we will securely
        store your personal information and isolate it from any further
        processing until deletion is possible. 5. Your Rights Depending on your
        jurisdiction, you may have certain rights regarding your personal
        information, including: Access: The right to request a copy of the
        personal information we hold about you. Rectification: The right to
        request that we correct any inaccurate or incomplete personal
        information. Erasure: The right to request that we delete your personal
        information, under certain conditions. Restriction of Processing: The
        right to request that we restrict the processing of your personal
        information, under certain conditions. Object to Processing: The right
        to object to our processing of your personal information, under certain
        conditions. Data Portability: The right to request that we transfer the
        data that we have collected to another organization, or directly to you,
        under certain conditions. Withdraw Consent: Where we rely on your
        consent to process your personal information, you have the right to
        withdraw that consent at any time. To exercise any of these rights,
        please contact us using the contact details provided in Section 7. 6.
        Security of Your Information The security of your personal information
        is important to us. We implement reasonable security measures designed
        to protect your information from unauthorized access, use, alteration,
        and disclosure. However, no method of transmission over the Internet or
        method of electronic storage is 100% secure. Therefore, while we strive
        to use commercially acceptable means to protect your personal
        information, we cannot guarantee its absolute security. 7. Children's
        Privacy Our App is not intended for use by children under the age of
        [e.g., 13 or local legal age]. We do not knowingly collect personally
        identifiable information from anyone under the age of [e.g., 13 or local
        legal age]. If you are a parent or guardian and you are aware that your
        child has provided us with personal information, please contact us. If
        we become aware that we have collected personal information from a child
        without verification of parental consent, we take steps to remove that
        information from our servers. 8. Changes to This Privacy Policy We may
        update our Privacy Policy from time to time. We will notify you of any
        changes by posting the new Privacy Policy on this page and updating the
        "Last Updated" date at the top of this Privacy Policy. You are advised
        to review this Privacy Policy periodically for any changes. Changes to
        this Privacy Policy are effective when they are posted on this page. 9.
        Contact Us If you have any questions about this Privacy Policy.
      </Text>
      {/* ... Continue with other sections ... */}
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
    flex: 1, // Crucial for ScrollView to take full height
    backgroundColor: "black",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white",
  },
  text: {
    color: "white",

    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 10,
  },
    linkText: {
    fontSize: 16,
    color: "#007bff",
    textDecorationLine: "underline",
    marginBottom: 5,
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
  legalSection: {
    marginTop: 30,
    marginBottom: 20,
    alignItems: "center",
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 15,
    color: "white",
  },
  headerImage: {
    width: "100%",
    height: 300,
    opacity: 0.3,
  },
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

  copyright: {
    fontSize: 14,
    color: 'white',
    textAlign: "center",
    marginTop: 20,
    marginBottom: 50
  },
  headerImage: {
    width: "100%",
    height: 300,
    opacity: 0.3,
  },
});

export default privacypolicy;
