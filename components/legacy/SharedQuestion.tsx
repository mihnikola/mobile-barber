import type { ReactNode } from "react";
import { StyleSheet, View } from "react-native";

import { Dialog, DialogAction } from "@/components/ui/Dialog";
import { fonts } from "@/theme";

/** @deprecated Use `<Dialog>` + two `<DialogAction>`s from `@/components/ui`. */
export const SharedQuestion = ({
  isOpen,
  onClose,
  icon,
  title,
  buttonTextYes,
  onLogOut,
  buttonTextNo,
}: {
  isOpen?: boolean;
  onClose?: () => void;
  icon?: ReactNode;
  title?: ReactNode;
  buttonTextYes?: ReactNode;
  onLogOut?: () => void;
  buttonTextNo?: ReactNode;
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
      <DialogAction title={buttonTextYes} onPress={onLogOut} style={styles.half} textStyle={styles.actionText} />
      <DialogAction
        title={buttonTextNo}
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
