import { forwardRef } from "react";
import { findNodeHandle, StyleSheet, View } from "react-native";

import { TextField } from "@/components/ui/TextField";
import { colors, fonts } from "@/theme";

/**
 * @deprecated Use `<TextField>` from `@/components/ui`.
 * Scrolls the field above the keyboard on focus when `scrollRef` is given.
 * onFocus/onBlur from callers were always ignored here — kept that way (B20).
 */
const SharedNameEdit = forwardRef(({ scrollRef, style, onFocus, onBlur, ...props }, ref) => {
  const handleFocus = () => {
    if (scrollRef && ref) {
      const node = findNodeHandle(ref.current);
      if (node) {
        scrollRef.current?.scrollResponderScrollNativeHandleToKeyboard(node, 120, true);
      }
    }
  };

  return (
    <View style={styles.wrapper}>
      <TextField
        {...props}
        ref={ref}
        unstyled
        value={props.value ?? ""}
        onFocus={handleFocus}
        styles={{ label: styles.label, input: style, inputFocused: styles.inputFocused, error: styles.error }}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  wrapper: { marginBottom: 15 },
  label: { color: colors.text, fontSize: 14, marginTop: 15, marginBottom: 8, fontFamily: fonts.regular },
  error: { color: colors.danger, marginTop: 5, fontFamily: fonts.bold },
  inputFocused: { borderColor: colors.textInactive },
});

export default SharedNameEdit;
