import type { ReactNode } from "react";
import { type StyleProp, StyleSheet, Text, type TextStyle, View, type ViewStyle } from "react-native";

import { type ColorToken, fonts, makeStyles, useTheme } from "@/theme";

import { Icon, type IconName } from "./Icon";
import { Pressable } from "./Pressable";

type CardProps = {
  children: ReactNode;
  /** Makes the card pressable (with press lock). */
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

/**
 * Design-system card (`ds-card`): `surface`, radius 16, a barely visible shadow in light mode
 * (dark mode separates cards by tone only).
 */
export function Card({ children, onPress, style, testID }: CardProps) {
  const themed = useCardColors();
  if (onPress) {
    return (
      <Pressable testID={testID} onPress={onPress} style={[themed.surface, style]}>
        {children}
      </Pressable>
    );
  }
  return (
    <View testID={testID} style={[themed.surface, style]}>
      {children}
    </View>
  );
}

type ListItemProps = {
  title: ReactNode;
  /** Image / avatar / icon on the left. */
  leading?: ReactNode;
  /** Meta rows under the title (usually `<MetaRow>`s). */
  children?: ReactNode;
  /** Right side, default a chevron. Pass `null` for none. */
  trailing?: ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
};

/** Card row (`ds-svc` / `ds-staff`): leading visual, title + meta rows, trailing chevron. */
export function ListItem({ title, leading, children, trailing, onPress, style, titleStyle }: ListItemProps) {
  const themed = useCardColors();
  return (
    <Card onPress={onPress} style={[cardStyles.row, style]}>
      {leading}
      <View style={cardStyles.body}>
        <Text style={[themed.title, titleStyle]}>{title}</Text>
        {children}
      </View>
      {trailing === undefined ? <Icon name="chevronRight" size="sm" color="inkMuted" /> : trailing}
    </Card>
  );
}

type MetaRowProps = {
  icon: IconName;
  iconColor?: ColorToken;
  children: ReactNode;
  /** `bold` = Inter SemiBold in `ink` (prices, ratings); otherwise regular `inkMuted`. */
  font?: "regular" | "bold" | "system";
  /** Space below the row. */
  spaced?: boolean;
  style?: StyleProp<ViewStyle>;
};

/** Small icon + text line (`ds-svc__meta`), e.g. duration, price, rating, seniority. */
export function MetaRow({ icon, iconColor, children, font = "regular", spaced, style }: MetaRowProps) {
  const themed = useCardColors();
  const { colors } = useTheme();
  const strong = font === "bold";
  return (
    <View style={[cardStyles.metaRow, spaced && cardStyles.metaSpaced, style]}>
      <Icon name={icon} size="xs" rawColor={colors[iconColor ?? (strong ? "ink" : "inkMuted")]} />
      <Text style={[themed.metaText, strong && themed.metaStrong]}>{children}</Text>
    </View>
  );
}

/** Layout-only card styles (no colors) — safe to use from any file. */
export const cardStyles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", gap: 12 },
  body: { flex: 1, justifyContent: "center" },
  metaRow: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: 2 },
  metaSpaced: { marginBottom: 4 },
});

/** Themed card styles (internal). */
const useCardColors = makeStyles((colors) => ({
  surface: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    marginVertical: 6,
    marginHorizontal: 16,
    shadowColor: "#141414",
    shadowOffset: { width: 0, height: 1 },
    // light: 0 1px 2px rgba(20,20,20,.06) · dark: none (detected by the palette's background)
    shadowOpacity: colors.bg === "#F5F4F1" ? 0.06 : 0,
    shadowRadius: 2,
    elevation: colors.bg === "#F5F4F1" ? 1 : 0,
  },
  title: { fontSize: 16, lineHeight: 22, fontFamily: fonts.sansSemiBold, color: colors.ink },
  metaText: { fontSize: 14, lineHeight: 20, color: colors.inkMuted, fontFamily: fonts.sans },
  metaStrong: { color: colors.ink, fontFamily: fonts.sansSemiBold },
}));
