import Loader from "@/components/Loader";
import ReservationContext from "@/context/ReservationContext";
import { addMinutesToTime, convertDate } from "@/helpers";
import Details from "@/shared-components/Details";
import React, { useContext } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import useFetchReservation from "./hooks/useFetchReservation";
import useReservationCancellationAlert from "./hooks/useReservationCancellationAlert";
import useCancelReservation from "./hooks/useCancelReservation";
import { useNavigation } from "@react-navigation/native";
const ReservationDetails = () => {
  const navigation = useNavigation();
  const { itemId } = route.params;

  const { reservationData, isLoading, error, refetch } =
    useFetchReservation(itemId);
  const { isCanceling, cancelError, cancelReservation } =
    useCancelReservation();
  const { showAlert } = useReservationCancellationAlert(() => {
    if (itemId) {
      cancelReservation(itemId);
    } else {
      console.error("Reservation ID is missing for cancellation.");
      // Optionally show an error message to the user
    }
  });

  if (isLoading) {
    return <Loader />;
  }

  // if (error) {
  //   return (
  //     <View style={styles.errorContainer}>
  //       <Text style={styles.errorText}>{error}</Text>
  //       <TouchableOpacity onPress={refetch}>
  //         <Text style={styles.retryButton}>Pokušaj ponovo</Text>
  //       </TouchableOpacity>
  //     </View>
  //   );
  // }

  if (cancelError) {
    // You might want to display a separate error message for cancellation
    console.error("Cancellation Error:", cancelError);
  }

  return (
    <ScrollView style={styles.container}>
      <Image
        source={require("@/assets/images/coverImage.jpg")}
        style={styles.coverImage}
      />
      <View style={styles.greyLine} />
      {reservationData && (
        <>
          <View style={styles.coverContent}>
            <Text
              style={[
                styles.statusContent,
                reservationData?.status === 0
                  ? styles.statusContentConfirm
                  : styles.statusContentRejected,
              ]}
            >
              {reservationData?.status === 0 ? "Potvrđen" : "Odbijen"}
            </Text>

            <Text style={styles.timeData}>
              {reservationData?.time} -{" "}
              {addMinutesToTime(
                reservationData?.time,
                reservationData?.service?.duration
              )}
            </Text>
            <Text style={styles.dateData}>
              {convertDate(reservationData?.date)}
            </Text>
            <Text style={styles.dateData}>Frizerski Studio - Gentleman</Text>
          </View>
          <View style={styles.containerWrapper}>
            <Details data={reservationData} />
          </View>
          <TouchableOpacity
            onPress={showAlert} // Use the showAlert function from the hook
            style={styles.containerBtn}
            disabled={isCanceling}
          >
            <Text
              style={[styles.btnSubmit, isCanceling && styles.disabledButton]}
            >
              {isCanceling ? "Otkazivanje..." : "Otkaži"}
            </Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  statusContent: {
    color: "white",
    padding: 8,
    fontSize: 20,
    borderRadius: 5,
    textAlign: "center",
    marginBottom: 8,
  },
  disabledButton: {
    opacity: 0.5,
  },
  containerWrapper: {
    display: "flex",
    flexDirection: "row",
  },
  containerBtn: {
    alignItems: "center",
    position: "relative",
    top: 100,
  },
  dateData: {
    fontSize: 25,
    color: "#fff",
    fontWeight: "700",
  },
  btnSubmit: {
    fontSize: 30,
    color: "white",
    fontWeight: 900,
    borderColor: "white",
    padding: 20,
    borderWidth: 1,
    alignItems: "center",
  },
  container: {
    flex: 1,
  },
  coverContent: {
    padding: 8,
    position: "absolute",
    top: 150,
  },
  statusContentPending: {
    color: "white",
    padding: 5,
    fontSize: 20,
    maxWidth: 140,
    minWidth: 140,
    backgroundColor: "gray",
  },
  statusContentConfirm: {
    color: "white",
    padding: 5,
    fontSize: 20,
    maxWidth: 100,
    minWidth: 100,
    backgroundColor: "green",
  },
  statusContentRejected: {
    color: "white",
    padding: 5,
    fontSize: 20,
    maxWidth: 100,
    minWidth: 100,
    backgroundColor: "red",
  },
  coverImage: {
    width: "100%",
    height: 300,
    opacity: 0.2,
  },
  greyLine: {
    width: "100%",
    height: 4, // Adjust the height for the thickness of the line
    backgroundColor: "white", // Set the line color to white
    marginTop: -1, // Optional: You can adjust this to fine-tune the position
  },
  timeData: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },
});
export default ReservationDetails;
