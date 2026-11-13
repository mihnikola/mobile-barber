import type { ReactNode } from "react";
import { ActivityIndicator } from "react-native";

import { Dialog, DialogAction } from "./Dialog";
import { useTheme } from "@/theme";

/**
 * Message with one action (success / error / info), optional spinner in the button.
 * `isLoading === "verification"` disables the button while a request runs.
 */
export const MessageDialog = ({
  isOpen,
  icon,
  title,
  buttonText,
  onConfirm,
  isLoading,
}: {
  isOpen?: boolean;
  onClose?: () => void;
  icon?: ReactNode;
  title?: ReactNode;
  buttonText?: ReactNode;
  onConfirm?: () => void;
  isLoading?: boolean | string;
}) => {
  const { colors } = useTheme();
  return (<Dialog visible={isOpen} onRequestClose={onConfirm} icon={icon} title={title}>
    <DialogAction title={buttonText} onPress={onConfirm} disabled={isLoading === "verification"}>
      {isLoading ? (
        <ActivityIndicator size={25} color={isLoading === "verification" ? colors.text : colors.textInactive} />
      ) : undefined}
    </DialogAction>
  </Dialog>);
};
