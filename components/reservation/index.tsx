import { View, StyleSheet, ScrollView, BackHandler } from "react-native";
import React, { useContext, useEffect } from "react";
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
import { useLastPathNavigation } from "@/context/NavigationContext";

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
    setIsError,
    IsError,
    description,
    setDescription,
  } = useAppointment();

  console.log("errrr", error);
  const { saveLastTab } = useLastPathNavigation();

  const confirmHandler = async () => {
    setIsError(false);
    setError(null);
  };

  useEffect(() => {
    const backAction = () => {
      router.back();
      saveLastTab("/(tabs)/(02_barbers)/calendar");

      return true; // Returning true means we have handled the event and default behavior is prevented
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove(); // Cleanup function to remove the event listener
  }, []);
    const routerBackHandler = () => {
      router.back();
      saveLastTab("/(tabs)/(02_barbers)/calendar");
    };

  if (reservation) {
    return (
      <ScrollView automaticallyAdjustKeyboardInsets style={styles.container}>
        <HeaderInfo
          image={company?.media?.coverImageAppointments}
          reservation={reservation}
        />
        <SharedBackButton onPress={routerBackHandler} />

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
