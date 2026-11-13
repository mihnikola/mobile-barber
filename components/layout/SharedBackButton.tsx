import { StyleSheet } from "react-native";
import { Icon, Pressable } from "@/components/ui";

const SharedBackButton = ({ onPress, styleBtn, absolutePosition = true }) => {
  return (
    <Pressable
      style={[absolutePosition && styles.btnStyle, styleBtn]}
      hitSlop={20}
      onPress={onPress}
    >
      <Icon name="back" size="md" color="ink" />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  btnStyle: {
    zIndex: 9999,
    position: "absolute",
    left: 16,
    top: 16,
  },
});

export default SharedBackButton;
