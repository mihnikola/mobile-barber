import { Children, Fragment, isValidElement, type ReactNode } from "react";
import { type StyleProp, Text, View, type ViewStyle } from "react-native";

import { fonts, makeStyles } from "@/theme";

import { Icon, type IconName } from "./Icon";
import { Pressable } from "./Pressable";

/** Groups ListRows in one card with hairline dividers (`ds-list`). */
export function ListGroup({ children, style }: { children: ReactNode; style?: StyleProp<ViewStyle> }) {
  const s = useStyles();
  const rows = Children.toArray(children).filter(isValidElement);
  return (
    <View style={[s.group, style]}>
      {rows.map((row, i) => (
        <Fragment key={row.key ?? i}>
          {i > 0 && <View style={s.divider} />}
          {row}
        </Fragment>
      ))}
    </View>
  );
}

type ListRowProps = {
  label: ReactNode;
  icon?: IconName;
  /** Current value shown on the right (e.g. the selected language). */
  value?: ReactNode;
  onPress?: () => void;
  /** Destructive row (logout): danger colour, no chevron, goes last. */
  danger?: boolean;
  /** Custom right side instead of the chevron (e.g. a Switch or a radio). */
  right?: ReactNode;
};

/** Row in a grouped settings/profile list (`ds-li`): icon, label, optional value, chevron. 56px. */
export function ListRow({ label, icon, value, onPress, danger = false, right }: ListRowProps) {
  const s = useStyles();
  return (
    <Pressable onPress={onPress} disabled={!onPress} style={s.row}>
      {icon && <Icon name={icon} size="sm" color={danger ? "danger" : "ink"} />}
      <Text style={[s.label, danger && s.danger]}>{label}</Text>
      {value != null && <Text style={s.value}>{value}</Text>}
      {right !== undefined ? right : !danger && onPress ? <Icon name="chevronRight" size="sm" color="inkMuted" /> : null}
    </Pressable>
  );
}

const useStyles = makeStyles((colors) => ({
  group: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    overflow: "hidden",
    marginHorizontal: 16,
    marginVertical: 8,
  },
  divider: { height: 1, backgroundColor: colors.line, marginLeft: 16 },
  row: { flexDirection: "row", alignItems: "center", gap: 12, minHeight: 56, paddingHorizontal: 16 },
  label: { flex: 1, fontFamily: fonts.sans, fontSize: 16, color: colors.ink },
  danger: { color: colors.danger },
  value: { fontFamily: fonts.sans, fontSize: 14, color: colors.inkMuted },
}));
