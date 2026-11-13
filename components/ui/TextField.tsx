import { type ComponentRef, forwardRef, type ReactNode, useState } from "react";
import {
  Image,
  type StyleProp,
  Text,
  TextInput,
  type TextInputProps,
  type TextStyle,
  View,
  type ViewStyle,
} from "react-native";

import { fonts, makeStyles, useTheme } from "@/theme";

import { Icon } from "./Icon";
import { Pressable } from "./Pressable";

/** Instance type of RN TextInput (for refs). */
export type TextInputRef = ComponentRef<typeof TextInput>;

/** Style slots a field can override. */
export type FieldStyles = {
  label?: StyleProp<TextStyle>;
  container?: StyleProp<ViewStyle>;
  containerFocused?: StyleProp<ViewStyle>;
  input?: StyleProp<TextStyle>;
  inputFocused?: StyleProp<TextStyle>;
  error?: StyleProp<TextStyle>;
};

export type TextFieldProps = Omit<TextInputProps, "style"> & {
  label?: ReactNode;
  /** Shown under the field when truthy. */
  error?: ReactNode;
  /** Rendered before the input inside the box (e.g. flag). */
  left?: ReactNode;
  /** Rendered right before the input on the same inner row (e.g. "+381"). */
  prefix?: ReactNode;
  /** Rendered after the input inside the box (e.g. password eye). */
  right?: ReactNode;
  /** Per-slot style overrides. */
  styles?: FieldStyles;
  /**
   * Skip the default look and use only `styles` (legacy wrappers that must stay pixel-identical
   * until Phase 5).
   */
  unstyled?: boolean;
  /** Show `error` even when the field is empty (default: only once something was typed). */
  alwaysShowError?: boolean;
};

/**
 * Labelled text input (design system `ds-field` / `ds-input`): label above, 48px box with a
 * 1.5px `lineStrong` border, 2px `focus` border while focused, error text below.
 */
export const TextField = forwardRef<TextInputRef, TextFieldProps>(function TextField(
  { label, error, left, prefix, right, styles: s = {}, unstyled = false, alwaysShowError = false, onFocus, onBlur, ...inputProps },
  ref,
) {
  const { colors } = useTheme();
  const defaults = useDefaults();
  const [focused, setFocused] = useState(false);
  const d = unstyled ? EMPTY : defaults;

  const input = (
    <TextInput
      placeholderTextColor={colors.inkFaint}
      {...inputProps}
      ref={ref}
      style={[d.input, s.input, focused && [d.inputFocused, s.inputFocused]]}
      onFocus={(e) => {
        setFocused(true);
        onFocus?.(e);
      }}
      onBlur={(e) => {
        setFocused(false);
        onBlur?.(e);
      }}
    />
  );

  return (
    <>
      {label != null && <Text style={[d.label, s.label]}>{label}</Text>}
      <View style={[d.container, s.container, focused && [d.containerFocused, s.containerFocused]]}>
        {left}
        {prefix ? (
          <View style={[rowCenter, !unstyled && fill]}>
            {prefix}
            {input}
          </View>
        ) : (
          input
        )}
        {right}
      </View>
      {error && (alwaysShowError || (inputProps.value ?? "") !== "") ? <Text style={[d.error, s.error]}>{error}</Text> : null}
    </>
  );
});

/** TextField with a show/hide eye toggle. */
export const PasswordField = forwardRef<TextInputRef, TextFieldProps>(function PasswordField(props, ref) {
  const [visible, setVisible] = useState(false);
  return (
    <TextField
      {...props}
      ref={ref}
      secureTextEntry={!visible}
      right={
        <Pressable style={toggleStyle} onPress={() => setVisible((v) => !v)}>
          <Icon name={visible ? "eye" : "eyeOff"} size="sm" color="inkMuted" />
        </Pressable>
      }
    />
  );
});

/** Serbian phone number field: flag + "+381" prefix. */
export const PhoneField = forwardRef<
  TextInputRef,
  TextFieldProps & { flagStyle?: StyleProp<import("react-native").ImageStyle>; prefixStyle?: StyleProp<TextStyle> }
