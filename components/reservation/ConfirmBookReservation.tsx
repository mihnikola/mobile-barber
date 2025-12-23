import { View, Text, StyleSheet, ScrollView } from "react-native";
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

  const confirmSubmitReservation = async () => {
    try {
      router.back();
      router.replace("/(tabs)/(03_calendar)");
    } catch (error) {
      console.error(error);
    }
  };

  if (reservation) {
    return (
      <ScrollView style={styles.container}>
        <BookSuccess
          image={company?.media?.coverImageAppointments}
          logo={company?.media?.logo}
          reservation={reservation}
        />
        <View style={styles.infoContainer}>
          <Text style={styles.message}>{localization.SALON.success}</Text>
          <Note />
        </View>
        <View style={{ marginHorizontal: 30, marginVertical: 50 }}>
          <SharedButton
            onPress={confirmSubmitReservation}
            text={localization.BUTTONS.ok}
          />
        </View>
      </ScrollView>
    );
  }
};

export default ConfirmBookReservation;

const styles = StyleSheet.create({
  infoContainer: {
    flex: 1,
    marginHorizontal: 20
  },
  message: {
    fontSize: 30,
    padding: 20,
    color: "#fff",
    textAlign: "center",
    fontWeight: "900",
    margin: 10
  },
  container: {
    flex: 1,
    backgroundColor: "black",
  },
});
