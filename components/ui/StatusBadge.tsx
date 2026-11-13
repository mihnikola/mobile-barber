import type { ReactNode } from "react";
import { Text, View } from "react-native";

import { type ColorToken, fonts, makeStyles, useTheme } from "@/theme";

export type BadgeStatus = "pending" | "confirmed" | "cancelled" | "done" | "new";

const TONES: Record<BadgeStatus, { fg: ColorToken; bg: ColorToken; dot: boolean }> = {
  pending: { fg: "warning", bg: "warningSoft", dot: true },
  confirmed: { fg: "success", bg: "successSoft", dot: true },
  cancelled: { fg: "danger", bg: "dangerSoft", dot: true },
  done: { fg: "inkMuted", bg: "surfaceSunken", dot: true },
  new: { fg: "accent", bg: "accentSoft", dot: false },
};

/**
 * Appointment status pill (`ds-badge`). The label carries the meaning; the dot is decoration.
 * Labels come from localization (Na čekanju · Potvrđeno · Otkazano · Završeno · Novo).
 */
export function StatusBadge({ status, label }: { status: BadgeStatus; label: ReactNode }) {
  const s = useStyles();
  const { colors } = useTheme();
  const t = TONES[status];
  return (
    <View style={[s.pill, { backgroundColor: colors[t.bg] }]}>
      {t.dot && <View style={[s.dot, { backgroundColor: colors[t.fg] }]} />}
      <Text style={[s.label, { color: colors[t.fg] }]}>{label}</Text>
    </View>
  );
}

const useStyles = makeStyles(() => ({
  pill: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: 6,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 999,
  },
  dot: { width: 6, height: 6, borderRadius: 3 },
  label: { fontFamily: fonts.sansSemiBold, fontSize: 12, lineHeight: 16 },
}));
