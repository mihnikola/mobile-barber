import { View } from "react-native";
import React from "react";
import { useLocalization } from "@/context/LocalizationContext";
import type { ApiRecord } from "@/context/types";
import { AppText, Avatar, Card, cardStyles, MetaRow } from "@/components/ui";
import { makeStyles } from "@/theme";

/**
 * Service in reservation details (design system ServiceCard look).
 * Compact (flat, smaller thumb) when the reservation has extra services, as before.
 */
const SharedDetailsServiceCard = ({ data, otherServices }: { data: ApiRecord; otherServices?: ApiRecord[] }) => {
  const styles = useStyles();
  const { image, name, duration, price } = data;
  const { localization } = useLocalization();
  const compact = (otherServices?.length ?? 0) > 0;

  return (
    <Card style={[cardStyles.row, compact && styles.compact]}>
      {image ? <Avatar uri={image} size={compact ? "sm" : "lg"} /> : null}
      <View style={cardStyles.body}>
        <AppText variant="bodyStrong">
          {!name ? (localization.code === "en" ? name?.nameEn : name?.nameLocal) : name}
        </AppText>
        <View style={styles.meta}>
          <MetaRow icon="clock">{`${localization.DETAILS.duration} ${duration || data?.serviceDuration}`}</MetaRow>
          <MetaRow icon="price" font="bold">{`${localization.DETAILS.price} ${price || data?.servicePrice}`}</MetaRow>
        </View>
      </View>
    </Card>
  );
};

const useStyles = makeStyles(() => ({
  compact: { backgroundColor: "transparent", marginVertical: 0, paddingVertical: 10, shadowOpacity: 0, elevation: 0 },
  meta: { flexDirection: "row", flexWrap: "wrap", columnGap: 16 },
}));

export default SharedDetailsServiceCard;
