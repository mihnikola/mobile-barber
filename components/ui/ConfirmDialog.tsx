import type { ReactNode } from "react";

import { Dialog, DialogAction } from "./Dialog";

/**
 * Confirmation for irreversible actions (logout, cancel appointment) — `ds-dialog`:
 * the action on top (verb from the title), the way out below as a ghost button.
 */
export const ConfirmDialog = ({
  isOpen,
  onClose,
  icon,
  title,
  text,
  confirmText,
  onConfirm,
  cancelText,
  destructive = false,
}: {
  isOpen?: boolean;
  onClose?: () => void;
  /** Kept for existing callers; the design system shows confirmations without an icon. */
  icon?: ReactNode;
  title?: ReactNode;
  text?: ReactNode;
  confirmText?: ReactNode;
  onConfirm?: () => void;
  cancelText?: ReactNode;
  /** Red outlined action (e.g. cancel appointment). */
  destructive?: boolean;
}) => (
  <Dialog visible={isOpen} onRequestClose={onClose} icon={icon} title={title} text={text}>
    <DialogAction title={confirmText} onPress={onConfirm} tone={destructive ? "danger" : "primary"} />
    <DialogAction title={cancelText} onPress={onClose} tone="secondary" />
  </Dialog>
);
