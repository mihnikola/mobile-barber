import type { ReactNode } from "react";
import { type StyleProp, Text, type TextStyle, View } from "react-native";

import { makeStyles, typeScale } from "@/theme";

import { Button } from "./Button";
import { Icon, type IconName } from "./Icon";

type EmptyStateProps = {
  /** What the state is („Nema termina“). */
  title: ReactNode;
  /** One useful sentence (ideally a concrete next option). */
  description?: ReactNode;
  icon?: IconName;
  /** Optional single next step. */
  actionTitle?: ReactNode;
  onAction?: () => void;
  descriptionStyle?: StyleProp<TextStyle>;
};

/** Design-system empty state (`ds-empty`): icon tile, display title, one sentence, one button. */
export function EmptyState({ title, description, icon = "calendar", actionTitle, onAction, descriptionStyle }: EmptyStateProps) {
  const s = useStyles();
  return (
    <View style={s.container}>
      <View style={s.mark}>
        <Icon name={icon} size={32} color="ink" />
      </View>
      <Text style={s.title}>{title}</Text>
      {description != null && <Text style={[s.description, descriptionStyle]}>{description}</Text>}
      {actionTitle != null && <Button title={actionTitle} onPress={onAction} style={s.action} />}
    </View>
  );
}

const useStyles = makeStyles((colors) => ({
  container: { alignItems: "center", paddingVertical: 32, paddingHorizontal: 20 },
  mark: {
    width: 72,
    height: 72,
    borderRadius: 12,
    backgroundColor: colors.surfaceSunken,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  title: { ...typeScale.displayMd, color: colors.ink, textAlign: "center" },
  description: { ...typeScale.body, fontSize: 15, color: colors.inkMuted, textAlign: "center", marginTop: 8 },
  action: { marginTop: 20, alignSelf: "stretch" },
}));
