import { View, Text, StyleSheet } from "react-native";
import React, { useContext, useEffect } from "react";
import ReservationContext from "@/context/ReservationContext";
import SharedButton from "@/shared-components/SharedButton";
import { useLocalSearchParams, router } from "expo-router";
import Note from "@/shared-components/Note";
import { useLocalization } from "@/context/LocalizationContext";
import BookSuccess from "./BookSuccess";
import { useCompany } from "@/context/CompanyContext";

const ConfirmBookReservation = () => {
  const { localization } = useLocalization();

  const { reservation } = useContext(ReservationContext)!;
  const { company } = useCompany();


  const { responseData } = useLocalSearchParams();

  const submitReservationHandler = async () => {
    router.back();
    router.push({
      pathname: "/(tabs)/(03_calendar)",
      params: { reevalueted: 1 },
    });
  };
  if (!responseData) {
    return router.push("/(tabs)/(03_calendar)");
  }

  if (reservation && responseData) {
    return (
      <View style={styles.container}>
        <BookSuccess
          image={company?.media?.coverImageAppointments}
          logo={company?.media?.logo}
          reservation={reservation}
        />
        <View style={styles.infoContainer}>
          <Text style={styles.message}>{localization.SALON.success}</Text>
          <Note />
          <SharedButton
            onPress={submitReservationHandler}
            text={localization.BUTTONS.ok}
          />
        </View>
      </View>
    );
  }
};

export default ConfirmBookReservation;

const styles = StyleSheet.create({
  infoContainer: {
    flex: 1,
    justifyContent: "space-evenly",
    alignSelf: "center",
  },
  message: {
    fontSize: 30,
    padding: 20,
    color: "#fff",
    textAlign: "center",
    fontWeight: "900",
  },
  container: {
    flex: 1,
    backgroundColor: "black",
  },
});
