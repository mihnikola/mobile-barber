import { StyleSheet, Text, type TextProps } from "react-native";

import { type ColorToken, fonts, fontSize, typeScale, useTheme } from "@/theme";

/**
 * Text presets.
 *  - Design system (Phase 5): displayXl/Lg/Md (Barlow Condensed, uppercase), title, bodyLg, body,
 *    bodyStrong, bodySm, label, caption (Inter) — from theme/typography `typeScale`.
 *  - legacy*: the Phase 2 presets (Barlow Condensed everywhere), kept 1:1 for screens that are not
 *    restyled yet. Removed when the last screen moves to the design-system variants (Phase 5.6).
 */
const VARIANTS = {
  ...typeScale,

  /** bold 22 */
  legacyHeading: { fontFamily: fonts.bold, fontSize: fontSize.xxl },
  /** bold 20 */
  legacyTitle: { fontFamily: fonts.bold, fontSize: fontSize.xl },
  /** bold 18 */
  legacySubtitle: { fontFamily: fonts.bold, fontSize: fontSize.lg },
  /** bold 16 */
  legacyLabel: { fontFamily: fonts.bold, fontSize: fontSize.md },
  /** bold 14 */
  legacyLabelSm: { fontFamily: fonts.bold, fontSize: fontSize.sm },
  /** regular 16 */
  legacyBodyLg: { fontFamily: fonts.regular, fontSize: fontSize.md },
  /** regular 14 */
  legacyBody: { fontFamily: fonts.regular, fontSize: fontSize.sm },
  /** regular 12 */
  legacyCaption: { fontFamily: fonts.regular, fontSize: fontSize.xs },
} as const;

export type TextVariant = keyof typeof VARIANTS;

export type AppTextProps = TextProps & {
  /** Preset for font family + size. Default `body` (Inter 16). */
  variant?: TextVariant;
  /** Color token. Default `ink` (design system) / `text` for legacy variants. */
  color?: ColorToken;
  /** Override the weight without changing the size (Inter SemiBold / Regular; Barlow for legacy). */
  bold?: boolean;
  /** Override size (token key or exact number) without changing the family. */
  size?: keyof typeof fontSize | number;
  align?: "auto" | "left" | "right" | "center" | "justify";
};

/** The only Text component screens should use. Extra `style` is applied last. */
export function AppText({ variant = "body", color, bold, size, align, style, ...rest }: AppTextProps) {
  const { colors } = useTheme();
  const legacy = variant.startsWith("legacy");
  const base = VARIANTS[variant];
  return (
    <Text
      {...rest}
      style={[
        base,
        { color: colors[color ?? "ink"] },
        bold !== undefined && {
          fontFamily: legacy ? (bold ? fonts.bold : fonts.regular) : bold ? fonts.sansSemiBold : fonts.sans,
        },
        size !== undefined && { fontSize: typeof size === "number" ? size : fontSize[size] },
        align && { textAlign: align },
        style,
      ]}
    />
  );
}

/** Plain style objects for places that cannot render AppText (e.g. TextInput, third-party props). */
export const textStyles = StyleSheet.create(VARIANTS);
