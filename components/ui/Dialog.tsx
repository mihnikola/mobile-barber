import type { ReactNode } from "react";
import { Modal, type StyleProp, Text, type TextStyle, View, type ViewStyle } from "react-native";

import { makeStyles, sheetShadow, typeScale } from "@/theme";

import { Button } from "./Button";

type DialogProps = {
  /** Like RN Modal: undefined means visible. */
  visible?: boolean;
  onRequestClose?: () => void;
  /** Optional icon in a rounded tile above the title (messages); confirmations have none. */
  icon?: ReactNode;
  title?: ReactNode;
  /** One sentence under the title: what will happen. */
  text?: ReactNode;
  /** Actions / extra content below the title (stacked). */
  children?: ReactNode;
  panelStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
};

/** Design-system dialog (`ds-dialog`): centered `surface` panel on `scrim`, stacked actions. */
export function Dialog({ visible, onRequestClose, icon, title, text, children, panelStyle, titleStyle }: DialogProps) {
  const s = useDialogStyles();
  return (
    <Modal animationType="fade" transparent visible={visible} onRequestClose={onRequestClose}>
      <View style={s.overlay}>
        <View style={[s.panel, panelStyle]}>
          {icon != null && <View style={s.iconTile}>{icon}</View>}
          {title != null && <Text style={[s.title, icon != null && s.center, titleStyle]}>{title}</Text>}
          {text != null && <Text style={[s.text, icon != null && s.center]}>{text}</Text>}
          {children != null && <View style={s.actions}>{children}</View>}
        </View>
      </View>
    </Modal>
  );
}

type DialogActionProps = {
  title: ReactNode;
  onPress?: () => void;
  /** `primary` = the action (top), `secondary` = the way out (ghost, bottom), `danger` = destructive. */
  tone?: "primary" | "secondary" | "danger";
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
};

/** Full-width dialog button. */
export function DialogAction({ title, onPress, tone = "primary", disabled, loading, style }: DialogActionProps) {
  return (
    <Button
      title={title}
      onPress={onPress}
      disabled={disabled}
      loading={loading}
      variant={tone === "secondary" ? "ghost" : tone}
      style={style}
    />
  );
}

const useDialogStyles = makeStyles((colors) => ({
  overlay: {
    flex: 1,
    backgroundColor: colors.scrim,
    justifyContent: "center",
    padding: 16,
  },
  panel: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    paddingTop: 24,
    paddingHorizontal: 20,
    paddingBottom: 20,
    ...sheetShadow(colors), // dialogs use shadow-sheet
  },
  iconTile: {
    width: 72,
    height: 72,
    borderRadius: 12,
    backgroundColor: colors.surfaceSunken,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 16,
  },
  title: { ...typeScale.displayMd, color: colors.ink },
  text: { ...typeScale.body, fontSize: 15, color: colors.inkMuted, marginTop: 8 },
  center: { textAlign: "center" },
  actions: { gap: 8, marginTop: 20 },
}));
