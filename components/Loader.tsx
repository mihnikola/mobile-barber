import { View, StyleSheet, ActivityIndicator, useWindowDimensions } from "react-native";

const Loader = () => {
  const { height } = useWindowDimensions();

  return (
    <View style={[styles.container, { minHeight: height * 0.5 }]}>
      <ActivityIndicator size="large" color="#b9b9b9ff" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",  // Centriranje po vertikali
    alignItems: "center",      // Centriranje po horizontali
    backgroundColor: "#000",
  },
});

export default Loader;