import type { ReactNode } from "react";
import { StyleSheet, View } from "react-native";

import { Dialog, DialogAction } from "./Dialog";
import { fonts } from "@/theme";

/** Yes / No confirmation (logout, cancel reservation …). */
export const ConfirmDialog = ({
  isOpen,
  onClose,
  icon,
  title,
  confirmText,
  onConfirm,
  cancelText,
}: {
  isOpen?: boolean;
  onClose?: () => void;
  icon?: ReactNode;
  title?: ReactNode;
  confirmText?: ReactNode;
  onConfirm?: () => void;
  cancelText?: ReactNode;
}) => (
  <Dialog
    visible={isOpen}
    onRequestClose={onClose}
    icon={icon}
    title={title}
    panelStyle={styles.panel}
    titleStyle={styles.title}
  >
    <View style={styles.buttons}>
      <DialogAction title={confirmText} onPress={onConfirm} style={styles.half} textStyle={styles.actionText} />
      <DialogAction
        title={cancelText}
        onPress={onClose}
        tone="secondary"
        style={styles.half}
        textStyle={styles.actionText}
      />
    </View>
  </Dialog>
);

const styles = StyleSheet.create({
  panel: { borderWidth: 1 },
  title: { fontFamily: fonts.regular, fontSize: 20 },
  buttons: { display: "flex", flexDirection: "row", gap: 20 },
  half: { width: "50%" },
  actionText: { fontSize: 18, fontWeight: "600" },
});
