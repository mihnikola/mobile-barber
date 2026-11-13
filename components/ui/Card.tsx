import type { ReactNode } from "react";
import { type StyleProp, StyleSheet, Text, type TextStyle, View, type ViewStyle } from "react-native";

import { type ColorToken, fonts, fontSize, makeStyles } from "@/theme";

import { Icon, type IconName } from "./Icon";
import { Pressable } from "./Pressable";

type CardProps = {
  children: ReactNode;
  /** Makes the card pressable (with press lock). */
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

/** Raised dark surface with rounded corners and shadow — base of every card/list item. */
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

/** Card row: leading visual, title + meta rows, trailing icon (service / employee / location lists). */
export function ListItem({ title, leading, children, trailing, onPress, style, titleStyle }: ListItemProps) {
  const themed = useCardColors();
  return (
    <Card onPress={onPress} style={[cardStyles.row, style]}>
      {leading}
      <View style={cardStyles.body}>
        <Text style={[themed.title, titleStyle]}>{title}</Text>
        {children}
      </View>
      {trailing === undefined ? <Icon name="chevronRight" size="xl" color="iconMuted" /> : trailing}
    </Card>
  );
}

type MetaRowProps = {
  icon: IconName;
  iconColor?: ColorToken;
  children: ReactNode;
  /** Text font: regular (default), bold, or system font (some legacy rows had none). */
  font?: "regular" | "bold" | "system";
  /** Space below the row. */
  spaced?: boolean;
  style?: StyleProp<ViewStyle>;
};

/** Small icon + text line, e.g. duration, price, rating, seniority. */
export function MetaRow({ icon, iconColor = "text", children, font = "regular", spaced, style }: MetaRowProps) {
  const themed = useCardColors();
  return (
    <View style={[cardStyles.metaRow, spaced && cardStyles.metaSpaced, style]}>
      <Icon name={icon} size="xs" color={iconColor} />
      <Text style={[themed.metaText, font !== "system" && { fontFamily: fonts[font] }]}>{children}</Text>
    </View>
  );
}

/** Layout-only card styles (no colors) — safe to use from any file. */
export const cardStyles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center" },
  body: { flex: 1, justifyContent: "center" },
  metaRow: { flexDirection: "row", alignItems: "center" },
  metaSpaced: { marginBottom: 4 },
});

/** Themed card styles (internal). */
const useCardColors = makeStyles((colors) => ({
  surface: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 15,
    shadowColor: colors.background,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: { fontSize: fontSize.lg, fontFamily: fonts.bold, color: colors.text, marginBottom: 4 },
  metaText: { fontSize: fontSize.sm, color: colors.text, marginLeft: 5 },
}));
