import { addMinutesToTime, convertDate } from "@/helpers";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

function SharedReservationData({ reservation }) {
  return (
    <View style={styles.coverContent}>
      <View>
        <TouchableOpacity hitSlop={20} onPress={router.back}>
          <MaterialIcons name="arrow-back" size={25} color="white" />
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.timeData}>
          {reservation && reservation?.timeData?.value} -{" "}
          {reservation &&
            addMinutesToTime(
              reservation?.timeData?.value,
              reservation?.service?.serviceDuration,
            )}
        </Text>
        <Text style={styles.dateData}>
          {convertDate(
            reservation?.dateReservation?.dateString ||
              reservation?.dateReservation,
          )}
        </Text>
        <Text style={styles.dateData}>
          {reservation?.location.address || reservation?.location[0].address}
        </Text>
      </View>
    </View>
  );
}

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
  coverContent: {
    marginVertical: 8,
    paddingHorizontal: 20,
    height: "100%",
    justifyContent: "space-around",
  },
});
export default SharedReservationData;
