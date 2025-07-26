import { View, Image, StyleSheet, ScrollView } from "react-native";

import AboutUsInfo from "../home/AboutUsInfo";
import ListAboutUs from "../home/ListAboutUs";
import OnboardingComponent from "../home/OnboardingComponent";
import ContactUs from "../home/ContactUs";

import { Dimensions } from "react-native";

const { height: screenHeight } = Dimensions.get("window");
const aboutUs = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={{ flex: 1 }}>
        <Image
          source={require("../../../assets/images/logoBaber.png")}
          style={styles.backImage}
        />
      </View>
      <ScrollView style={styles.infoContainer}>
        <AboutUsInfo />
        <ListAboutUs />
        <OnboardingComponent />
        <ContactUs />
      </ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },

  infoContainer: {
    flex: 2,
    position: "absolute",
    height: screenHeight,
  },
  backImage: {
    opacity: 0.2,
  },
});
export default aboutUs;
