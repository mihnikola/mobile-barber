// PrivacyPolicyScreen.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const PrivacyPolicyScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Privacy Policy</Text>
      
      <Text style={styles.paragraph}>
        Your privacy is critically important to us. This Privacy Policy describes
        how your personal information is collected, used, and shared when you
        use our mobile application.
      </Text>
      
      <Text style={styles.subHeading}>Information We Collect</Text>
      <Text style={styles.paragraph}>
        We may collect certain information automatically from your device when
        you use our app. This includes information about your device, such as
        its type and operating system, as well as usage data. We do not
        intentionally collect any personal information that can identify you
        personally.
      </Text>
      
      <Text style={styles.subHeading}>How We Use Your Information</Text>
      <Text style={styles.paragraph}>
        The information we collect is used to analyze trends, administer the
        app, track user movements, and gather broad demographic information for
        aggregate use. We use this information to improve our app and provide a
        better user experience.
      </Text>
      
      <Text style={styles.subHeading}>Information Sharing</Text>
      <Text style={styles.paragraph}>
        We do not sell, trade, or rent your personal identification information
        to others. We may share generic aggregated demographic information not
        linked to any personal identification information regarding visitors and
        users with our business partners and trusted affiliates for the purposes
        outlined above.
      </Text>

      <Text style={styles.subHeading}>Your Consent</Text>
      <Text style={styles.paragraph}>
        By using our app, you consent to our Privacy Policy. If you do not agree
        with this policy, please do not use our app.
      </Text>

      <Text style={styles.subHeading}>Changes to this Policy</Text>
      <Text style={styles.paragraph}>
        We reserve the right to update this Privacy Policy at any time. We will
        notify you of any changes by posting the new Privacy Policy on this
        page. Your continued use of the app following the posting of changes to
        this policy will be deemed your acceptance of those changes.
      </Text>

      <Text style={styles.lastUpdated}>
        Last updated: August 3, 2025
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a', // Match the app's dark theme
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  subHeading: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginTop: 20,
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 16,
    color: '#B0B0B0', // Light gray text for readability
    marginBottom: 15,
    lineHeight: 24,
  },
  lastUpdated: {
    fontSize: 12,
    color: '#767577',
    marginTop: 20,
    marginBottom: 40, // Add some space at the bottom
    textAlign: 'center',
  },
});

export default PrivacyPolicyScreen;