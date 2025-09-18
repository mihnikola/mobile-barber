import { View, Text, StyleSheet, Image } from "react-native";
import React, { useContext, useEffect } from "react";
import ReservationContext from "@/context/ReservationContext";
import { addMinutesToTime, convertDate } from "@/helpers";
import SharedButton from "@/shared-components/SharedButton";
import { useLocalSearchParams, router } from "expo-router";
import Note from "@/shared-components/Note";
import { useLocalization } from "@/context/LocalizationContext";
import SharedCoverImage from "@/shared-components/SharedCoverImage";
import SharedLogo from "@/shared-components/SharedLogo";
import useCompany from "../home/hooks/useCompany";

const ConfirmBookReservation = () => {
  const { localization } = useLocalization();

  const { reservation } = useContext(ReservationContext)!;
  const { company, getCompany, isLoading: isLoadingCompany } = useCompany();

  useEffect(() => {
    getCompany();
  }, []);
  const params = useLocalSearchParams();
  const { responseData } = params;

  const submitReservationHandler = async () => {
    router.back();
    router.push({
      pathname: "/(tabs)/(03_calendar)",
      params: { reevalueted: 1 },
    });
  };
  if (!responseData) {
    return router.push("/(tabs)/(03_calendar)");
  }
  console.log("reservationreservation", reservation);

  if (reservation && responseData) {
    return (
      <View style={styles.container}>
        <SharedCoverImage image={company?.media?.coverImageAppointments} />
        
        <SharedLogo image={company?.media?.logo} />

        <View style={styles.coverContent}>
          <Text style={styles.timeData}>
            {reservation?.timeData?.value} -{" "}
            {addMinutesToTime(
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
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.message}>{localization.SALON.success}</Text>
          <Note />
          <SharedButton
            onPress={submitReservationHandler}
            text={localization.BUTTONS.ok}
          />
        </View>
      </View>
    );
  }
};

export default ConfirmBookReservation;

const styles = StyleSheet.create({
  coverLogo: {
    position: "absolute",
    display: "flex",
    alignSelf: "center",
    marginTop: 50,
    width: 140,
    height: 200,
  },
  infoContainer: {
    flex: 1,
    justifyContent: "space-evenly",
    alignSelf: "center",
  },
  checkbox: {
    marginRight: 10,
  },
  message: {
    fontSize: 30,
    padding: 20,
    color: "#fff",
    textAlign: "center",
    fontWeight: "900",
  },

  reservation: {
    display: "flex",
    flexDirection: "column",
    height: 350,
    justifyContent: "center",
    alignItems: "center",
  },
  timeData: {
    fontSize: 30,

    color: "#fff",
    fontWeight: "900",
    display: "flex",
    justifyContent: "center",
  },
  position: {
    fontSize: 20,
    color: "grey",
    fontStyle: "italic",
    padding: 12,
  },
  coverContent: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10, // Add padding to make the space visible from the edges
  },
  dateData: {
    fontSize: 25,
    color: "#fff",
    fontWeight: "700",
  },
  data: {
    display: "flex",
    flexDirection: "column",
  },
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  coverImage: {
    width: "100%",
    height: 300,
    opacity: 0.25,
  },
  whiteLine: {
    width: "100%",
    height: 4, // Adjust the height for the thickness of the line
    backgroundColor: "#fff", // Set the line color to white
    marginTop: -1, // Optional: You can adjust this to fine-tune the position
  },
});
