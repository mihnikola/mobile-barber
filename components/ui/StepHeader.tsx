import { View } from "react-native";

import { fonts, makeStyles } from "@/theme";

import { AppText } from "./AppText";
import { BackButton } from "./BackButton";

type StepHeaderProps = {
  /** 1-based current step. */
  step: number;
  total: number;
  /** "Korak 3 od 4" — already localized. */
  stepLabel: string;
  title: string;
  onBack?: () => void;
};

/** Booking flow header (design system `ds-steph` + `ds-progress`): back, step count, title, progress bar. */
export function StepHeader({ step, total, stepLabel, title, onBack }: StepHeaderProps) {
  const s = useStyles();
  return (
    <View>
      <View style={s.row}>
        <BackButton onPress={onBack} />
        <View style={s.text}>
          <AppText style={s.step}>{stepLabel}</AppText>
          <AppText variant="displayLg" style={s.title} numberOfLines={1}>
            {title}
          </AppText>
        </View>
      </View>
      <View style={s.progress}>
        {Array.from({ length: total }, (_, i) => (
          <View key={i} style={[s.segment, i < step && s.segmentOn]} />
        ))}
      </View>
    </View>
  );
}

const useStyles = makeStyles((colors) => ({
  row: { flexDirection: "row", alignItems: "center", gap: 12 },
  text: { flex: 1 },
  step: { fontFamily: fonts.sansMedium, fontSize: 13, lineHeight: 18, color: colors.inkMuted },
  title: { fontSize: 30, lineHeight: 33 },
  progress: { flexDirection: "row", gap: 4, marginTop: 12 },
  segment: { flex: 1, height: 4, borderRadius: 2, backgroundColor: colors.surfaceSunken },
  segmentOn: { backgroundColor: colors.primary },
}));
