import { useLocalization } from "@/context/LocalizationContext";
import { addMinutesToTime, convertToDayTime, formatTimeRange } from "@/lib/date";
import React from "react";
import { View } from "react-native";
import type { ApiRecord } from "@/context/types";
import { makeStyles } from "@/theme";
import { AppText, Icon, StatusBadge } from "@/components/ui";

/** Body of a past appointment card: muted details + rated / rate-us state as a badge. */
const InfoContainerPast = ({ item }: { item: ApiRecord }) => {
  const styles = useStyles();
  const { localization } = useLocalization();

  return (
    <View style={styles.body}>
      <View style={styles.top}>
        <AppText variant="bodyStrong" color="inkMuted" numberOfLines={2} ellipsizeMode="tail" style={styles.title}>
          {item.service?.name} {item?.otherServices?.length > 0 && "+ " + localization.SERVICES.plus}
        </AppText>
        <StatusBadge
          status={item.rating ? "done" : "new"}
          label={item.rating ? localization.APPOINTMENTS.rateReservation.rated : localization.APPOINTMENTS.rateReservation.rateUs}
        />
      </View>
      <View style={styles.line}>
        <Icon name="clock" size="xs" color="inkMuted" />
        <AppText variant="bodySm" color="inkMuted">
          {formatTimeRange(
            convertToDayTime(item?.startDate),
            addMinutesToTime(convertToDayTime(item?.startDate), item?.service?.duration),
          )}
        </AppText>
      </View>
      <View style={styles.line}>
        <Icon name="locationDot" size="xs" color="inkMuted" />
        <AppText variant="bodySm" color="inkMuted" numberOfLines={1} ellipsizeMode="tail" style={styles.flex}>
          {item?.place?.address}
        </AppText>
      </View>
    </View>
  );
};

const useStyles = makeStyles(() => ({
  body: { flex: 1, minWidth: 0 },
  top: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", gap: 8 },
  title: { flex: 1 },
  line: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: 6 },
  flex: { flex: 1 },
}));

export default InfoContainerPast;
