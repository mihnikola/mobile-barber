import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import React, {  useContext } from "react";
import ReservationContext from "@/context/ReservationContext";
import Details from "@/shared-components/Details";
import Note from "@/shared-components/Note";
import { addMinutesToTime, convertDate } from "@/helpers";
import useSubmitReservation from "./hooks/useSubmitReservation";
import SharedButton from "@/shared-components/SharedButton";

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
            {convertDate(
              reservation?.dateReservation?.dateString ||
                reservation?.dateReservation
            )}
          </Text>
          <Text style={styles.dateData}>Frizerski Studio - Gentleman</Text>
        </View>
        <View style={{ display: "flex" }}>
          <View>
            {reservation && <Details data={reservation} />}
            <Note />
          </View>
        </View>
        <View style={{ display: "flex", paddingHorizontal: 10 }}>
          <SharedButton
            loading={isLoading}
            onPress={submitReservationHandler}
            text={isLoading ? "Booking..." : "Book"}
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
    position: "absolute",
    alignItems: "center",
    alignSelf: "center",
    top:50
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
