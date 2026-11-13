import { StyleSheet } from "react-native";
import { TouchableOpacity } from "./TouchableOpacity";
import { Icon } from "@/components/ui";

const SharedBackButton = ({ onPress, styleBtn, absolutePosition = true }) => {
  return (
    <TouchableOpacity
      style={[absolutePosition && styles.btnStyle, styleBtn]}
      hitSlop={20}
      onPress={onPress}
    >
      <Icon name="back" size={25} />
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
