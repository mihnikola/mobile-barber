import { addMinutesToTime, convertDate, formatTimeRange } from "@/lib/date";
import { useLocalization } from "@/context/LocalizationContext";
import React from "react";
import { View } from "react-native";
import type { ApiRecord } from "@/context/types";
import { fonts, makeStyles } from "@/theme";
import { AppText, BackButton, Icon } from "@/components/ui";

/** Booking summary header (design system `ds-big-when`): date, big time range, address. */
function SharedReservationData({ reservation }: { reservation: ApiRecord | null }) {
  const styles = useStyles();
  const { localization } = useLocalization();
  const totals = reservation?.otherServices?.reduce(
    (acc: { totalPrice: number; totalDuration: number }, current: ApiRecord) => {
      acc.totalPrice += current.price;
      acc.totalDuration += current.duration;
      return acc;
    },
    { totalPrice: 0, totalDuration: 0 },
  );

  return (
    <View>
      <BackButton style={styles.back} />
      <AppText variant="body" color="inkMuted">
        {convertDate(reservation?.dateReservation?.dateString || reservation?.dateReservation, localization.code)}
      </AppText>
      <AppText style={styles.time}>
        {formatTimeRange(
          reservation?.timeData?.value,
          reservation && addMinutesToTime(reservation?.timeData?.value, reservation?.service?.serviceDuration, totals?.totalDuration),
        )}
      </AppText>
      <View style={styles.place}>
        <Icon name="locationDot" size="xs" color="inkMuted" />
        <AppText variant="bodySm" color="inkMuted">
          {reservation?.location.address || reservation?.location[0].address}
        </AppText>
      </View>
    </View>
  );
}

const useStyles = makeStyles((colors) => ({
  back: { alignSelf: "flex-start", marginBottom: 12 },
  time: { fontFamily: fonts.displaySemiBold, fontSize: 40, lineHeight: 44, color: colors.ink, marginTop: 2 },
  place: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: 6 },
}));

export default SharedReservationData;
