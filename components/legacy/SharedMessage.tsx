import type { ReactNode } from "react";
import { ActivityIndicator } from "react-native";

import { Dialog, DialogAction } from "@/components/ui/Dialog";
import { useTheme } from "@/theme";

/** @deprecated Use `<Dialog>` + `<DialogAction>` from `@/components/ui`. */
export const SharedMessage = ({
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
