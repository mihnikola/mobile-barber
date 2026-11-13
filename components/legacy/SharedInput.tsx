import { forwardRef } from "react";

import { TextField, type TextInputRef } from "@/components/ui/TextField";
import { fonts, makeStyles } from "@/theme";

/**
 * @deprecated Use `<TextField>` from `@/components/ui`.
 * Old unused `stylePassword` / `dataDetectorTypes` branches removed (no caller used them).
 * Caller onFocus/onBlur are forwarded (B20 fixed; they used to be dropped).
 */
const SharedInput = forwardRef<TextInputRef, any>(({ style, error, ...props }, ref) => {
  const styles = useStyles();
  return (<TextField
    {...props}
    ref={ref}
    unstyled
    value={props.value ?? ""}
    error={props.value?.length > 0 ? error : undefined}
    styles={{ label: styles.label, input: style, inputFocused: styles.inputFocused, error: styles.error }}
  />);
});

const useStyles = makeStyles((colors) => ({
  label: { color: colors.text, fontSize: 14, marginBottom: 8, marginTop: 15, fontFamily: fonts.bold },
  // fields already have a 2px white border: grow it to 4px outward on focus (same look as password, no layout jump)
  inputFocused: { borderColor: colors.white, borderWidth: 4, margin: -2 },
  error: { color: colors.danger, paddingTop: 10, fontFamily: fonts.regular },
}));

export default SharedInput;
