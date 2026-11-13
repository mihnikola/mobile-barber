import { router } from "expo-router";
import type { StyleProp, ViewStyle } from "react-native";

import { makeStyles } from "@/theme";

import { Icon } from "./Icon";
import { Pressable } from "./Pressable";

type BackButtonProps = {
  /** Default: `router.back()`. */
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
};

/** Back button (design system `ds-iconbtn`): 40px round, 1.5px `lineStrong` border, chevron-left. */
export function BackButton({ onPress, style, accessibilityLabel = "Back" }: BackButtonProps) {
  const s = useStyles();
  return (
    <Pressable
      hitSlop={8}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      onPress={onPress ?? (() => router.back())}
      style={[s.button, style]}
    >
      <Icon name="back" size={20} color="ink" />
    </Pressable>
  );
}

const useStyles = makeStyles((colors) => ({
  button: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: colors.lineStrong,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-start",
  },
}));
