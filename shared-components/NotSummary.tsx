import { ColorsBarber } from "@/constants/Colors";
import { Text, View } from "react-native";

const NotSummary = ({ text }) => {
  return (
    <View style={{  backgroundColor:ColorsBarber.dark.background }}>
      <Text
        style={{
          fontSize: 20,
          color: ColorsBarber.dark.textColor,
          textAlign: "center",
          padding: 20,
          borderRadius: 20,
          backgroundColor:ColorsBarber.dark.background,
          fontFamily: "OldStandard-Regular",
        }}
      >
        {text}
      </Text>
    </View>
  );
};

export default NotSummary;
