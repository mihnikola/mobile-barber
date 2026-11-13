import { StyleSheet } from "react-native";

import { Button } from "@/components/ui/Button";

/**
 * @deprecated Use `<Button>` from `@/components/ui`.
 * Differences kept 1:1 from the old implementation: no minHeight / justifyContent,
 * and the button is hidden (not greyed out) while disabled.
 */
const SharedButtonDateReservation = (props: any) => (
  <Button
    title={props.text}
    onPress={props.onPress}
    loading={props.loading}
    disabled={props.disabled}
    style={[styles.btn, props.disabled && styles.hidden]}
  />
);

const styles = StyleSheet.create({
  btn: { marginTop: 20, marginBottom: 30, minHeight: 0, justifyContent: "flex-start" },
  hidden: { display: "none" },
});

export default SharedButtonDateReservation;
