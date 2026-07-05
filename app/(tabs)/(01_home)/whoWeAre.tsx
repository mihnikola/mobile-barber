import { View, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AboutUsInfo from "@/components/home/AboutUsInfo";
import ListAboutUs from "@/components/home/ListAboutUs";
import ContactUs from "@/components/home/ContactUs";
import OnboardingComponent from "@/components/home/OnboardingComponent";
import WhoAreWeCoverImage from "@/components/home/WhoAreWeCoverImage";
import { useCompany } from "@/context/CompanyContext";
import { useEffect } from "react";
import { SharedLoader } from "@/shared-components/SharedLoader";
import SharedBackButton from "@/shared-components/SharedBackButton";
import { router } from "expo-router";
import withSafeArea from "@/components/wrapper/WrapperSafeArea";

const AboutUsScreen = () => {
  const { company } = useCompany();



  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={{ marginBottom: 30, marginTop: 10 }}>
        <SharedBackButton onPress={router.back} styleBtn={{ top: 1 }} />
      </View>
      <WhoAreWeCoverImage image={company?.media?.logo} />

      <View style={styles.contentContainer}>
        <AboutUsInfo
          title={company?.aboutUs?.title}
          text={company?.aboutUs?.text}
          textThree={company?.aboutUs?.textThree}
          textTwo={company?.aboutUs?.textTwo}
        />

        <ListAboutUs contact={company?.contact} />
      </View>
      <OnboardingComponent reviews={company?.reviews} />

      <View style={styles.contentContainer}>
        <ContactUs
          workDays={company?.aboutUs?.workDays}
          workSaturday={company?.aboutUs?.workSaturday}
          holidays={company?.aboutUs?.holidays}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    backgroundColor: "black",
  },
  contentContainer: {
    paddingHorizontal: 10,
    paddingBottom: 0,
  },
});

export default withSafeArea(AboutUsScreen);
