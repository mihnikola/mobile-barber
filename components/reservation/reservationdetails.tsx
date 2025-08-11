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
  View,
} from "react-native";
import useFetchReservation from "./hooks/useFetchReservation";
import useCancelReservation from "./hooks/useCancelReservation";
import useRateReservation from "./hooks/useRateReservation";
import { useFocusEffect } from "@react-navigation/native";
import StarRating from "./StarRateComponent";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { SharedQuestion } from "@/shared-components/SharedQuestion";
import { FontAwesome } from "@expo/vector-icons";
import { SharedMessage } from "@/shared-components/SharedMessage";
import SharedButtonDateReservation from "@/shared-components/SharedButtonDateReservation";
import { router, useLocalSearchParams } from "expo-router";

const ReservationDetails = () => {
  const params = useLocalSearchParams();
  const { itemId, check, pushNotification } = params;

  console.log("ReservationDetails++");
  console.log("useRoute++", itemId, check, pushNotification);
  const [userFeedbackRating, setUserFeedbackRating] = useState(5);
  const { reservationData, isLoading, error, refetch } =
    useFetchReservation(itemId);
  const {
    isCanceling,
    cancelError,
    cancelReservation,
    setIsCanceling,
    cancelSuccess,
    setCancelSuccessFlag,
    cancelSuccessFlag,
  } = useCancelReservation();

  const {
    isRating,
    rateCancelError,
    rateReservation,
    setRateSuccessFlag,
    rateSuccessFlag,
    rateSuccess,
    isRateSuccess,
    setIsRateSuccess,
  } = useRateReservation();

  const rateAlert = () => {
    setRateSuccessFlag(true);
  };

  useFocusEffect(
    useCallback(() => {
      console.log("useFocusEffect+++");
      const onBackPress = () => {
        // Return true to disable the default back button behavior
        if (pushNotification) {
          router.push("/(tabs)/(03_calendar)");
        } else {
          router.back();
        }
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

  const cancelReservationHandler = () => {
    setCancelSuccessFlag(true);
  };

  const sharedQuestionHandler = () => {
    setCancelSuccessFlag(false);
    cancelReservation(itemId);
  };
  const sharedRateQuestionHandler = () => {
    setRateSuccessFlag(false);
    rateReservation(itemId, userFeedbackRating);
  };

  const confirmHandler = () => {
    setIsRateSuccess(false);
    setIsCanceling(false);
    router.push({ pathname: "/(tabs)/(03_calendar)", params: { data: 2 } });
  };
  return (
    <ScrollView style={styles.container}>
      <Image
        source={require("@/assets/images/coverImage.jpg")}
        style={styles.coverImage}
      />
      {reservationData && (
        <>
          <View style={styles.coverContent}>
            {/* {reservationData?.status === 0 ? (
              <IconSymbol size={38} name="check.cirle" color="green" />
            ) : (
              <IconSymbol size={38} name="disturb" color="red" />
            )} */}
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
          {check === "false" && !reservationData?.rate && (
            <StarRating onRatingChange={handleUserRatingChange} />
          )}
          <View style={styles.btnSubmitContainer}>
            {check === "false" && !reservationData?.rate && (
              <SharedButtonDateReservation
                loading={isRating}
                onPress={rateAlert}
                text="Rate us"
              />
            )}
            {check === "true" && (
              <SharedButtonDateReservation
                onPress={cancelReservationHandler}
                loading={isCanceling}
                text="Cancel"
              />
            )}
          </View>

          {check === "false" && reservationData?.rate && (
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
        </>
      )}
      {cancelSuccessFlag && (
        <SharedQuestion
          isOpen={cancelSuccessFlag}
          onClose={() => setCancelSuccessFlag(false)}
          onLogOut={sharedQuestionHandler}
          icon={
            <FontAwesome
              name="question-circle-o" // The specific FontAwesome icon to use
              size={64} // Size of the icon
              color="white" // Corresponds to text-blue-500
            />
          }
          title="Are you sure you want to cancel this reservation?" // Title of the modal
          buttonTextYes="Yes" // Text for the action button
          buttonTextNo="No"
        />
      )}
      {rateSuccessFlag && (
        <SharedQuestion
          isOpen={rateSuccessFlag}
          onClose={() => setRateSuccessFlag(false)}
          onLogOut={sharedRateQuestionHandler}
          icon={
            <FontAwesome
              name="question-circle-o" // The specific FontAwesome icon to use
              size={64} // Size of the icon
              color="white" // Corresponds to text-blue-500
            />
          }
          title="Are you sure you want to rate this appointment?" // Title of the modal
          buttonTextYes="Yes" // Text for the action button
          buttonTextNo="No"
        />
      )}

      {isCanceling && cancelSuccess && (
        <SharedMessage
          isOpen={isCanceling}
          onClose={confirmHandler}
          onConfirm={confirmHandler}
          icon={
            <FontAwesome
              name={cancelError ? "close" : "check-circle-o"}
              size={64}
              color="white"
            />
          }
          title={cancelError || cancelSuccess}
          buttonText="Ok"
        />
      )}
      {isRateSuccess && rateSuccess && (
        <SharedMessage
          isOpen={isRateSuccess}
          onClose={confirmHandler}
          onConfirm={confirmHandler}
          icon={
            <FontAwesome
              name={rateCancelError ? "close" : "check-circle-o"}
              size={64}
              color="white"
            />
          }
          title={rateCancelError || rateSuccess}
          buttonText="Ok"
        />
      )}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  btnSubmitContainer: {
    display: 'flex',
    marginVertical: 20,
    marginHorizontal: 20
  
  },
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
  },
  containerBtn: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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
    backgroundColor: "#1C1C1E",
    borderRadius: 20,
    padding: 20,
    top: 50,
    borderWidth: 1,
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  coverContent: {
    paddingHorizontal: 20,
    position: "absolute",
    top: 90,
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
    height: 200,
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
