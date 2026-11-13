import type { ReactNode } from "react";
import {
  ActivityIndicator,
  Image,
  type ImageSourcePropType,
  type StyleProp,
  StyleSheet,
  Text,
  type ViewStyle,
} from "react-native";

import { colors, fonts, fontSize } from "@/theme";

import { Pressable } from "./Pressable";

export type ButtonVariant =
  /** Black, white outline, bold 18 — main call to action (was SharedButton). */
  | "primary"
  /** Black, white outline, image + regular 16, shadow (was CustomGoogleButton). */
  | "socialDark"
  /** White, black text, image + regular 16, shadow (was CustomAppleButton). */
  | "socialLight";

export type ButtonProps = {
  title: ReactNode;
  onPress?: () => void;
  variant?: ButtonVariant;
  loading?: boolean;
  disabled?: boolean;
  /** Image shown left of the title (social buttons). */
  image?: ImageSourcePropType;
  /** Outer style — use for margins/positioning only. */
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

/** The only button component screens should use. Shows a spinner and blocks presses while `loading`. */
export function Button({
  title,
  onPress,
  variant = "primary",
  loading = false,
  disabled = false,
  image,
  style,
  testID,
}: ButtonProps) {
  const v = VARIANTS[variant];
  return (
    <Pressable
      testID={testID}
      style={[v.container, disabled && v.containerDisabled, style]}
      disabled={loading || disabled}
      onPress={onPress}
    >
      {loading ? (
        <ActivityIndicator size={v.spinnerSize} color={v.spinnerColor} />
      ) : (
        <>
          {image && <Image source={image} style={styles.image} resizeMode="contain" />}
          <Text style={[v.text, disabled && v.textDisabled]}>{title}</Text>
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  image: { width: 20, height: 20, marginRight: 10 },
  primary: {
    backgroundColor: colors.black,
    paddingVertical: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 50,
  },
  primaryDisabled: {
    borderColor: colors.textInactive,
    backgroundColor: colors.disabled,
  },
  primaryText: { color: colors.text, fontSize: fontSize.lg, fontFamily: fonts.bold },
  primaryTextDisabled: { color: colors.textDeactivated },
  social: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    paddingHorizontal: 24,
    borderRadius: 8,
    elevation: 3,
    shadowColor: colors.background,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    minWidth: 220,
  },
  socialDark: { backgroundColor: colors.black, borderWidth: 1, borderColor: colors.white },
  socialLight: { backgroundColor: colors.white },
  socialTextDark: { color: colors.text, fontSize: fontSize.md, fontFamily: fonts.regular },
  socialTextLight: { color: colors.textOnLight, fontSize: fontSize.md, fontFamily: fonts.regular },
});

const VARIANTS = {
  primary: {
    container: styles.primary,
    containerDisabled: styles.primaryDisabled,
    text: styles.primaryText,
    textDisabled: styles.primaryTextDisabled,
    spinnerSize: 25,
    spinnerColor: colors.text,
  },
  socialDark: {
    container: [styles.social, styles.socialDark],
    containerDisabled: undefined,
    text: styles.socialTextDark,
    textDisabled: undefined,
    spinnerSize: 22,
    spinnerColor: colors.text,
  },
  socialLight: {
    container: [styles.social, styles.socialLight],
    containerDisabled: undefined,
    text: styles.socialTextLight,
    textDisabled: undefined,
    spinnerSize: 22,
    spinnerColor: colors.textOnLight,
  },
} as const;
