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
  const {
    name,
    contact,
    text,
    title,
    textTwo,
    textThree,
    workDays,
    workSaturday,
    holidays,
    media,
  } = useLocalSearchParams();

  // const {aboutUs} = params.data;
  console.log("company", {
    name,
    contact,
    text,
    title,
    textTwo,
    textThree,
    workDays,
    workSaturday,
    holidays,
    media,
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <WhoAreWeCoverImage image={media} />

        <View style={styles.contentContainer}>
          <AboutUsInfo
            title={title}
            text={text}
            textThree={textThree}
            textTwo={textTwo}
          />
          <ListAboutUs contact={contact} />
        </View>
        <OnboardingComponent />

        <View style={styles.contentContainer}>
          <ContactUs
            workDays={workDays}
            workSaturday={workSaturday}
            holidays={holidays}
          />
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
