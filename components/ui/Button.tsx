import type { ReactNode } from "react";
import { ActivityIndicator, Image, type ImageSourcePropType, type StyleProp, Text, type ViewStyle } from "react-native";

import { fonts, makeStyles, radii, useTheme } from "@/theme";

import { Pressable } from "./Pressable";

export type ButtonVariant =
  /** Fill `primary`, text `onPrimary` — the one main action of a screen. */
  | "primary"
  /** Outline `lineStrong`, text `ink` — an alternative of equal weight. */
  | "secondary"
  /** No fill/outline — minor actions (skip, cancel in dialogs). */
  | "ghost"
  /** Outline + text `danger` — cancel appointment, delete account. */
  | "danger"
  /** Social sign-in (secondary look + logo image). */
  | "socialDark"
  | "socialLight";

export type ButtonProps = {
  title: ReactNode;
  onPress?: () => void;
  variant?: ButtonVariant;
  /** `sm` = 36px high, for inline actions. */
  size?: "md" | "sm";
  loading?: boolean;
  disabled?: boolean;
  /** Image shown left of the title (social buttons). */
  image?: ImageSourcePropType;
  /** Outer style — use for margins/positioning only. */
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

/**
 * Design-system button (Gentleman Barber DS `ds-btn`): 52px, radius 8, uppercase with tracking.
 * Shows a spinner and blocks presses while `loading`.
 */
export function Button({
  title,
  onPress,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  image,
  style,
  testID,
}: ButtonProps) {
  const s = useStyles();
  const { colors } = useTheme();
  const kind = variant === "socialDark" || variant === "socialLight" ? "secondary" : variant;
  const off = disabled && !loading;
  const textColor = off ? colors.inkFaint : kind === "primary" ? colors.onPrimary : kind === "danger" ? colors.danger : colors.ink;

  return (
    <Pressable
      testID={testID}
      onPress={onPress}
      disabled={loading || disabled}
      style={[s.base, size === "sm" && s.sm, s[kind], off && s.disabled, style]}
    >
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <>
          {image && <Image source={image} style={s.image} resizeMode="contain" />}
          <Text style={[s.text, size === "sm" && s.textSm, { color: textColor }]}>{title}</Text>
        </>
      )}
    </Pressable>
  );
}

const useStyles = makeStyles((colors) => ({
  base: {
    minHeight: 52,
    paddingHorizontal: 20,
    borderRadius: radii.button,
    borderWidth: 1.5,
    borderColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  sm: { minHeight: 36, paddingHorizontal: 16 },
  primary: { backgroundColor: colors.primary },
  secondary: { backgroundColor: "transparent", borderColor: colors.lineStrong },
  ghost: { backgroundColor: "transparent", minHeight: 44, paddingHorizontal: 12 },
  danger: { backgroundColor: "transparent", borderColor: colors.danger },
  disabled: { backgroundColor: colors.surfaceSunken, borderColor: "transparent" },
  text: {
    fontFamily: fonts.sansSemiBold,
    fontSize: 15,
    lineHeight: 20,
    letterSpacing: 0.9,
    textTransform: "uppercase",
  },
  textSm: { fontSize: 14 },
  image: { width: 20, height: 20 },
}));
