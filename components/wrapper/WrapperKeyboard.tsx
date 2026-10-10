import { ColorsBarber } from "@/constants/Colors";
import { ComponentType, useEffect, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";

export default function withKeyboardAvoid<T>(
  WrapperComponent: ComponentType<T>,
) {
  return function (props: T & JSX.IntrinsicAttributes) {
    const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

    useEffect(() => {
      const showSubscription = Keyboard.addListener(
        Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow",
        () => setIsKeyboardVisible(true),
      );
      const hideSubscription = Keyboard.addListener(
        Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide",
        () => setIsKeyboardVisible(false),
      );

      return () => {
        showSubscription.remove();
        hideSubscription.remove();
      };
    }, []);
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.safeArea}
        keyboardVerticalOffset={10}
        enabled={isKeyboardVisible}
      >
        <WrapperComponent {...props} />
      </KeyboardAvoidingView>
    );
  };
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: ColorsBarber.dark.background,
  },
});
