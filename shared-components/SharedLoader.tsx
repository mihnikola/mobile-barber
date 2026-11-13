import { Loader } from "@/components/ui/Loader";

/**
 * @deprecated Use `<Loader variant="overlay" visible />` from `@/components/ui`.
 * Note: like the old Modal, `isOpen` undefined means visible (DateComponent relies on it).
 */
export const SharedLoader = ({ isOpen, onConfirm }: { isOpen?: boolean; onConfirm?: () => void }) => (
  <Loader variant="overlay" visible={isOpen} onRequestClose={onConfirm} />
);
