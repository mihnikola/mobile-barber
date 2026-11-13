import React from "react";
import { View } from "react-native";

import { fonts, makeStyles } from "@/theme";
import { AppText, Icon, Pressable } from "@/components/ui";

type Props = {
  /** "uto, 6. okt · 14:30 – 15:20" — shown with `total` once a time is picked. */
  meta?: string;
  total?: string;
  /** Text instead of meta/total when nothing is picked yet ("Izaberi vreme"). */
  hint?: string;
  disabled?: boolean;
  onContinue: () => void;
  continueLabel: string;
};

/** Bottom summary bar (design system `SummaryBar`): what was picked + round "continue" arrow. */
export default function SummaryBar({ meta, total, hint, disabled = false, onContinue, continueLabel }: Props) {
  const styles = useStyles();
  return (
    <View style={styles.bar}>
      {hint ? (
        <AppText style={styles.hint}>{hint}</AppText>
      ) : (
        <View style={styles.info}>
          {meta ? <AppText style={styles.meta}>{meta}</AppText> : null}
          {total ? <AppText style={styles.total}>{total}</AppText> : null}
        </View>
      )}
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={continueLabel}
        disabled={disabled}
        onPress={onContinue}
        style={[styles.go, disabled && styles.goDisabled]}
      >
        <Icon name="arrowRight" size={24} color={disabled ? "inkFaint" : "onPrimary"} />
      </Pressable>
    </View>
  );
}

const useStyles = makeStyles((colors) => ({
  bar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingTop: 10,
    paddingBottom: 18,
    paddingHorizontal: 16,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.line,
  },
  info: { flex: 1 },
  hint: { flex: 1, fontFamily: fonts.sans, fontSize: 14, color: colors.inkMuted },
  meta: { fontFamily: fonts.sans, fontSize: 12, lineHeight: 16, color: colors.inkMuted },
  total: { fontFamily: fonts.sansBold, fontSize: 17, lineHeight: 22, color: colors.ink, fontVariant: ["tabular-nums"] },
  go: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  goDisabled: { backgroundColor: colors.surfaceSunken },
}));
