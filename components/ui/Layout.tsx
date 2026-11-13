import { StyleSheet, View, type ViewProps, type ViewStyle } from "react-native";

import { spacing } from "@/theme";

type Gap = keyof typeof spacing | number;

type StackProps = ViewProps & {
  gap?: Gap;
  align?: ViewStyle["alignItems"];
  justify?: ViewStyle["justifyContent"];
  wrap?: boolean;
  flex?: number;
};

const gapValue = (gap?: Gap) => (gap === undefined ? undefined : typeof gap === "number" ? gap : spacing[gap]);

/** Horizontal layout. Defaults to `alignItems: "center"` (the most common row in the app). */
export function Row({ gap, align = "center", justify, wrap, flex, style, ...rest }: StackProps) {
  return (
    <View
      {...rest}
      style={[
        layout.row,
        { alignItems: align, justifyContent: justify, gap: gapValue(gap), flex },
        wrap && layout.wrap,
        style,
      ]}
    />
  );
}

/** Vertical layout. */
export function Stack({ gap, align, justify, flex, style, ...rest }: StackProps) {
  return (
    <View {...rest} style={[{ alignItems: align, justifyContent: justify, gap: gapValue(gap), flex }, style]} />
  );
}

/** Shared layout styles for places that need a plain style object. */
export const layout = StyleSheet.create({
  row: { flexDirection: "row" },
  rowCenter: { flexDirection: "row", alignItems: "center" },
  rowBetween: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  center: { alignItems: "center", justifyContent: "center" },
  fill: { flex: 1 },
  wrap: { flexWrap: "wrap" },
});
