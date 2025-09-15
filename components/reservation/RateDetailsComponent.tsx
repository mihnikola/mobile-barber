import { StyleSheet, Text, View } from "react-native";
import { IconSymbol } from "../ui/IconSymbol";
import { useLocalization } from "@/context/LocalizationContext";
import StarRating from "./StarRateComponent";
import SharedButtonDateReservation from "@/shared-components/SharedButtonDateReservation";
import Details from "@/shared-components/Details";
import { addMinutesToTime, convertDate, convertToDayTime } from "@/helpers";
import useRateReservation from "./hooks/useRateReservation";
import { useState } from "react";
import { SharedQuestion } from "@/shared-components/SharedQuestion";
import { FontAwesome } from "@expo/vector-icons";
import { SharedMessage } from "@/shared-components/SharedMessage";
import { router } from "expo-router";

function RateDetailsComponent({ data, itemId }) {
  console.log("RateDetailsComponent+++")
  const { localization } = useLocalization();
  const [userFeedbackRating, setUserFeedbackRating] = useState(5);
  
  const handleUserRatingChange = (rating: number) => {
    setUserFeedbackRating(rating);
    // Here you would typically send this rating to your backend
  };
  // if (cancelError) {
  //   // You might want to display a separate error message for cancellation
  //   console.error("Cancellation Error:", cancelError);
  // }
  // if (rateError) {
  //   // You might want to display a separate error message for cancellation
  //   console.error("Rating Error:", cancelError);
  // }

  const myArray = [
    { arrx: "10000" },
    { arrx: "1111110" },
    { arrx: "232222" },
    { arrx: "4545453" },
    { arrx: "asdasdasd" },
  ];

  // const cancelReservationHandler = () => {
  //   setIsCanceling(true);
  // };

  // const sharedQuestionHandler = () => {
  //   setCancelSuccessFlag(false);
  //   cancelReservation(itemId);
  // };
  // const sharedRateQuestionHandler = () => {
  //   setRateModal(false);
  //   rateReservation(itemId, userFeedbackRating);
  // };

  // const confirmHandler = () => {
  //   setRateMessage(false);
  //   router.back();
  // };
  // const cancelHandler = () => {
  //   setIsCanceling(false);
  // };
  //   const myArray = [
  //     { arrx: "10000" },
  //     { arrx: "1111110" },
  //     { arrx: "232222" },
  //     { arrx: "4545453" },
  //     { arrx: "asdasdasd" },
  //   ];

  //   const cancelReservationHandler = () => {
  //     setIsCanceling(true);
  //   };

  const {
    isLoading,

    rateModal,
    setRateModal,

    rateError,
    setRateError,

    rateMessage,
    setRateMessage,

    rateReservation,
  } = useRateReservation();

  const sharedRateQuestionHandler = () => {
    setRateModal(false);
    rateReservation(itemId, userFeedbackRating);
  };
  const confirmHandler = () => {
    setRateMessage(null);
    router.back();
  };
  const cancelHandler = () => {
    setRateMessage(null);
  };

  const rateAlert = () => {
    setRateModal(true);
  };
  return (
    <View>
      <View style={styles.coverContent}>
        <Text style={styles.timeData}>
          {convertToDayTime(data?.startDate)} -
          {addMinutesToTime(
            convertToDayTime(data?.startDate),
            data?.service?.duration
          )}
        </Text>
        <Text style={styles.dateData}>{convertDate(data?.startDate)}</Text>
        <Text style={styles.dateData}>Barber Studio - Gentleman</Text>
      </View>
      <View style={styles.containerWrapper}>
        <Details data={data} />
      </View>

      <View style={styles.btnSubmitContainer}>
        {!data?.rating && (
          <SharedButtonDateReservation
            onPress={rateAlert}
                text={localization.APPOINTMENTS.rateReservation.rateUs}
          />
        )}
      </View>
      {data?.rating && (
        <View style={{ alignItems: "center" }}>
          <Text style={{ color: "white", fontSize: 20 }}>
            {localization.APPOINTMENTS.rateReservation.ratedInfo}
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
                if (index < data?.rating?.rate) {
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
      {rateModal && !rateError && !rateMessage && (
        <SharedQuestion
          isOpen={rateModal}
          onClose={() => setRateModal(false)}
          onLogOut={sharedRateQuestionHandler}
          icon={
            <FontAwesome name="question-circle-o" size={64} color="white" />
          }
          title={localization.APPOINTMENTS.rateReservation.rateQuestion}
          buttonTextYes={localization.APPOINTMENTS.rateReservation.yesButton}
          buttonTextNo={localization.APPOINTMENTS.rateReservation.noButton}
        />
      )}
      {rateMessage?.length > 0 && (
        <SharedMessage
          isOpen={rateMessage?.length > 0}
          onClose={!rateError ? confirmHandler : cancelHandler}
          onConfirm={!rateError ? confirmHandler : cancelHandler}
          icon={
            <FontAwesome
              name={rateError ? "close" : "check-circle-o"}
              size={64}
              color="white"
            />
          }
          title={rateError || rateMessage}
          buttonText="Ok"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  btnSubmitContainer: {
    display: "flex",
    marginVertical: 20,
    marginHorizontal: 20,
  },
  description: {
    fontSize: 15,
    color: "white",
    padding: 10,
    marginLeft: 10,
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
    marginTop: 10,
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

export default RateDetailsComponent;
