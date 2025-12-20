import { View, StyleSheet, ScrollView } from "react-native";
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
import { router } from "expo-router";
import { useAppointment } from "@/context/AppointmentContext";
import SharedBackButton from "@/shared-components/SharedBackButton";
import withKeyboardAvoid from "../wrapper/WrapperKeyboard";

const Reservation = () => {
  const { reservation } = useContext(ReservationContext)!;
  const { localization } = useLocalization();
  const { company } = useCompany();

  const {
    submitReservationHandler,
    isLoading,
    error,
    setError,
    setMessage,
    message,
    description,
    setDescription,
  } = useAppointment();

  const confirmHandler = async () => {
    setError(null);
    setMessage(false);
    router.back();
  };

  if (reservation) {
    return (
      <ScrollView automaticallyAdjustKeyboardInsets style={styles.container}>
        <HeaderInfo
          image={company?.media?.coverImageAppointments}
          reservation={reservation}
        />
        <SharedBackButton onPress={router.back} />

        <View style={styles.containerData}>
          <View>
            {reservation && <Details data={reservation} />}
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
        {message?.length > 0 ||
          (error?.length > 0 && (
            <SharedMessage
              isOpen={message || error}
              onClose={confirmHandler}
              onConfirm={confirmHandler}
              icon={<FontAwesome name={"close"} size={64} color="white" />}
              title={error || message}
              buttonText={localization.OK.label}
            />
          ))}
      </ScrollView>
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
