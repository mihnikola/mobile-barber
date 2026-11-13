import { addMinutesToTime, convertDate } from "@/lib/date";
import { useLocalization } from "@/context/LocalizationContext";
import React from "react";
import { Image, View } from "react-native";
import type { ApiRecord } from "@/context/types";
import { fonts, makeStyles, useTheme } from "@/theme";
import { AppText } from "@/components/ui";

/**
 * Booking success header (Phase 5.6): current logo (tinted like the login screen) + big time
 * range + date. The faded cover photo is gone (DS: no photos behind content).
 */
function BookSuccess({ reservation }: { image?: unknown; reservation: ApiRecord }) {
  const styles = useStyles();
  const { colors } = useTheme();
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
    <View style={styles.content}>
      <Image source={require("@/assets/images/homeSplash.png")} style={[styles.logo, { tintColor: colors.ink }]} />
      <AppText style={styles.time}>
        {reservation?.timeData?.value} –{" "}
        {addMinutesToTime(reservation?.timeData?.value, reservation?.service?.serviceDuration, totals?.totalDuration)}
      </AppText>
      <AppText variant="bodyLg" color="inkMuted">
        {convertDate(reservation?.dateReservation?.dateString || reservation?.dateReservation, localization.code)}
      </AppText>
    </View>
  );
}

const useStyles = makeStyles((colors) => ({
  content: { alignItems: "center", paddingHorizontal: 16, paddingTop: 48, gap: 4 },
  logo: { height: 72, resizeMode: "contain", marginBottom: 24 },
  time: { fontFamily: fonts.displaySemiBold, fontSize: 40, lineHeight: 44, color: colors.ink },
}));

export default BookSuccess;
