import { View, ScrollView } from "react-native";
import React from "react";
import { useReservation } from "@/context/ReservationContext";
import { useLocalSearchParams, router } from "expo-router";
import Note from "@/components/booking/Note";
import { useLocalization } from "@/context/LocalizationContext";
import BookSuccess from "./BookSuccess";
import { useDismissOnUnauthorizedFocus } from "@/hooks/useRouterTest";
import { coverImageAppointments } from "@/constants";
import { makeStyles } from "@/theme";
import { AppText, Button, layout } from "@/components/ui";
import { routes } from "@/lib/navigation/routes";

const ConfirmBookReservation = () => {
  const styles = useStyles();
  const { localization } = useLocalization();
  useDismissOnUnauthorizedFocus();

  const { reservation } = useReservation()!;

  const params = useLocalSearchParams();

  const confirmSubmitReservation = async () => {
    try {
      router.back();
      router.replace(routes.appointments.root);
    } catch (error) {
      console.error(error);
    }
  };

  if (reservation) {
    return (
      <ScrollView style={styles.container}>
        <BookSuccess
          image={coverImageAppointments}
          reservation={reservation}
        />
        <View style={styles.infoContainer}>
          <AppText variant={params?.status === "0" ? "displayMd" : "title"} style={styles.center}>
            {params?.status === "0"
              ? localization.SALON.success
              : localization.SALON.pendingTitle}
          </AppText>
          {params?.status !== "0" && (
            <AppText variant="bodySm" color="inkMuted" style={styles.center}>
              {localization.SALON.pendingSubTitle}
            </AppText>
          )}
          <Note />
        </View>
        <View style={styles.actions}>
          <Button style={layout.buttonBlock}
            onPress={confirmSubmitReservation}
            title={localization.BUTTONS.ok}
          />
        </View>
      </ScrollView>
    );
  }
};

export default ConfirmBookReservation;

const useStyles = makeStyles((colors) => ({
  container: { flex: 1, backgroundColor: colors.bg },
  infoContainer: { flex: 1, marginHorizontal: 16, marginTop: 16, gap: 12 },
  center: { textAlign: "center" },
  actions: { paddingHorizontal: 16, paddingTop: 24, paddingBottom: 32 },
}))
