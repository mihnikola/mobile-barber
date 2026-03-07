import { useLocalization } from "@/context/LocalizationContext";
import React from "react";
import { Text, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

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
            fontWeight: "bold",
            color: "#FFFFFF",
            marginBottom: 5,
          }}
        >
          {localization.APPOINTMENTS.rateReservation.rated}
        </Text>

        <Text style={{ color: "white", fontSize: 40 }}>
          {myArray?.map((item, index) => {
            if (index < data?.rating?.rate) {
              return (
                <MaterialIcons
                  key={item.arrx}
                  name="star"
                  color="gold"
                  size={23}
                />
              );
            }
          })}
        </Text>
      </View>
    </View>
  );
}

export default ReservationMarkComponent;
