import { View } from "react-native";
import React from "react";
import { formatRating } from "@/lib/format";
import type { ApiRecord } from "@/context/types";
import { AppText, Avatar, Card, cardStyles, MetaRow } from "@/components/ui";
import { makeStyles } from "@/theme";

/**
 * Barber in reservation details (design system StaffCard look).
 * Compact (flat, smaller avatar) when the reservation has extra services, as before.
 */
const SharedDetailsEmployerCard = ({ data, otherServices }: { data: ApiRecord; otherServices?: ApiRecord[] }) => {
  const styles = useStyles();
  const { image, name, averageRating, userCount, seniority } = data;
  const compact = (otherServices?.length ?? 0) > 0;

  return (
    <Card style={[cardStyles.row, compact && styles.compact]}>
      {image ? (
        <Avatar uri={image} size={compact ? "sm" : "lg"} />
      ) : otherServices ? (
        <Avatar name={name} size={compact ? "sm" : "lg"} />
      ) : null}
      <View style={cardStyles.body}>
        <AppText variant="bodyStrong">{name}</AppText>
        <AppText variant="bodySm" color="inkMuted">
          {seniority?.title || seniority}
        </AppText>
        <View style={styles.meta}>
          <MetaRow icon="star" font="bold">{`${formatRating(averageRating)}/5`}</MetaRow>
          <MetaRow icon="person">{userCount || 0}</MetaRow>
        </View>
      </View>
    </Card>
  );
};

const useStyles = makeStyles(() => ({
  // embedded in the "with extra services" list: flat, tighter
  compact: { backgroundColor: "transparent", marginVertical: 0, paddingVertical: 10, boxShadow: [], borderWidth: 0 },
  meta: { flexDirection: "row", gap: 16 },
}));

export default SharedDetailsEmployerCard;
