import { StyleSheet, Text, type TextProps } from "react-native";

import { colors, fonts, fontSize, type ColorToken } from "@/theme";

/**
 * Text presets, taken from the most frequent style combinations in the app
 * (measured 2026-11-13). Values are 1:1 with today's look (D-002).
 */
const VARIANTS = {
  /** bold 22 — section / screen headings */
  heading: { fontFamily: fonts.bold, fontSize: fontSize.xxl },
  /** bold 20 — card / block titles */
  title: { fontFamily: fonts.bold, fontSize: fontSize.xl },
  /** bold 18 — sub titles, names */
  subtitle: { fontFamily: fonts.bold, fontSize: fontSize.lg },
  /** bold 16 */
  label: { fontFamily: fonts.bold, fontSize: fontSize.md },
  /** bold 14 */
  labelSm: { fontFamily: fonts.bold, fontSize: fontSize.sm },
  /** regular 16 */
  bodyLg: { fontFamily: fonts.regular, fontSize: fontSize.md },
  /** regular 14 — default */
  body: { fontFamily: fonts.regular, fontSize: fontSize.sm },
  /** regular 12 */
  caption: { fontFamily: fonts.regular, fontSize: fontSize.xs },
} as const;

export type TextVariant = keyof typeof VARIANTS;

export type AppTextProps = TextProps & {
  /** Preset for font family + size. Default `body`. */
  variant?: TextVariant;
  /** Color token. Default `text` (white). */
  color?: ColorToken;
  /** Override weight family without changing size. */
  bold?: boolean;
  /** Override size (token key or exact number) without changing the family. */
  size?: keyof typeof fontSize | number;
  align?: "auto" | "left" | "right" | "center" | "justify";
};

/** The only Text component screens should use. Extra `style` is applied last. */
export function AppText({ variant = "body", color = "text", bold, size, align, style, ...rest }: AppTextProps) {
  const base = VARIANTS[variant];
  return (
    <Text
      {...rest}
      style={[
        base,
        { color: colors[color] },
        bold !== undefined && { fontFamily: bold ? fonts.bold : fonts.regular },
        size !== undefined && { fontSize: typeof size === "number" ? size : fontSize[size] },
        align && { textAlign: align },
        style,
      ]}
    />
  );
}

/** Plain style objects for places that cannot render AppText (e.g. TextInput, third-party props). */
export const textStyles = StyleSheet.create(VARIANTS);
