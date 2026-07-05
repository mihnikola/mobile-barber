import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useContext, useEffect } from "react";
import ReservationContext from "@/context/ReservationContext";
import SharedButton from "@/shared-components/SharedButton";
import { useLocalSearchParams, router } from "expo-router";
import Note from "@/shared-components/Note";
import { useLocalization } from "@/context/LocalizationContext";
import BookSuccess from "./BookSuccess";
import { useCompany } from "@/context/CompanyContext";
import { useDismissOnUnauthorizedFocus } from "@/hooks/useRouterTest";
import { coverImageAppointments, logoImage } from "@/constants";

const ConfirmBookReservation = () => {
  const { localization } = useLocalization();
  useDismissOnUnauthorizedFocus();

  const { reservation } = useContext(ReservationContext)!;
  const { company } = useCompany();

  const params = useLocalSearchParams();

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
          image={coverImageAppointments}
          logo={logoImage}
          reservation={reservation}
        />
        <View style={styles.infoContainer}>
          <Text
            style={[
              styles.message,
              params?.status === "0" && styles.messageApproved,
            ]}
          >
            {params?.status === "0"
              ? localization.SALON.success
              : localization.SALON.pendingTitle}
          </Text>
          {params?.status !== "0" && (
            <Text style={styles.pendingSubTitle}>
              {localization.SALON.pendingSubTitle}
            </Text>
          )}
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
    marginHorizontal: 20,
  },
  pendingSubTitle: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
    margin: 10,
  },
  message: {
    fontSize: 21,
    padding: 10,
    margin: 10,
    color: "#fff",
    textAlign: "center",
    fontWeight: "900",
  },
  messageApproved: {
    fontSize: 30,
    padding: 20,
  },

  container: {
    flex: 1,
    backgroundColor: "black",
  },
});
