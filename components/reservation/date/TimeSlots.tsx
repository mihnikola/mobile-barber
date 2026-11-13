import React from "react";
import { useWindowDimensions, View } from "react-native";

import { useLocalization } from "@/context/LocalizationContext";
import type { ApiRecord } from "@/context/types";
import { fonts, makeStyles, radii } from "@/theme";
import { AppText, Pressable } from "@/components/ui";

const COLUMNS = 5;
const GAP = 6;
const SIDE = 16;

type Props = {
  /** Free times from the API: `{ value: "HH:MM", ... }`. */
  data: ApiRecord[];
  selectedItem: ApiRecord | null;
  setSelectedItem: (item: ApiRecord) => void;
};

/** Time slots (design system `TimeSlots`): 5-column grid grouped into morning / afternoon with a free count. */
export default function TimeSlots({ data, selectedItem, setSelectedItem }: Props) {
  const styles = useStyles();
  const { localization } = useLocalization();
  const { width } = useWindowDimensions();
  const slotWidth = Math.floor((width - SIDE * 2 - GAP * (COLUMNS - 1)) / COLUMNS);

  const hourOf = (item: ApiRecord) => Number(String(item?.value ?? "").split(":")[0]);
  const groups = [
    { key: "morning", label: localization.DATE.morning, items: data.filter((i) => hourOf(i) < 12) },
    { key: "afternoon", label: localization.DATE.afternoon, items: data.filter((i) => hourOf(i) >= 12) },
  ].filter((g) => g.items.length > 0);

  return (
    <View style={styles.container}>
      {groups.map((group) => (
        <View key={group.key}>
          <View style={styles.label}>
            <AppText style={styles.labelText}>{group.label}</AppText>
            <AppText style={[styles.labelText, styles.count]}>
              {localization.DATE.freeCount.replace("{count}", String(group.items.length))}
            </AppText>
          </View>
          <View style={styles.grid}>
            {group.items.map((item) => {
              const selected = selectedItem?.value === item.value;
              return (
                <Pressable
                  key={item.value}
                  accessibilityState={{ selected }}
                  onPress={() => setSelectedItem(item)}
                  style={[styles.slot, { width: slotWidth }, selected && styles.slotSelected]}
                >
                  <AppText style={[styles.time, selected && styles.timeSelected]}>{item.value}</AppText>
                </Pressable>
              );
            })}
          </View>
        </View>
      ))}
    </View>
  );
}

const useStyles = makeStyles((colors) => ({
  container: { paddingHorizontal: SIDE, gap: 12 },
  label: { flexDirection: "row", justifyContent: "space-between", marginBottom: 6 },
  labelText: { fontFamily: fonts.sansSemiBold, fontSize: 12, lineHeight: 16, color: colors.inkMuted },
  count: { fontFamily: fonts.sansMedium },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: GAP },
  slot: {
    minHeight: 38,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radii.sm,
    borderWidth: 1.5,
    borderColor: colors.lineStrong,
  },
  slotSelected: { backgroundColor: colors.primary, borderColor: colors.primary },
  time: { fontFamily: fonts.sansSemiBold, fontSize: 14, color: colors.ink, fontVariant: ["tabular-nums"] },
  timeSelected: { color: colors.onPrimary },
}));
