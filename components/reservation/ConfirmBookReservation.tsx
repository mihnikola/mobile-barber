import { View, Text, StyleSheet, Image, BackHandler } from "react-native";
import React, { useCallback, useContext } from "react";
import ReservationContext from "@/context/ReservationContext";
import {
  useFocusEffect,
} from "@react-navigation/native";
import { addMinutesToTime, convertDate } from "@/helpers";
import SharedButton from "@/shared-components/SharedButton";
import { useLocalSearchParams, router } from "expo-router";

const ConfirmBookReservation = () => {
  const { reservation } = useContext(ReservationContext)!;
   const params = useLocalSearchParams();
    const { responseData } = params;
console.log("ConfirmBookReservation+++",responseData)
  const submitReservationHandler = async () => {
    router.dismissAll();
    router.push({pathname:"/(tabs)/(03_calendar)", params: {reevalueted: 1}});
  };
  if (!responseData) {
    return router.push("/(tabs)/(03_calendar)");
  }
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        return true;
      };
      BackHandler.addEventListener("hardwareBackPress", onBackPress);
      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [])
  );

  if (reservation && responseData) {
    return (
      <View style={styles.container}>
        <Image
          source={require("@/assets/images/coverImage.jpg")}
          style={styles.coverImage}
        />
        <Image
          source={require("@/assets/images/logoBaber.png")}
          style={styles.coverLogo}
        />
        <View style={styles.coverContent}>
          <Text style={styles.timeData}>
            {reservation?.timeData?.value} -{" "}
            {addMinutesToTime(
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
        </View>

        <View style={{ display: "flex", flexDirection: "column" }}>
          <View style={{ display: "flex" }}>
            <Text style={styles.message}>
              Your appointment is successfully booked!
            </Text>
          </View>
        </View>
        <View style={{ display: "flex", paddingHorizontal: 10 }}>
          <SharedButton onPress={submitReservationHandler} text="OK" />
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
  checkbox: {
    marginRight: 10, // Space between checkbox and label
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
    alignItems: "center",
    marginTop: 20,
    width: "100%",
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
