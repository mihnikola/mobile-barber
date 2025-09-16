import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { IconSymbol } from "../ui/IconSymbol";
import { useLocalization } from "@/context/LocalizationContext";
import StarRating from "./StarRateComponent";
import SharedButtonDateReservation from "@/shared-components/SharedButtonDateReservation";
import Details from "@/shared-components/Details";
import { addMinutesToTime, convertDate, convertToDayTime } from "@/helpers";
import useRateReservation from "./hooks/useRateReservation";
import { useEffect, useState } from "react";
import { SharedQuestion } from "@/shared-components/SharedQuestion";
import { FontAwesome } from "@expo/vector-icons";
import { SharedMessage } from "@/shared-components/SharedMessage";
import { router, useLocalSearchParams } from "expo-router";
import useFetchReservation from "./hooks/useFetchReservation";
import { SharedLoader } from "@/shared-components/SharedLoader";
import HeaderReservationTime from "./HeaderReservationTime";
import ReservationMarkComponent from "./ReservationMarkComponent";
import SharedCoverImage from "@/shared-components/SharedCoverImage";

const myArray = [
  { arrx: "10000" },
  { arrx: "1111110" },
  { arrx: "232222" },
  { arrx: "4545453" },
  { arrx: "asdasdasd" },
];

function RateDetailsComponent() {
  const params = useLocalSearchParams();
  const { itemId } = params;
  const { reservationData, isLoading: s, error } = useFetchReservation(itemId);

  const { localization } = useLocalization();
  const [userFeedbackRating, setUserFeedbackRating] = useState(5);
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

  const handleUserRatingChange = (rating: number) => {
    setUserFeedbackRating(rating);
  };
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
  if (isLoading) {
    return <SharedLoader />;
  }
  if (reservationData) {
    return (
      <ScrollView style={styles.container}>
        <SharedCoverImage />
        <HeaderReservationTime data={reservationData} />
        <View style={styles.containerWrapper}>
          <Details data={reservationData} />
        </View>
        {!reservationData?.rating && (
          <StarRating onRatingChange={handleUserRatingChange} />
        )}

        <View style={styles.btnSubmitContainer}>
          {!reservationData?.rating && (
            <SharedButtonDateReservation
              onPress={rateAlert}
              text={localization.APPOINTMENTS.rateReservation.rateUs}
            />
          )}
        </View>
        {reservationData?.rating && (
          <ReservationMarkComponent data={reservationData} />
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
        {!rateModal && rateMessage?.length > 0 && (
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
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
   container: {
    flex: 1,
    backgroundColor: "black",
  },
  containerWrapper: {
    marginTop: 10,
    marginBottom: 10,
    display: "flex",
  },
  containerBtn: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
   btnSubmitContainer: {
    display: "flex",
    marginVertical: 20,
    marginHorizontal: 20,
  },







});

export default RateDetailsComponent;
