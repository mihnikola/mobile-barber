import { type ComponentRef, forwardRef, type ReactNode, useState } from "react";
import {
  Image,
  type StyleProp,
  StyleSheet,
  Text,
  TextInput,
  type TextInputProps,
  type TextStyle,
  View,
  type ViewStyle,
} from "react-native";

import { colors, fonts, fontSize } from "@/theme";

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
};

/**
 * Labelled text input with focus border and error text. All app inputs are built on this.
 */
export const TextField = forwardRef<TextInputRef, TextFieldProps>(function TextField(
  { label, error, left, prefix, right, styles: s = {}, unstyled = false, onFocus, onBlur, ...inputProps },
  ref,
) {
  const [focused, setFocused] = useState(false);
  const d = unstyled ? EMPTY : defaults;

  const input = (
    <TextInput
      placeholderTextColor={colors.textInactive}
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
          <View style={rowCenter}>
            {prefix}
            {input}
          </View>
        ) : (
          input
        )}
        {right}
      </View>
      {error ? <Text style={[d.error, s.error]}>{error}</Text> : null}
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
          <Icon name={visible ? "eye" : "eyeOff"} size="md" color="textMuted" />
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
  value?: string;
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
  styles: s = {},
}: TextAreaProps) {
  return (
    <View style={[area.container, s.container]}>
      <TextInput
        style={[area.input, s.input]}
        onChangeText={onChangeText}
        value={value}
        placeholder={placeholder}
        placeholderTextColor={colors.text}
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
const toggleStyle: ViewStyle = { padding: 10 };

/** Default field look (= the most common legacy field: white box, black text, white focus border). */
const defaults = StyleSheet.create({
  label: { color: colors.text, fontSize: fontSize.sm, fontFamily: fonts.bold, marginTop: 15, marginBottom: 8 },
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 8,
  },
  containerFocused: { borderWidth: 2, borderColor: colors.white },
  input: {
    flex: 1,
    color: colors.textOnLight,
    padding: 15,
    fontSize: fontSize.md,
    fontFamily: fonts.regular,
  },
  inputFocused: {},
  error: { color: colors.danger, fontFamily: fonts.regular },
});

const phone = StyleSheet.create({
  flag: { width: 24, height: 18, marginRight: 8, marginLeft: 12, borderRadius: 2 },
  prefix: { color: colors.textOnLight, fontFamily: fonts.regular, fontSize: fontSize.md },
});

const area = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", flexDirection: "row" },
  input: { fontSize: fontSize.sm, color: colors.text, fontFamily: fonts.regular },
  counterContainer: {
    position: "absolute",
    alignContent: "flex-end",
    alignItems: "flex-end",
    width: "100%",
    bottom: 2,
  },
  counter: { fontSize: fontSize.xxs, color: colors.danger, opacity: 0.7, fontFamily: fonts.regular },
});
