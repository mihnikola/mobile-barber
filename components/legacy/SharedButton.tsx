import { Button } from "@/components/ui/Button";

/** @deprecated Use `<Button>` from `@/components/ui`. Kept 1:1 (incl. margins) for existing screens. */
const SharedButton = (props: any) => (
  <Button
    title={props.text}
    onPress={props.onPress}
    loading={props.loading}
    disabled={props.disabled}
    style={{ marginTop: 20, marginBottom: 30 }}
  />
);

export default SharedButton;
