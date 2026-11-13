import { Text, View } from "react-native";

import { cardShadow, fonts, makeStyles } from "@/theme";

import { Pressable } from "./Pressable";

export type SegmentedOption<T extends string> = { value: T; label: string; count?: number };

type SegmentedTabsProps<T extends string> = {
  options: SegmentedOption<T>[];
  value: T;
  onChange: (value: T) => void;
};

/** Switch between 2–3 views of the same content (`ds-tabs`), e.g. Predstojeći / Prošli. */
export function SegmentedTabs<T extends string>({ options, value, onChange }: SegmentedTabsProps<T>) {
  const s = useStyles();
  return (
    <View style={s.track} accessibilityRole="tablist">
      {options.map((o) => {
        const selected = o.value === value;
        return (
          <Pressable
            key={o.value}
            accessibilityRole="tab"
            accessibilityState={{ selected }}
            onPress={() => onChange(o.value)}
            style={[s.tab, selected && s.tabSelected]}
          >
            <Text style={[s.label, selected && s.labelSelected]}>{o.label}</Text>
            {o.count ? (
              <View style={s.count}>
                <Text style={s.countText}>{o.count}</Text>
              </View>
            ) : null}
          </Pressable>
        );
      })}
    </View>
  );
}

const useStyles = makeStyles((colors) => ({
  track: { flexDirection: "row", padding: 4, gap: 4, borderRadius: 12, backgroundColor: colors.surfaceSunken },
  tab: {
    flex: 1,
    minHeight: 40,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  tabSelected: {
    backgroundColor: colors.surface,
    ...cardShadow(colors),
  },
  label: {
    fontFamily: fonts.sansSemiBold,
    fontSize: 13,
    letterSpacing: 0.65,
    textTransform: "uppercase",
    color: colors.inkMuted,
  },
  labelSelected: { color: colors.ink },
  count: { minWidth: 20, paddingHorizontal: 6, borderRadius: 999, backgroundColor: colors.primary, alignItems: "center" },
  countText: { fontFamily: fonts.sansSemiBold, fontSize: 12, color: colors.onPrimary },
}));
