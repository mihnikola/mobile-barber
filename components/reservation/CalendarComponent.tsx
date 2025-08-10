import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet
} from "react-native";
import React from "react";
import Loader from "@/components/Loader";
import CardFutureReservation from "@/components/reservation/CardFutureReservation";
import CardNoReservation from "@/components/reservation/CardNoReservation";
import useReservations from "./hooks/useReservations";
import CardPastReservation from "./CardPastReservation";

const CalendarComponent = () => {
  const { reservations, isLoading, checkPastHandler, checkFutureHandler, check, detailsReservation } = useReservations();
  
  return (
    <ScrollView style={styles.container}>
      <Image
        source={require("@/assets/images/coverImage.jpg")}
        style={styles.coverImage}
      />
      <View style={styles.containerCapture}>
        <Text
          style={[styles.capture, check && styles.active]}
          onPress={checkFutureHandler}
        >
          Future
        </Text>
        <Text
          style={[styles.capture, !check && styles.active]}
          onPress={checkPastHandler}
        >
          Past
        </Text>
      </View>
      {isLoading ? (
        <Loader />
      ) : (
        <View style={{ display: "flex" }}>
          {check && reservations?.length > 0 ? (
            <CardFutureReservation reservations={reservations} redirectScreen={detailsReservation} />
          ) : (
            check && reservations?.length === 0 && <CardNoReservation />
          )}
          {!check && reservations?.length > 0 ? (
            <CardPastReservation reservations={reservations} redirectScreen={detailsReservation} />
          ) : (
            !check && reservations?.length === 0 && <CardNoReservation />
          )}
        </View>
      )}
    </ScrollView>
  );
};

export default CalendarComponent;


const styles = StyleSheet.create({
  active: {
    color: "#fff",
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    backgroundColor:"black"

  },
  containerCapture: {
    flexDirection: "row",
    gap: 20,
    alignSelf: "center",
    position: "absolute",
    top: 150,
  },
  greyLine: {
    width: "100%",
    height: 4,
    backgroundColor: "grey",
    marginTop: -1,
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
  },
});
