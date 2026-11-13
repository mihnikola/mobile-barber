import { forwardRef } from "react";
import { StyleSheet } from "react-native";

import { PasswordField, type TextInputRef } from "@/components/ui/TextField";
import { colors, fonts } from "@/theme";

/**
 * @deprecated Use `<PasswordField>` from `@/components/ui`.
 * Caller onFocus/onBlur are forwarded (B20 fixed; they used to be dropped).
 */
const SharedConfirmPassword = forwardRef<TextInputRef, any>(({ error, ...props }, ref) => (
  <PasswordField
    {...props}
    ref={ref}
    unstyled
    placeholderTextColor={colors.textMuted}
    error={props.value?.length > 0 ? error : undefined}
    styles={styles}
  />
));

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 8,
  },
  containerFocused: { borderColor: colors.white, borderWidth: 2, margin: -2 }, // -2: border drawn outward, no layout jump
  input: {
    backgroundColor: colors.white,
    color: colors.textOnLight,
    fontFamily: fonts.regular,
    padding: 15,
    borderRadius: 8,
    fontSize: 16,
    borderColor: colors.white,
    width: "80%",
  },
  label: { color: colors.text, fontSize: 14, marginTop: 15, marginBottom: 5, fontFamily: fonts.bold },
  error: { color: colors.danger, fontFamily: fonts.regular },
});

export default SharedConfirmPassword;
