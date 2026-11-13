import React from "react";
import { StyleSheet } from "react-native";
import { AppText, Card } from "@/components/ui";

/** "About us" text block (Phase 5.6): paragraphs in one card, left-aligned. Title is in the screen header. */
const AboutUsInfo = ({ text, textTwo, textThree }: { title?: string; text?: string; textTwo?: string; textThree?: string }) => (
  <Card style={styles.card}>
    {[text, textTwo, textThree].filter(Boolean).map((p, i) => (
      <AppText key={i} variant="body" color="inkMuted">
        {p}
      </AppText>
    ))}
  </Card>
);

const styles = StyleSheet.create({
  card: { gap: 12 },
});

export default AboutUsInfo;
