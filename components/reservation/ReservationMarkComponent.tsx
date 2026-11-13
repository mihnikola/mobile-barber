import { useLocalization } from "@/context/LocalizationContext";
import React from "react";
import { View } from "react-native";
import type { ApiRecord } from "@/context/types";
import { useTheme } from "@/theme";
import { AppText, Icon } from "@/components/ui";

/** Given rating (read-only): label + 5 stars, same look as the StarRating input. */
function ReservationMarkComponent({ data }: { data: ApiRecord | null }) {
  const { colors } = useTheme();
  const { localization } = useLocalization();
  const rate = Number(data?.rating?.rate) || 0;

  return (
    <View style={{ gap: 8 }}>
      <AppText variant="bodyStrong">{localization.APPOINTMENTS.rateReservation.rated}</AppText>
      <View style={{ flexDirection: "row", gap: 4 }}>
        {[1, 2, 3, 4, 5].map((i) => (
          <Icon
            key={i}
            name={i <= rate ? "starSolid" : "starOutline"}
            size={24}
            rawColor={i <= rate ? colors.star : colors.inkFaint}
          />
        ))}
      </View>
    </View>
  );
}

export default ReservationMarkComponent;
