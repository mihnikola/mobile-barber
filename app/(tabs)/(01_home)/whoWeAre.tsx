import { View, Image, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AboutUsInfo from "@/components/home/AboutUsInfo";
import ListAboutUs from "@/components/home/ListAboutUs";
import ContactUs from "@/components/home/ContactUs";
import OnboardingComponent from "@/components/home/OnboardingComponent";
import { useLocalSearchParams } from "expo-router";
import WhoAreWeCoverImage from "@/components/home/WhoAreWeCoverImage";
import useCompany from "@/components/home/hooks/useCompany";
import { useEffect } from "react";

const AboutUsScreen = () => {
  const { company, getCompany } = useCompany();

  useEffect(() => {
    getCompany();
  }, []);

  const {aboutUs} = company;
  const {title, text, textThree, textTwo} = aboutUs;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <WhoAreWeCoverImage image={company?.media?.logo} />

        <View style={styles.contentContainer}>
          <AboutUsInfo title={title} text={text} textThree={textThree} textTwo={textTwo}/>
          <ListAboutUs />
        </View>
        <OnboardingComponent />
        <View style={styles.contentContainer}>
          <ContactUs />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "black",
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  contentContainer: {
    paddingHorizontal: 10,
    paddingBottom: 0,
  },
});

export default AboutUsScreen;
