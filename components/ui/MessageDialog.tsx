import type { ReactNode } from "react";

import { Dialog, DialogAction } from "./Dialog";

/**
 * Message with one action (success / error / info).
 * `isLoading` shows a spinner in the button; `"verification"` also disables it while a request runs.
 */
export const MessageDialog = ({
  isOpen,
  icon,
  title,
  text,
  buttonText,
  onConfirm,
  isLoading,
}: {
  isOpen?: boolean;
  onClose?: () => void;
  icon?: ReactNode;
  title?: ReactNode;
  text?: ReactNode;
  buttonText?: ReactNode;
  onConfirm?: () => void;
  isLoading?: boolean | string;
}) => (
  <Dialog visible={isOpen} onRequestClose={onConfirm} icon={icon} title={title} text={text}>
    <DialogAction title={buttonText} onPress={onConfirm} loading={!!isLoading} disabled={isLoading === "verification"} />
  </Dialog>
);
