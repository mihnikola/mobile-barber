import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import React, { useContext, useEffect } from "react";
import ReservationContext from "@/context/ReservationContext";
import Details from "@/shared-components/Details";
import { addMinutesToTime, convertDate } from "@/helpers";
import useSubmitReservation from "./hooks/useSubmitReservation";
import SharedButton from "@/shared-components/SharedButton";
import SharedInputTextArea from "@/shared-components/SharedInputTextArea";
import { useLocalization } from "@/context/LocalizationContext";
import SharedCoverImage from "@/shared-components/SharedCoverImage";
import useCompany from "../home/hooks/useCompany";

const Reservation = () => {
  const { reservation } = useContext(ReservationContext)!;
    const {localization } = useLocalization();
  
  const {
    submitReservationHandler,
    isLoading,
    error,
    description,
    setDescription,
  } = useSubmitReservation();

  const { company, getCompany } = useCompany();

  useEffect(() => {
    getCompany();
  }, []);

  if (reservation) {
    return (
      <ScrollView style={styles.container}>
      <SharedCoverImage image={company?.media?.coverImageAppointments} />
        <View style={styles.coverContent}>
          <Text style={styles.timeData}>
            {reservation && reservation?.timeData?.value} -{" "}
            {reservation &&
              addMinutesToTime(
                reservation?.timeData?.value,
                reservation?.service?.serviceDuration
              )}
          </Text>
          <Text style={styles.dateData}>
            {convertDate(
              reservation?.dateReservation?.dateString ||
                reservation?.dateReservation
            )}
          </Text>
          <Text style={styles.dateData}>Frizerski Studio - Gentleman</Text>
        </View>
        <View style={{ display: "flex", paddingHorizontal: 10, marginTop: 10 }}>
          <View>
            {reservation && <Details data={reservation} />}
            <SharedInputTextArea
              placeholderText={localization.DATE.detailsReservation}
              description={description}
              setDescription={setDescription}
            />
          </View>
        </View>
        <View style={{ display: "flex", paddingHorizontal: 25 }}>
          <SharedButton
            loading={isLoading}
            onPress={submitReservationHandler}
            text={localization.DATE.book}
          />
        </View>
      </ScrollView>
    );
  }
};

export default Reservation;

const styles = StyleSheet.create({
  button: {
    display: "flex",
    justifyContent: "center",
    paddingVertical: 20,
    paddingHorizontal: 30,
    backgroundColor: "black",
    borderRadius: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 16,
    textAlign: "center",
  },

  timeData: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },
  position: {
    fontSize: 16,
    color: "grey",
    fontStyle: "italic",
    padding: 12,
  },
  coverContent: {
    paddingHorizontal: 30,
    position: "absolute",
    top: 80,
  },
  dateData: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },
  data: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "black",
  },
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  coverImage: {
    width: "100%",
    height: 180,
    opacity: 0.2,
  },
});
