import { ComponentType } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet } from "react-native";

export default function withKeyboardAvoid<T>(WrapperComponent: ComponentType<T>) {
  return function (props: T & JSX.IntrinsicAttributes){
    return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.safeArea}
    >
      <WrapperComponent {...props} />
    </KeyboardAvoidingView>
  );
  }
}

const styles = StyleSheet.create({
  safeArea: {
    paddingVertical: 30,
    flex: 1,
    backgroundColor: "black",
  },
});
