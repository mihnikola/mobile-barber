import { forwardRef } from "react";

import { PasswordField, type TextInputRef } from "@/components/ui/TextField";
import { fonts, makeStyles } from "@/theme";

/**
 * @deprecated Use `<PasswordField>` from `@/components/ui`.
 * Caller onFocus/onBlur are forwarded (B20 fixed; they used to be dropped).
 */
const SharedPassword = forwardRef<TextInputRef, any>(({ error, ...props }, ref) => {
  const styles = useStyles();
  return (<PasswordField
    {...props}
    ref={ref}
    unstyled
    error={props.value?.length > 0 ? error : undefined}
    styles={styles}
  />);
});

const useStyles = makeStyles((colors) => ({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 8,
  },
  containerFocused: { borderWidth: 2, borderColor: colors.white, margin: -2 }, // -2: border drawn outward, no layout jump
  input: {
    backgroundColor: colors.white,
    color: colors.textOnLight,
    padding: 15,
    borderRadius: 8,
    fontSize: 16,
    width: "80%",
    fontFamily: fonts.regular,
  },
  label: { color: colors.text, fontFamily: fonts.bold, fontSize: 14, marginTop: 20, marginBottom: 4 },
  error: { color: colors.danger, fontFamily: fonts.bold },
}));

export default SharedPassword;
