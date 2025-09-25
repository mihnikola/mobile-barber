import { View, StyleSheet, ScrollView } from "react-native";
import React, { useContext } from "react";
import ReservationContext from "@/context/ReservationContext";
import Details from "@/shared-components/Details";
import useSubmitReservation from "./hooks/useSubmitReservation";
import SharedButton from "@/shared-components/SharedButton";
import SharedInputTextArea from "@/shared-components/SharedInputTextArea";
import { useLocalization } from "@/context/LocalizationContext";
import HeaderInfo from "./HeaderInfo";
import { useCompany } from "@/context/CompanyContext";

const Reservation = () => {
  const { reservation } = useContext(ReservationContext)!;
  const { localization } = useLocalization();
  const { company } = useCompany();

  const {
    submitReservationHandler,
    isLoading,
    error,
    description,
    setDescription,
  } = useSubmitReservation();



  if (reservation) {
    return (
      <ScrollView style={styles.container}>
        <HeaderInfo
          image={company?.media?.coverImageAppointments}
          reservation={reservation}
        />

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
