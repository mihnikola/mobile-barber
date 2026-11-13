import { forwardRef } from "react";
import { StyleSheet } from "react-native";

import { TextField, type TextInputRef } from "@/components/ui/TextField";
import { colors, fonts } from "@/theme";

/**
 * @deprecated Use `<TextField>` from `@/components/ui`.
 * Old unused `stylePassword` / `dataDetectorTypes` branches removed (no caller used them).
 * onFocus/onBlur from callers were always ignored here — kept that way (B20).
 */
const SharedInput = forwardRef<TextInputRef, any>(({ style, error, onFocus, onBlur, ...props }, ref) => (
  <TextField
    {...props}
    ref={ref}
    unstyled
    value={props.value ?? ""}
    error={props.value?.length > 0 ? error : undefined}
    styles={{ label: styles.label, input: style, inputFocused: styles.inputFocused, error: styles.error }}
  />
));

const styles = StyleSheet.create({
  label: { color: colors.text, fontSize: 14, marginBottom: 8, marginTop: 15, fontFamily: fonts.bold },
  inputFocused: { borderColor: colors.white },
  error: { color: colors.danger, paddingTop: 10, fontFamily: fonts.regular },
});

export default SharedInput;
