import { Text, View } from "react-native";
import { colors, fonts } from "@/theme";

const NotSummary = ({ text }) => {
  return (
    <View style={{  backgroundColor:colors.background }}>
      <Text
        style={{
          fontSize: 20,
          color: colors.text,
          textAlign: "center",
          padding: 20,
          borderRadius: 20,
          backgroundColor:colors.background,
          fontFamily: fonts.regular,
        }}
      >
        {text}
      </Text>
    </View>
  );
};

export default NotSummary;
