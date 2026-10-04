import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useLocalization } from "@/context/LocalizationContext";
import { ColorsBarber } from "@/constants/Colors";

const CardNoReservation = () => {
  const {localization} = useLocalization();
  return (
    <View style={styles.card}>
      <Text style={styles.capture}>{localization.APPOINTMENTS.error}</Text>
      <Text style={styles.description}>
      {localization.APPOINTMENTS.noLogin}
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  card: {
    backgroundColor: ColorsBarber.dark.background,
    display: "flex",
    flexDirection: "column",
    width: "100%",
    marginTop: 20,
    borderRadius: 20,
    padding: 10,
    gap: 20,
    height: 100,
  },
  capture: {
    fontSize: 20,
    textAlign: "center",
    padding: 10,
    fontFamily: "OldStandard-Bold",
   color: ColorsBarber.dark.textColor,
  },
  description: {
    fontSize: 16,
    color: ColorsBarber.dark.textColor,
    fontFamily: "OldStandard-Regular",
    textAlign: "center",
  },
});

export default CardNoReservation;
