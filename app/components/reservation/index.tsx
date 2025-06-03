import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useContext } from "react";
import ReservationContext from "@/context/ReservationContext";
import ButtonComponent from "@/shared-components/Button";
import Details from "@/shared-components/Details";
import Note from "@/shared-components/Note";
import { addMinutesToTime, convertDate } from "@/helpers";
import useSubmitReservation from "./hooks/useSubmitReservation";

const Reservation = () => {
  const { reservation } = useContext(ReservationContext)!;
  const { submitReservationHandler, isLoading, error } = useSubmitReservation();
  if (reservation) {
    return (
      <ScrollView style={styles.container}>
        <Image
          source={require("@/assets/images/coverImage.jpg")}
          style={styles.coverImage}
        />
        <View style={styles.coverContent}>
          <Text style={styles.timeData}>
            {reservation && reservation?.timeData?.value} -{" "}
            {reservation &&
              addMinutesToTime(
                reservation?.timeData?.value,
                reservation?.service?.duration
              )}
          </Text>
          <Text style={styles.dateData}>
            {convertDate(reservation?.dateReservation?.dateString || reservation?.dateReservation)}
          </Text>
          <Text style={styles.dateData}>Frizerski Studio - Gentleman</Text>
        </View>
        <View style={{ display: "flex", padding: 10 }}>
          <View>
            {reservation && <Details data={reservation} />}
            <Note />

            <View style={styles.reservation}>
              {isLoading ? (
                <TouchableOpacity style={styles.button}>
                  <Text style={styles.buttonText}>Booking...</Text>
                </TouchableOpacity>
              ) : (
                <ButtonComponent
                  text="Book"
                  onPress={submitReservationHandler}
                />
              )}
            </View>
          </View>
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
    backgroundColor: "#ffffff",
    borderRadius: 20,
  },
  buttonText: {
    color: "black",
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 16,
    textAlign: "center",
  },
  reservation: {
    display: "flex",
    flexDirection: "column",
    height: 300,
    justifyContent: "center",
    alignItems: "center",
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
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    top: 80,
    left: 50,
    padding: 20,
  },
  dateData: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },
  data: {
    display: "flex",
    flexDirection: "column",
  },
  container: {
    flex: 1,
  },
  coverImage: {
    width: "100%",
    height: 200,
    opacity: 0.2,
  },
  capture: {
    fontSize: 32,
    color: "grey",
    fontWeight: "900",
    textAlign: "center",
    fontStyle: "italic",
    position: "absolute",
    top: 150,
    left: 50,
  },
});
