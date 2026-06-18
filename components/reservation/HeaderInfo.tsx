import { addMinutesToTime, convertDate } from "@/helpers";
import SharedCoverImage from "@/shared-components/SharedCoverImage";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

function HeaderInfo({ image, reservation }) {
  const insets = useSafeAreaInsets();

  return (
    <>
      <SharedCoverImage topInset={insets.top} image={image} />

      <View style={styles.coverContent}>
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
    </>
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
  coverContent: {
    paddingHorizontal: 30,
    position: "absolute",
    top: 135,
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
export default HeaderInfo;
