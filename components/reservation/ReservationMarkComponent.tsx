import { useLocalization } from "@/context/LocalizationContext";
import React from "react";
import { Text, View } from "react-native";
import { colors, fonts } from "@/theme";
import { Icon } from "@/components/ui";

const myArray = [
  { arrx: "10000" },
  { arrx: "1111110" },
  { arrx: "232222" },
  { arrx: "4545453" },
  { arrx: "asdasdasd" },
];
function ReservationMarkComponent({ data }) {
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
        <Text
          style={{
            fontSize: 18,
            fontFamily: fonts.bold,
            color: colors.text,
            marginBottom: 5,
          }}
        >
          {localization.APPOINTMENTS.rateReservation.rated}
        </Text>

        <Text style={{color: colors.text, fontSize: 40 }}>
          {myArray?.map((item, index) => {
            if (index < data?.rating?.rate) {
              return (
                <Icon name="star" key={item.arrx} size={23} color="text" />
              );
            }
          })}
        </Text>
      </View>
    </View>
  );
}

export default ReservationMarkComponent;
