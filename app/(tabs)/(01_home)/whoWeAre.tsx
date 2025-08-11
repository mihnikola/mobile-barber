import {
  View,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AboutUsInfo from "@/components/home/AboutUsInfo";
import ListAboutUs from "@/components/home/ListAboutUs";
import ContactUs from "@/components/home/ContactUs";
import OnboardingComponent from "@/components/home/OnboardingComponent";

const AboutUsScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Image
          source={require("@/assets/images/logoBaber.png")}
          style={styles.backImage}
        />

        <View style={styles.contentContainer}>
          <AboutUsInfo />
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
 backImage: {
    width: "100%",
    resizeMode: "contain",
    opacity: 0.2,
    marginBottom: 20,
    position: "absolute",
  },
});

export default AboutUsScreen;
