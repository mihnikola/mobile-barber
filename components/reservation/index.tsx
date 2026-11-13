import {
  View,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import React from "react";
import { useReservation } from "@/context/ReservationContext";
import Details from "@/components/booking/Details";
import SharedButton from "@/components/legacy/SharedButton";
import SharedInputTextArea from "@/components/legacy/SharedInputTextArea";
import { useLocalization } from "@/context/LocalizationContext";
import { useCompany } from "@/context/CompanyContext";
import { SharedMessage } from "@/components/legacy/SharedMessage";
import { router, useLocalSearchParams } from "expo-router";
import { useLastPathNavigation } from "@/context/NavigationContext";
import { routes } from "@/lib/navigation/routes";
import { useAppointment } from "@/context/AppointmentContext";
import { coverImageAppointments } from "@/constants";
import HeaderCoverImageContainer from "@/components/layout/HeaderCoverImageContainer";
import { Icon } from "@/components/ui";
import { makeStyles } from "@/theme";

const Reservation = () => {
  const styles = useStyles();
  const { reservation } = useReservation()!;
  const { localization } = useLocalization();
  const { status } = useLocalSearchParams();
  const { company } = useCompany();
  const { saveLastTab } = useLastPathNavigation();
  const {
    submitReservationHandler,
    isLoading,
    error,
    setError,
    setIsError,
    IsError,
    description,
    setDescription,
    setDistinctReservation,
    distinctReservation,
  } = useAppointment();

  const confirmHandler = () => {
    setIsError(false);
    setError(null);
  };

  const confirmDistinctHandler = () => {
    setDistinctReservation(null);
    router.back();
    router.replace({ pathname: routes.booking.calendar });
  };

  /** Book, then go to the success page (navigation moved out of AppointmentContext, Phase 4b). */
  const submitHandler = async () => {
    const result = await submitReservationHandler();
    if (result) {
      router.dismissAll();
      saveLastTab(null);
      router.push({ pathname: routes.booking.success, params: { status: result.status } });
    }
  };

  if (reservation) {
    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <ScrollView
          style={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <HeaderCoverImageContainer
            title={localization.DATE.title}
            image={coverImageAppointments}
            reservation={reservation}
          />

          <View style={styles.containerData}>
            <View>{reservation && <Details data={reservation} />}</View>
            <View>
              <SharedInputTextArea
                placeholderText={localization.DATE.detailsReservation}
                description={description}
                setDescription={setDescription}
              />
            </View>
          </View>
          <View style={styles.btn}>
            <SharedButton
              loading={isLoading}
              onPress={submitHandler}
              text={localization.DATE.book}
            />
          </View>
          {IsError && (
            <SharedMessage
              isOpen={IsError}
              onClose={confirmHandler}
              onConfirm={confirmHandler}
              icon={<Icon name={"close"} size={64} color="text" />}
              title={error}
              buttonText={localization.OK.label}
            />
          )}
          {distinctReservation?.length > 0 && (
            <SharedMessage
              isOpen={distinctReservation?.length > 0}
              onClose={confirmDistinctHandler}
              onConfirm={confirmDistinctHandler}
              icon={<Icon name={"close"} size={64} color="text" />}
              title={distinctReservation}
              buttonText={localization.OK.label}
            />
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
};

const useStyles = makeStyles((colors) => ({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  btn: {
    paddingHorizontal: 15,
  },
  containerData: {
    marginTop: 10,
  },
}));

export default Reservation;