>(function PhoneField({ flagStyle, prefixStyle, ...props }, ref) {
  const phone = usePhone();
  return (
    <TextField
      {...props}
      ref={ref}
      left={<Image source={require("../../assets/images/serbiaFlag.png")} style={[phone.flag, flagStyle]} />}
      prefix={<Text style={[phone.prefix, prefixStyle]}>+381</Text>}
    />
  );
});

export type TextAreaProps = {
  /** `card`: bordered box (booking note) · `plain`: borderless (rating comment). */
  variant?: "card" | "plain";
  value?: string | null;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  maxLength?: number;
  /** Show the "n / max" counter once the text is longer than this. */
  counterFrom?: number;
  styles?: { container?: StyleProp<ViewStyle>; input?: StyleProp<TextStyle> };
};

/** Multiline input with a character counter near the limit. */
export function TextArea({
  value,
  onChangeText,
  placeholder,
  maxLength = 170,
  counterFrom = 150,
  variant = "plain",
  styles: s = {},
}: TextAreaProps) {
  const { colors } = useTheme();
  const area = useArea();
  return (
    <View style={[area.container, area[`${variant}Container`], s.container]}>
      <TextInput
        style={[area.input, area[`${variant}Input`], s.input]}
        onChangeText={onChangeText}
        value={value ?? undefined}
        placeholder={placeholder}
        placeholderTextColor={colors.inkFaint}
        multiline
        numberOfLines={4}
        textAlignVertical="top"
        maxLength={maxLength}
        scrollEnabled={false}
      />
      {(value?.length ?? 0) > counterFrom && (
        <View style={area.counterContainer}>
          <Text style={area.counter}>
            {value?.length} / {maxLength}
          </Text>
        </View>
      )}
    </View>
  );
}

const EMPTY: Record<keyof FieldStyles, undefined> = {
  label: undefined,
  container: undefined,
  containerFocused: undefined,
  input: undefined,
  inputFocused: undefined,
  error: undefined,
};

const rowCenter: ViewStyle = { flexDirection: "row", alignItems: "center" };
const fill: ViewStyle = { flex: 1 };
const toggleStyle: ViewStyle = { paddingHorizontal: 14, paddingVertical: 12 };

/** Default field look (design system `ds-input`). */
const useDefaults = makeStyles((colors) => ({
  label: { color: colors.inkMuted, fontSize: 13, lineHeight: 16, fontFamily: fonts.sansSemiBold, marginTop: 16, marginBottom: 6 },
  container: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 48,
    backgroundColor: colors.surface,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: colors.lineStrong,
  },
  // 2px focus border; -0.5 margin keeps the outer size (no layout jump)
  containerFocused: { borderWidth: 2, borderColor: colors.focus, margin: -0.5 },
  input: {
    flex: 1,
    backgroundColor: "transparent",
    color: colors.ink,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    fontFamily: fonts.sans,
  },
  inputFocused: {},
  error: { color: colors.danger, fontSize: 13, lineHeight: 18, fontFamily: fonts.sans, marginTop: 6 },
}));

const usePhone = makeStyles((colors) => ({
  flag: { width: 24, height: 18, marginRight: 8, marginLeft: 16, borderRadius: 2 },
  prefix: { color: colors.ink, fontFamily: fonts.sans, fontSize: 16 },
}));

const useArea = makeStyles((colors) => ({
  container: {
    backgroundColor: colors.surface,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: colors.lineStrong,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  input: { backgroundColor: "transparent", fontSize: 16, lineHeight: 22, color: colors.ink, fontFamily: fonts.sans, minHeight: 96, padding: 0 },
  cardContainer: { marginVertical: 8, marginHorizontal: 16 },
  cardInput: {},
  plainContainer: { marginTop: 12 },
  plainInput: {},
  counterContainer: { alignItems: "flex-end", marginTop: 6 },
  counter: { fontSize: 12, lineHeight: 16, color: colors.inkMuted, fontFamily: fonts.sansMedium },
}));
