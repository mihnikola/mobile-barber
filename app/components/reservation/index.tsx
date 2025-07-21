import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
  ScrollView,
  BackHandler,
} from "react-native";
import React, { useCallback, useContext } from "react";
import ReservationContext from "@/context/ReservationContext";
import ButtonComponent from "@/shared-components/Button";
import Details from "@/shared-components/Details";
import Note from "@/shared-components/Note";
import { addMinutesToTime, convertDate } from "@/helpers";
import useSubmitReservation from "./hooks/useSubmitReservation";
import { useFocusEffect } from "expo-router";
import { useNavigation } from "@react-navigation/native";

const Reservation = () => {
  const { reservation } = useContext(ReservationContext)!;
  const { submitReservationHandler, isLoading, error } = useSubmitReservation();
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        // Return true to disable the default back button behavior
        console.log("object");
        navigation.navigate("components/reservation/datereservation");
        return true;
      };
      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [])
  );
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
  reservation: {
    display: "flex",
    flexDirection: "column",
    height: 100,
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
    position: "fixed",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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
    backgroundColor: "black",
  },
  container: {
    flex: 1,
    backgroundColor: "black",
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
    left: 80,
    top: 150,
  },
});
