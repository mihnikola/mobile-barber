import { useLocalization } from "@/context/LocalizationContext";
import React from "react";
import { View } from "react-native";
import { fonts, useTheme } from "@/theme";
import { AppText, Icon } from "@/components/ui";

const myArray = [
  { arrx: "10000" },
  { arrx: "1111110" },
  { arrx: "232222" },
  { arrx: "4545453" },
  { arrx: "asdasdasd" },
];
function ReservationMarkComponent({ data }) {
  const { colors } = useTheme();
  const { localization } = useLocalization();

  return (
    <View style={{ alignItems: "flex-start" }}>
      <View
        style={{
          alignItems: "flex-start",
          gap: 4,
          marginBottom: 5,
        }}
      >
        <AppText
          style={{
            fontSize: 18,
            fontFamily: fonts.sansSemiBold,
            color: colors.ink,
            marginBottom: 5,
          }}
        >
          {localization.APPOINTMENTS.rateReservation.rated}
        </AppText>

        <AppText style={{color: colors.ink, fontSize: 40 }}>
          {myArray?.map((item, index) => {
            if (index < data?.rating?.rate) {
              return (
                <Icon name="star" key={item.arrx} size={23} color="ink" />
              );
            }
          })}
        </AppText>
      </View>
    </View>
  );
}

export default ReservationMarkComponent;
