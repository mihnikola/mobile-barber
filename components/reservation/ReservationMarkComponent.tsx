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
function ReservationMarkComponent({data}) {
  const { localization } = useLocalization();

  return (
    <View style={{ alignItems: "center" }}>
      <Text style={{ color: "white", fontSize: 20 }}>
        {localization.APPOINTMENTS.rateReservation.ratedInfo}
      </Text>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 4,
        }}
      >
        <Text style={{ color: "white", fontSize: 40 }}>
          {myArray?.map((item, index) => {
            if (index < data?.rating?.rate) {
              return (
                <MaterialIcons
                  key={item.arrx}
                  name="star"
                  color="gold"
                  size={40}
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
