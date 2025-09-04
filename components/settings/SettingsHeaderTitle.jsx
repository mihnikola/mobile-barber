import { StyleSheet } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";

const SettingsHeaderTitle = ({ capture }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>{capture}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#333333",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
});

export default SettingsHeaderTitle;
