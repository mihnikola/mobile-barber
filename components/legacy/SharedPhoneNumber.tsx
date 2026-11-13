import { forwardRef } from "react";
import { StyleSheet } from "react-native";

import { PhoneField, type TextInputRef } from "@/components/ui/TextField";
import { colors, fonts } from "@/theme";

/**
 * @deprecated Use `<PhoneField>` from `@/components/ui`.
 * Caller onFocus/onBlur are forwarded (B20 fixed; they used to be dropped).
 */
const SharedPhoneNumber = forwardRef<TextInputRef, any>(({ error, ...props }, ref) => (
  <PhoneField
    // old component never set a placeholder color -> keep the platform default
    placeholderTextColor={undefined}
    {...props}
    ref={ref}
    unstyled
    error={props.value && props.value?.length > 0 ? error : undefined}
    styles={styles}
  />
));

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 8,
  },
  containerFocused: { borderColor: colors.white, borderWidth: 2, margin: -2 }, // -2: border drawn outward, no layout jump
  input: {
    backgroundColor: colors.white,
    color: colors.textOnLight,
    paddingTop: 15,
    paddingBottom: 15,
    paddingRight: 15,
    paddingLeft: 5,
    borderRadius: 8,
    fontSize: 16,
    width: "70%",
    fontFamily: fonts.regular,
  },
  label: { color: colors.text, fontSize: 14, marginBottom: 8, fontFamily: fonts.bold, marginTop: 15 },
  error: { color: colors.danger, fontFamily: fonts.regular },
});

export default SharedPhoneNumber;
