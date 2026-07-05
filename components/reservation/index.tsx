import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useContext } from "react";
import ReservationContext from "@/context/ReservationContext";
import Details from "@/shared-components/Details";
import SharedButton from "@/shared-components/SharedButton";
import SharedInputTextArea from "@/shared-components/SharedInputTextArea";
import { useLocalization } from "@/context/LocalizationContext";
import HeaderInfo from "./HeaderInfo";
import { useCompany } from "@/context/CompanyContext";
import { SharedMessage } from "@/shared-components/SharedMessage";
import { FontAwesome } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useAppointment } from "@/context/AppointmentContext";
import SharedBackButton from "@/shared-components/SharedBackButton";
import { coverImageAppointments } from "@/constants";

const Reservation = () => {
  const { reservation } = useContext(ReservationContext)!;
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

  const routerBackHandler = () => {
    router.back();
  };

  if (reservation) {
    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <ScrollView
          style={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <HeaderInfo
            image={coverImageAppointments}
            reservation={reservation}
          />
          <SharedBackButton
            onPress={routerBackHandler}
            styleBtn={{ marginLeft: 8, marginTop: 30 }}
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
              icon={<FontAwesome name={"close"} size={64} color="white" />}
              title={error}
              buttonText={localization.OK.label}
            />
          )}
          {distinctReservation?.length > 0 && (
            <SharedMessage
              isOpen={distinctReservation?.length > 0}
              onClose={confirmDistinctHandler}
              onConfirm={confirmDistinctHandler}
              icon={<FontAwesome name={"close"} size={64} color="white" />}
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
    backgroundColor: "black",
  },

  btn: {
    display: "flex",
    paddingHorizontal: 25,
  },
  containerData: {
    display: "flex",
    paddingHorizontal: 10,
    marginTop: 10,
  },
});

export default Reservation;
