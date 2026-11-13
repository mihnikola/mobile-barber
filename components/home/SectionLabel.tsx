import React, { type ReactNode } from "react";
import { StyleSheet } from "react-native";
import { AppText } from "@/components/ui";

/** Small uppercase section label above a list group (design system `ds-section`). */
export default function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <AppText variant="label" color="inkMuted" style={styles.label}>
      {children}
    </AppText>
  );
}

const styles = StyleSheet.create({
  label: { marginHorizontal: 32, marginTop: 20, marginBottom: 4, textTransform: "uppercase" },
});
