import { ColorsBarber } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "./TouchableOpacity";

const SharedBackButton = ({ onPress, styleBtn, absolutePosition = true }) => {
  return (
    <TouchableOpacity
      style={[absolutePosition && styles.btnStyle, styleBtn]}
      hitSlop={20}
      onPress={onPress}
    >
      <MaterialIcons name="arrow-back" size={25} color={ColorsBarber.dark.textColor} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnStyle: {
    zIndex: 9999,
    position: "absolute",
    left: 15,
    top: 20,
  },
});

export default SharedBackButton;
