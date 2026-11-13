import type { ReactNode } from "react";
import { type StyleProp, StyleSheet, Text, type TextStyle, View } from "react-native";

import { colors, fonts, fontSize } from "@/theme";

type EmptyStateProps = {
  title: ReactNode;
  description?: ReactNode;
  descriptionStyle?: StyleProp<TextStyle>;
};

/** "Nothing here" block: bold title + optional description, centered. */
export function EmptyState({ title, description, descriptionStyle }: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {description != null && <Text style={[styles.description, descriptionStyle]}>{description}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    display: "flex",
    flexDirection: "column",
    width: "100%",
    marginTop: 20,
    borderRadius: 20,
    padding: 10,
    gap: 20,
    height: 100,
  },
  title: {
    fontSize: fontSize.xl,
    textAlign: "center",
    padding: 10,
    fontFamily: fonts.bold,
    color: colors.text,
  },
  description: {
    fontSize: fontSize.md,
    color: colors.text,
    fontFamily: fonts.regular,
    textAlign: "center",
  },
});
