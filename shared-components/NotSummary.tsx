import { Text, View } from "react-native";

const NotSummary = ({text}) => {
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
       {text}
      </Text>
    </View>
  );
};

export default NotSummary;
