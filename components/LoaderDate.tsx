import { View, StyleSheet, ActivityIndicator } from "react-native";

const LoaderDate = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#b9b9b9ff" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black"
  },
});

export default LoaderDate;
