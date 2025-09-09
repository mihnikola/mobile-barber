import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  StatusBar,
} from "react-native";

const languageSupport = () => {
  return (
    <ScrollView style={styles.container}>
      <StatusBar backgroundColor="black" barStyle="dark-content" />

      <Image
        source={require("@/assets/images/settingsImage.jpg")}
        style={styles.headerImage}
      />
      <View style={styles.captureContainer}>
        <Text style={styles.capture}>Change Language</Text>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1, // Crucial for ScrollView to take full height
    backgroundColor: "black",
  },
  captureContainer: {
    position: "absolute",
    marginHorizontal: 15, // Side padding for the list
  },
  headerImage: {
    width: "100%",
    height: 180,
    opacity: 0.2,
  },
  capture: {
    fontSize: 25,
    color: "white",
    fontWeight: "500",
    paddingVertical: 130,
  },
});

export default languageSupport;
