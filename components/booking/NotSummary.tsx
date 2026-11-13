import { Text, View } from "react-native";
import { fonts, useTheme } from "@/theme";

const NotSummary = ({ text }) => {
  const { colors } = useTheme();
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
