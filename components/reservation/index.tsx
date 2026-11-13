import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import React from "react";
import { useReservation } from "@/context/ReservationContext";
import Details from "@/shared-components/Details";
import SharedButton from "@/shared-components/SharedButton";
import SharedInputTextArea from "@/shared-components/SharedInputTextArea";
import { useLocalization } from "@/context/LocalizationContext";
import { useCompany } from "@/context/CompanyContext";
import { SharedMessage } from "@/shared-components/SharedMessage";
import { useLocalSearchParams } from "expo-router";
import { useAppointment } from "@/context/AppointmentContext";
import { coverImageAppointments } from "@/constants";
import HeaderCoverImageContainer from "@/shared-components/HeaderCoverImageContainer";
import { Icon } from "@/components/ui";
import { colors } from "@/theme";

const Reservation = () => {
  const { reservation } = useReservation()!;
  const { localization } = useLocalization();
  const { status } = useLocalSearchParams();
  const { company } = useCompany();
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
    refreshCalendarReservation,
  } = useAppointment();

  const confirmHandler = () => {
    setIsError(false);
    setError(null);
  };

  const confirmDistinctHandler = async () => {
    setDistinctReservation(null);
    await refreshCalendarReservation();
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
              onPress={submitReservationHandler}
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

const styles = StyleSheet.create({
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
});

export default Reservation;
