import { ColorsBarber } from "@/constants/Colors";
import { addMinutesToTime, convertDate } from "@/helpers";
import SharedCoverImage from "@/shared-components/SharedCoverImage";
import SharedLogo from "@/shared-components/SharedLogo";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

function BookSuccess({ image, reservation }) {
  console.log("reservation", reservation);
  const totals = reservation?.otherServices?.reduce(
    (acc, current) => {
      acc.totalPrice += current.price;
      acc.totalDuration += current.duration;
      return acc;
    },
    { totalPrice: 0, totalDuration: 0 },
  );

  return (
    <>
      <SharedCoverImage image={image} />

      <SharedLogo />

      <View style={styles.coverContent}>
        <Text style={styles.timeData}>
          {reservation?.timeData?.value} -{" "}
          {addMinutesToTime(
            reservation?.timeData?.value,
            reservation?.service?.serviceDuration,
            totals?.totalDuration,
          )}
        </Text>
        <Text style={styles.dateData}>
          {convertDate(
            reservation?.dateReservation?.dateString ||
              reservation?.dateReservation,
          )}
        </Text>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  infoContainer: {
    flex: 1,
    justifyContent: "space-evenly",
    alignSelf: "center",
  },
  checkbox: {
    marginRight: 10,
  },

  reservation: {
    display: "flex",
    flexDirection: "column",
    height: 350,
    justifyContent: "center",
    alignItems: "center",
  },
  timeData: {
    fontSize: 22,

    color: ColorsBarber.dark.textColor,
    fontFamily: "OldStandard-Bold",
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
    fontSize: 20,
    color: ColorsBarber.dark.textColor,
    fontFamily: "OldStandard-Bold",
  },
  data: {
    display: "flex",
    flexDirection: "column",
  },
  container: {
    flex: 1,
    backgroundColor: ColorsBarber.dark.background,
  },
  coverImage: {
    width: "100%",
    height: 300,
    opacity: 0.25,
  },
  whiteLine: {
    width: "100%",
    height: 4, // Adjust the height for the thickness of the line
    backgroundColor: ColorsBarber.dark.background, // Set the line color to white
    marginTop: -1, // Optional: You can adjust this to fine-tune the position
  },
});
export default BookSuccess;
