import { View, Text, Image, StyleSheet, ScrollView } from "react-native";

import { MAIN_DATA } from "@/constants";
import AboutUsInfo from "../home/AboutUsInfo";
import ListAboutUs from "../home/ListAboutUs";

const aboutUs = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={{ flex: 1, marginVertical: 100 }}>
        <Image
          source={require("../../../assets/images/logoBaber.png")}
          style={styles.backImage}
        />
      </View>
      <View style={styles.infoContainer}>
        <AboutUsInfo />
        <ListAboutUs />
      </View>
    </ScrollView>
  );
};

// Stylesheet for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  content: {
    flex: 3,
    backgroundColor: "white"
  },
  infoContainer: {
    marginVertical:140,
    flex: 2,
    position: "absolute",
  },
  backImage: {
    opacity: 0.2,
  },
});
export default aboutUs;
