import { View, StyleSheet, Text } from "react-native";

const Loader = () => {
  // Animacija za rotaciju

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
    marginTop: 40,
  },
  loader: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 10,
    borderColor: "gray",
    borderTopColor: "transparent",
  },
  text: {
    marginTop: 20,
    fontSize: 16,
    color: "gray",
  },
});

export default Loader;
