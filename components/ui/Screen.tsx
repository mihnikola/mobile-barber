import { type ComponentType, type JSX, type ReactNode, useEffect, useState } from "react";
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, StatusBar, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { makeStyles, useTheme } from "@/theme";

export type ScreenMode =
  /** Top safe-area inset on iOS + translucent light status bar (was `withSafeArea`). */
  | "safe"
  /** Keyboard-avoiding container, enabled only while the keyboard is open (was `withKeyboardAvoid`). */
  | "keyboard"
  /** Keyboard-avoiding + centered scroll form with side padding (was `WrapperAuth`). */
  | "form";

type ScreenProps = {
  mode?: ScreenMode;
  children: ReactNode;
};

/**
 * Root container for every screen. Phase 2 keeps the three legacy behaviours 1:1
 * (D-002); they can be unified when the new design lands (Phase 5).
 */
export function Screen({ mode = "safe", children }: ScreenProps) {
  if (mode === "keyboard") return <KeyboardScreen>{children}</KeyboardScreen>;
  if (mode === "form") return <FormScreen>{children}</FormScreen>;
  return <SafeScreen>{children}</SafeScreen>;
}

/** HOC form of `<Screen>` for route files: `export default withScreen(MyScreen, "keyboard")`. */
export function withScreen<P>(Component: ComponentType<P>, mode: ScreenMode = "safe") {
  function WithScreen(props: P & JSX.IntrinsicAttributes) {
    return (
      <Screen mode={mode}>
        <Component {...props} />
      </Screen>
    );
  }
  WithScreen.displayName = `withScreen(${Component.displayName ?? Component.name ?? "Component"})`;
  return WithScreen;
}

function SafeScreen({ children }: { children: ReactNode }) {
  const insets = useSafeAreaInsets();
  const { scheme } = useTheme();
  return (
    <View style={{ flex: 1, paddingTop: Platform.OS === "ios" ? insets.top : undefined }}>
      {/* RN 0.88 is edge-to-edge: the old backgroundColor/translucent props no longer exist */}
      <StatusBar barStyle={scheme === "dark" ? "light-content" : "dark-content"} />
      {children}
    </View>
  );
}

function useKeyboardVisible() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const show = Keyboard.addListener(Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow", () =>
      setVisible(true),
    );
    const hide = Keyboard.addListener(Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide", () =>
      setVisible(false),
    );
    return () => {
      show.remove();
      hide.remove();
    };
  }, []);
  return visible;
}

function KeyboardScreen({ children }: { children: ReactNode }) {
  const styles = useStyles();
  const isKeyboardVisible = useKeyboardVisible();
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.keyboard}
      keyboardVerticalOffset={10}
      enabled={isKeyboardVisible}
    >
      {children}
    </KeyboardAvoidingView>
  );
}

function FormScreen({ children }: { children: ReactNode }) {
  const styles = useStyles();
  return (
    <KeyboardAvoidingView style={styles.fill} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <ScrollView
        style={styles.formScroll}
        contentContainerStyle={styles.formContent}
        keyboardShouldPersistTaps="always"
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const useStyles = makeStyles((colors) => ({
  fill: { flex: 1 },
  keyboard: { flex: 1, backgroundColor: colors.bg },
  formScroll: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: colors.bg,
    paddingTop: Platform.OS === "android" ? 20 : 0,
  },
  formContent: {
    flexGrow: 1,
    justifyContent: "center",
    flex: 1,
    paddingVertical: 0,
    backgroundColor: colors.bg,
  },
}));
