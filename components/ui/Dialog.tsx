import type { ReactNode } from "react";
import { Modal, type StyleProp, StyleSheet, Text, type TextStyle, View, type ViewStyle } from "react-native";

import { colors, fonts, fontSize } from "@/theme";

import { Pressable } from "./Pressable";

type DialogProps = {
  /** Like RN Modal: undefined means visible. */
  visible?: boolean;
  onRequestClose?: () => void;
  /** Shown in a round badge above the title. */
  icon?: ReactNode;
  title?: ReactNode;
  /** Actions / extra content below the title. */
  children?: ReactNode;
  panelStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
};

/** Centered modal panel on a dimmed backdrop (messages, confirmations, blocking loader). */
export function Dialog({ visible, onRequestClose, icon, title, children, panelStyle, titleStyle }: DialogProps) {
  return (
    <Modal animationType="fade" transparent visible={visible} onRequestClose={onRequestClose}>
      <View style={dialogStyles.overlay}>
        <View style={[dialogStyles.panel, panelStyle]}>
          {icon != null && <View style={dialogStyles.iconBadge}>{icon}</View>}
          {title != null && <Text style={[dialogStyles.title, titleStyle]}>{title}</Text>}
          {children}
        </View>
      </View>
    </Modal>
  );
}

type DialogActionProps = {
  title: ReactNode;
  onPress?: () => void;
  /** `secondary` = grey "No/Cancel" button. */
  tone?: "primary" | "secondary";
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  children?: ReactNode;
};

/** Full-width dialog button. `children` replaces the title (e.g. a spinner). */
export function DialogAction({ title, onPress, tone = "primary", disabled, style, textStyle, children }: DialogActionProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[dialogStyles.action, tone === "secondary" && dialogStyles.actionSecondary, style]}
    >
      {children ?? <Text style={[dialogStyles.actionText, textStyle]}>{title}</Text>}
    </Pressable>
  );
}

export const dialogStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  panel: {
    backgroundColor: colors.surfaceModal,
    borderRadius: 12,
    padding: 32,
    maxWidth: 384,
    width: "100%",
    alignItems: "center",
  },
  iconBadge: {
    width: 96,
    height: 96,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.white,
    borderRadius: 9999,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    color: colors.text,
    fontSize: fontSize.md,
    fontFamily: fonts.bold,
    marginBottom: 16,
    textAlign: "center",
    lineHeight: 36,
  },
  action: {
    width: "100%",
    backgroundColor: colors.black,
    paddingVertical: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.white,
    shadowColor: colors.background,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  actionSecondary: {
    backgroundColor: colors.disabled,
    shadowOpacity: 0,
    elevation: 0,
  },
  actionText: {
    color: colors.text,
    fontSize: fontSize.xxl,
    fontFamily: fonts.regular,
    textAlign: "center",
  },
});
