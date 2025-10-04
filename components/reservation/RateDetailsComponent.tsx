import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useLocalization } from "@/context/LocalizationContext";
import StarRating from "./StarRateComponent";
import SharedButtonDateReservation from "@/shared-components/SharedButtonDateReservation";
import Details from "@/shared-components/Details";
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
import { useCompany } from "@/context/CompanyContext";
import SharedDetailsReservation from "@/shared-components/SharedDetailsReservation";
import SharedInputTextArea from "@/shared-components/SharedInputTextArea";

function RateDetailsComponent() {
  const { itemId } = useLocalSearchParams();
  const [description, setDescription] = useState(null);
  const {
    reservationData,
    isLoading: s,
    error,
    fetchReservationDetails,
  } = useFetchReservation();

  const { localization } = useLocalization();
  const { company } = useCompany();
  console.log("reservationData", reservationData);
  useEffect(() => {
    fetchReservationDetails(itemId);
  }, []);
  const [userFeedbackRating, setUserFeedbackRating] = useState(5);
  const {
    isLoading,
    rateModal,
    setRateModal,
    rateError,
    rateMessage,
    setRateMessage,
    rateReservation,
  } = useRateReservation();

  const handleUserRatingChange = (rating: number) => {
    setUserFeedbackRating(rating);
  };
  const sharedRateQuestionHandler = () => {
    setRateModal(false);
    rateReservation(itemId, userFeedbackRating, description);
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
        <SharedCoverImage image={company?.media?.coverImageAppointments} />
        <HeaderReservationTime data={reservationData} />
        <View style={styles.containerWrapper}>
          <SharedDetailsReservation data={reservationData} />
        </View>
        {!reservationData?.rating && (
          <StarRating onRatingChange={handleUserRatingChange} />
        )}
        {!reservationData?.rating && (
          <View style={styles.descContent}>
            <SharedInputTextArea
              placeholderText={
                localization.APPOINTMENTS.rateReservation.rateExplanation
              }
              description={description}
              setDescription={setDescription}
            />
          </View>
        )}
        {reservationData?.rating?.description?.length > 0 && (
          <View style={styles.descContent}>
            <Text style={styles.description}>{`${
              localization.APPOINTMENTS.rateReservation.descReservation
            } ${":  "}${reservationData?.rating?.description}`}</Text>
          </View>
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
        {rateModal && (
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
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  description: {
    color: "white",
  },
  descContent: {
    marginVertical: 10,
    marginHorizontal: 10,
    alignItems: "center",
    padding: 12,
  },
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
    marginHorizontal: 20,
  },
});

export default RateDetailsComponent;
