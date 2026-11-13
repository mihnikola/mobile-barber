import { StyleSheet, Text, type TextProps } from "react-native";

import { type ColorToken, fonts, typeScale, useTheme } from "@/theme";

/**
 * Text presets = the design-system type scale (theme/typography `typeScale`):
 * displayXl/Lg/Md (Barlow Condensed, uppercase), title, bodyLg, body, bodyStrong, bodySm, label, caption (Inter).
 */
const VARIANTS = typeScale;

export type TextVariant = keyof typeof VARIANTS;

export type AppTextProps = TextProps & {
  /** Preset for font family + size. Default `body` (Inter 16). */
  variant?: TextVariant;
  /** Color token. Default `ink`. */
  color?: ColorToken;
  /** Override the weight without changing the size (Inter SemiBold / Regular). */
  bold?: boolean;
  /** Override the size in px (prefer a variant). */
  size?: number;
  align?: "auto" | "left" | "right" | "center" | "justify";
};

/** The only Text component screens should use. Extra `style` is applied last. */
export function AppText({ variant = "body", color, bold, size, align, style, ...rest }: AppTextProps) {
  const { colors } = useTheme();
  const base = VARIANTS[variant];
  // When the size differs from the variant and no lineHeight is given, derive one —
  // otherwise the variant's lineHeight would clip larger text.
  const flat = StyleSheet.flatten(style);
  const effectiveSize = flat?.fontSize ?? size ?? base.fontSize ?? 16;
  const fixLineHeight =
    effectiveSize !== base.fontSize && flat?.lineHeight === undefined ? { lineHeight: Math.round(effectiveSize * 1.3) } : null;
  return (
    <Text
      {...rest}
      style={[
        base,
        { color: colors[color ?? "ink"] },
        bold !== undefined && { fontFamily: bold ? fonts.sansSemiBold : fonts.sans },
        size !== undefined && { fontSize: size },
        align && { textAlign: align },
        fixLineHeight,
        style,
      ]}
    />
  );
}

/** Plain style objects for places that cannot render AppText (e.g. TextInput, third-party props). */
export const textStyles = StyleSheet.create(VARIANTS);
