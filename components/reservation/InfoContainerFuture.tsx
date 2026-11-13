import { useLocalization } from "@/context/LocalizationContext";
import { convertToDayTime } from "@/lib/date";
import React from "react";
import { View } from "react-native";
import type { ApiRecord } from "@/context/types";
import { makeStyles } from "@/theme";
import { AppText, type BadgeStatus, Icon, StatusBadge } from "@/components/ui";

/** API status → badge (2 pending · 0 approved · 1 rejected). */
const BADGE: Record<number, BadgeStatus> = { 2: "pending", 0: "confirmed", 1: "cancelled" };

/** Body of an upcoming appointment card (design system `ds-appt__body`). */
const InfoContainerFuture = ({ item }: { item: ApiRecord }) => {
  const styles = useStyles();
  const { localization } = useLocalization();
  const labels: Record<BadgeStatus, string> = {
    pending: localization.APPOINTMENTS.pending,
    confirmed: localization.APPOINTMENTS.approved,
    cancelled: localization.APPOINTMENTS.rejected,
    done: "",
    new: "",
  };
  const badge = BADGE[item.status];

  return (
    <View style={styles.body}>
      <View style={styles.top}>
        <AppText variant="bodyStrong" numberOfLines={2} ellipsizeMode="tail" style={styles.title}>
          {item.service?.name} {item?.otherServices?.length > 0 && "+ " + localization.SERVICES.plus}
        </AppText>
        {badge && <StatusBadge status={badge} label={labels[badge]} />}
      </View>
      <View style={styles.line}>
        <Icon name="clock" size="xs" color="inkMuted" />
        <AppText variant="bodySm" color="inkMuted">
          {convertToDayTime(item?.startDate)} – {convertToDayTime(item?.endDate)}
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

export default InfoContainerFuture;
