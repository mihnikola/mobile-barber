import { ColorsBarber } from "@/constants/Colors";
import { forwardRef, useState } from "react";
import { findNodeHandle, StyleSheet, Text, TextInput, View, ScrollView } from "react-native";

const SharedNameEdit = forwardRef(({ scrollRef, ...props }: any, ref: any) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
    if (scrollRef && ref) {
      const node = findNodeHandle(ref.current);
      if (node) {
        scrollRef.current?.scrollResponderScrollNativeHandleToKeyboard(node, 120, true);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.inputLabel}>{props.label}</Text>
      <TextInput
        {...props}
        ref={ref}
        value={props.value ?? ""}
        onFocus={handleFocus}
        onBlur={() => setIsFocused(false)}
        onChangeText={props.onChangeText}
        placeholderTextColor={ColorsBarber.dark.inActiveTextColor}
        style={[props.style, isFocused && styles.focusedBorder]}
      />
      {props.error && <Text style={styles.errorText}>{props.error}</Text>}
    </View>
  );
});

const styles = StyleSheet.create({
  container: { marginBottom: 15 },
  inputLabel: {color: ColorsBarber.dark.textColor, fontSize: 14,  marginTop: 15, marginBottom: 8, fontFamily:"OldStandard-Regular" },
  errorText: { color: "red", marginTop: 5,  fontFamily:"OldStandard-Bold" },
  focusedBorder: { borderColor: ColorsBarber.dark.inActiveTextColor },
});

export default SharedNameEdit;
