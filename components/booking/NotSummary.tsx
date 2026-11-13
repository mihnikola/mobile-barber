import { View } from "react-native";
import { fonts, useTheme } from "@/theme";
import { AppText } from "@/components/ui";

const NotSummary = ({ text }) => {
  const { colors } = useTheme();
  return (
    <View style={{  backgroundColor:colors.bg }}>
      <AppText
        style={{
          fontSize: 20,
          color: colors.ink,
          textAlign: "center",
          padding: 20,
          borderRadius: 20,
          backgroundColor:colors.bg,
          fontFamily: fonts.sans,
        }}
      >
        {text}
      </AppText>
    </View>
  );
};

export default NotSummary;
