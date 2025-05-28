import { Text, View } from "react-native";

const NotSummary = () => {
  return (
    <View style={{ borderWidth: 20 }}>
      <Text
        style={{
          fontSize: 20,
          color: "white",
          textAlign: "center",
          padding: 20,
          borderRadius: 20,
        }}
      >
       No appointments for the chosen date
      </Text>
    </View>
  );
};

export default NotSummary;
