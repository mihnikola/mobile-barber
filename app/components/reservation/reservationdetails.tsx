import Loader from "@/components/Loader";
import { addMinutesToTime, convertDate } from "@/helpers";
import Details from "@/shared-components/Details";
import React, { useCallback, useState } from "react";
import {
  BackHandler,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import useFetchReservation from "./hooks/useFetchReservation";
import useReservationCancellationAlert from "./hooks/useReservationCancellationAlert";
import useReservationRateAlert from "./hooks/useReservationRateAlert";
import useCancelReservation from "./hooks/useCancelReservation";
import useRateReservation from "./hooks/useRateReservation";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import StarRating from "./StarRateComponent";
import { IconSymbol } from "@/components/ui/IconSymbol";
const ReservationDetails = () => {
    const navigator = useNavigation();
  
  const route = useRoute(); // Get the route object
  const { itemId, check } = route.params;
  const [userFeedbackRating, setUserFeedbackRating] = useState(5);

  const { reservationData, isLoading, error, refetch } =
    useFetchReservation(itemId);
  const { isCanceling, cancelError, cancelReservation } =
    useCancelReservation();
  const { isRating, rateCancelError, rateReservation } = useRateReservation();

  const { rateAlert } = useReservationRateAlert(() => {
    if (itemId) {
      rateReservation(itemId, userFeedbackRating);
    } else {
      console.error("Reservation ID is missing for rate.");
      // Optionally show an error message to the user
    }
  });
  console.log("reservationData+++", reservationData);

  const { showAlert } = useReservationCancellationAlert(() => {
    if (itemId) {
      cancelReservation(itemId);
    } else {
      console.error("Reservation ID is missing for cancellation.");
      // Optionally show an error message to the user
    }
  });

   useFocusEffect(
        useCallback(() => {
          const onBackPress = () => {
            // Return true to disable the default back button behavior
            navigator.goBack();
            return true;
          };
          BackHandler.addEventListener("hardwareBackPress", onBackPress);
    
          return () =>
            BackHandler.removeEventListener("hardwareBackPress", onBackPress);
        }, [])
      );

  const handleUserRatingChange = (rating: number) => {
    console.log("User selected rating:", rating);
    setUserFeedbackRating(rating);
    // Here you would typically send this rating to your backend
  };

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
  if (rateCancelError) {
    // You might want to display a separate error message for cancellation
    console.error("Rating Error:", cancelError);
  }

  const myArray = [
    { arrx: "10000" },
    { arrx: "1111110" },
    { arrx: "232222" },
    { arrx: "4545453" },
    { arrx: "asdasdasd" },
  ];

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
              {reservationData?.status === 0 ? "Approved" : "Rejected"}
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
            <Text style={styles.dateData}>Barber Studio - Gentleman</Text>
          </View>
          <View style={styles.containerWrapper}>
            <Details data={reservationData} />
          </View>
          {!check && !reservationData?.rate && (
            <StarRating onRatingChange={handleUserRatingChange} />
          )}
          {!check && !reservationData?.rate && (
            <TouchableOpacity
              onPress={rateAlert} // Use the showAlert function from the hook
              style={styles.containerBtn}
              disabled={isRating}
            >
              <Text
                style={[styles.btnSubmit, isRating && styles.disabledButton]}
              >
                {isRating ? "Rating..." : "Rate us"}
              </Text>
            </TouchableOpacity>
          )}
          {!check && reservationData?.rate && (
            <View style={{ alignItems: "center", marginTop: 40, padding: 20 }}>
              <Text style={{ color: "white", fontSize: 20 }}>
                You rated this appointment
              </Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <Text style={{ color: "white", fontSize: 40 }}>
                  {myArray?.map((item, index) => {
                    if (index < reservationData?.rate) {
                      return (
                        <IconSymbol
                          key={item.arrx}
                          name="star"
                          color="gold"
                          size={40}
                        />
                      );
                    }
                  })}
                </Text>
              </View>
            </View>
          )}
          {check && (
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
          )}
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
