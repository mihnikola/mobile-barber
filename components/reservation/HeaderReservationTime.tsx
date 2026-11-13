import { convertDateDetails } from "@/lib/date";
import { useLocalization } from "@/context/LocalizationContext";
import { router } from "expo-router";
import { View } from "react-native";
import type { ApiRecord } from "@/context/types";
import { fonts, makeStyles } from "@/theme";
import { AppText, Icon, Pressable } from "@/components/ui";

/** Appointment details header (design system `ds-big-when`): date, big time range, place. */
const HeaderReservationTime = ({ data }: { data: ApiRecord | null }) => {
  const styles = useStyles();
  const { localization } = useLocalization();
  if (!data) return null;

  return (
    <View>
      <Pressable hitSlop={20} onPress={() => router.back()} style={styles.back}>
        <Icon name="back" />
      </Pressable>
      <AppText variant="body" color="inkMuted">
        {convertDateDetails(data?.startDate, localization.code)}
      </AppText>
      <AppText style={styles.time}>
        {data?.startDateTime} – {data?.finishedTime}
      </AppText>
      <View style={styles.place}>
        <Icon name="locationDot" size="xs" color="inkMuted" />
        <AppText variant="bodySm" color="inkMuted">
          {data?.place}
        </AppText>
      </View>
    </View>
  );
};

const useStyles = makeStyles((colors) => ({
  back: { alignSelf: "flex-start", padding: 4, marginBottom: 12 },
  time: { fontFamily: fonts.displaySemiBold, fontSize: 40, lineHeight: 44, color: colors.ink, marginTop: 2 },
  place: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: 6 },
}));

export default HeaderReservationTime;
