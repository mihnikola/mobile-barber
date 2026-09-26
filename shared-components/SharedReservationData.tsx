import { ColorsBarber } from "@/constants/Colors";
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
          <MaterialIcons name="arrow-back" size={25} color={ColorsBarber.light.textColor} />
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
    backgroundColor: ColorsBarber.light.background,
    borderRadius: 20,
  },
  buttonText: {
   color: ColorsBarber.light.textColor,
    fontFamily: "OldStandard-Bold",
    textTransform: "uppercase",
    fontSize: 16,
    textAlign: "center",
  },

  timeData: {
    fontSize: 20,
   color: ColorsBarber.light.textColor,
    fontFamily: "OldStandard-Bold",
  },
  position: {
    fontSize: 16,
    color: "grey",
    fontStyle: "italic",
    padding: 12,
  },

  dateData: {
    fontSize: 20,
   color: ColorsBarber.light.textColor,
    fontFamily: "OldStandard-Bold",
  },
  data: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: ColorsBarber.light.background,
  },
  container: {
    flex: 1,
    backgroundColor: ColorsBarber.light.background,
  },
  coverImage: {
    width: "100%",
    height: 180,
    opacity: 0.2,
  },
  coverContent: {
    marginTop: 5,
    paddingHorizontal: 15,
    height: "100%",
    justifyContent: "space-around",
  },
});
export default SharedReservationData;
