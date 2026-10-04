import { ColorsBarber } from "@/constants/Colors";
import { View, StyleSheet, ActivityIndicator } from "react-native";

const LoaderDate = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={ColorsBarber.dark.textColor} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: ColorsBarber.dark.background
  },
});

export default LoaderDate;
