import { View, ScrollView } from "react-native";
import React from "react";
import { useReservation } from "@/context/ReservationContext";
import { useLocalSearchParams, router } from "expo-router";
import Note from "@/components/booking/Note";
import { useLocalization } from "@/context/LocalizationContext";
import BookSuccess from "./BookSuccess";
import { useDismissOnUnauthorizedFocus } from "@/hooks/useRouterTest";
import { coverImageAppointments } from "@/constants";
import { fonts, makeStyles } from "@/theme";
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
          <AppText
            style={[
              styles.message,
              params?.status === "0" && styles.messageApproved,
            ]}
          >
            {params?.status === "0"
              ? localization.SALON.success
              : localization.SALON.pendingTitle}
          </AppText>
          {params?.status !== "0" && (
            <AppText variant="bodySm" style={styles.pendingSubTitle}>
              {localization.SALON.pendingSubTitle}
            </AppText>
          )}
          <Note />
        </View>
        <View style={{ marginHorizontal: 30, marginVertical: 50 }}>
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
  infoContainer: {
    flex: 1,
    marginHorizontal: 20,
  },
  pendingSubTitle: {
    textAlign: "center",
    margin: 10,
  },
  message: {
    fontSize: 21,
    padding: 10,
    margin: 10,
   color: colors.ink,
    textAlign: "center",
    fontFamily: fonts.sansSemiBold,
  },
  messageApproved: {
    fontSize: 30,
    padding: 20,
  },

  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
}));
