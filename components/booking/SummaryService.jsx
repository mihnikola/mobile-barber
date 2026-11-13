import { formatDuration, formatPrice } from "@/lib/format";
import React from "react";
import { View } from "react-native";
import { useLocalization } from "@/context/LocalizationContext";
import { cardShadow, makeStyles } from "@/theme";
import { AppText } from "@/components/ui";

function SummaryService({ service, data, totalDuration, totalPrice }) {
  const styles = useStyles();
  const totals = data?.reduce(
    (acc, current) => {
      acc.totalPrice += current.price;
      acc.totalDuration += current.duration;
      return acc;
    },
    { totalPrice: 0, totalDuration: 0 },
  );
  const { localization } = useLocalization();
  const durationValue = totalDuration || totals.totalDuration + service?.serviceDuration || service?.duration;
  const priceValue = totalPrice || totals.totalPrice + service?.servicePrice || service?.price;
  return (
    // ds-sum: label / value rows, total emphasised under a hairline
    <View style={styles.sum}>
      <View style={styles.row}>
        <AppText variant="body" color="inkMuted">
          {localization.SERVICES.totalDuration}
        </AppText>
        <AppText variant="body">{formatDuration(durationValue)}</AppText>
      </View>
      <View style={[styles.row, styles.total]}>
        <AppText variant="bodyStrong">{localization.SERVICES.totalPrice}</AppText>
        <AppText variant="bodyStrong" size={17}>
          {formatPrice(priceValue, localization.code)}
        </AppText>
      </View>
    </View>
  );
}

const useStyles = makeStyles((colors) => ({
  sum: { marginHorizontal: 16, marginVertical: 8, padding: 16, borderRadius: 16, backgroundColor: colors.surface, ...cardShadow(colors) },
  row: { flexDirection: "row", justifyContent: "space-between", gap: 12, paddingVertical: 6 },
  total: { borderTopWidth: 1, borderTopColor: colors.line, marginTop: 6, paddingTop: 12 },
}));

export default SummaryService;
