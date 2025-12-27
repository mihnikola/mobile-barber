import { useLocalization } from "@/context/LocalizationContext";
import SharedButtonDateReservation from "@/shared-components/SharedButtonDateReservation";
import { BackHandler, ScrollView, StyleSheet, Text, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { SharedQuestion } from "@/shared-components/SharedQuestion";
import { SharedMessage } from "@/shared-components/SharedMessage";
import { router, useLocalSearchParams } from "expo-router";
import { SharedLoader } from "@/shared-components/SharedLoader";
import { useEffect, useState } from "react";
import SharedCoverImage from "@/shared-components/SharedCoverImage";
import { useCompany } from "@/context/CompanyContext";
import SharedDetailsReservation from "@/shared-components/SharedDetailsReservation";
import HeaderReservationTime from "@/components/reservation/HeaderReservationTime";
import StarRating from "@/components/reservation/StarRateComponent";
import SharedInputTextArea from "@/shared-components/SharedInputTextArea";
import ReservationMarkComponent from "@/components/reservation/ReservationMarkComponent";
import withKeyboardAvoid from "../wrapper/WrapperKeyboard";
import SharedBackButton from "@/shared-components/SharedBackButton";
import { useAppointment } from "@/context/AppointmentContext";

function ResevationNotificationScreen() {
  const { localization } = useLocalization();
  const { itemId, past, rating, notification } = useLocalSearchParams();
  const { company } = useCompany();
  const {
    reservationData,
    fetchReservationDetails,
    rateReservation,
    cancelReservation,
    isLoading,
    error,
    message,
    isModalQuestion,
    setIsModalQuestion,
    setIsModal,
    isModal,
    setDescription,
    description,
    isInitialLoading
  } = useAppointment();

  useEffect(() => {
    fetchReservationDetails(itemId);
  }, []);

  const [userFeedbackRating, setUserFeedbackRating] = useState(5);

  const renderDescription = () => {
    if (reservationData?.description) {
      return (
        <View style={styles.descContent}>
          <Text style={styles.description}>{`${
            localization.APPOINTMENTS.rateReservation.descReservation
          } ${":  "}${reservationData?.description}`}</Text>
        </View>
      );
    }
  };
  const renderRateDescription = () => {
    if (reservationData?.rating?.description) {
      return (
        <View style={styles.descContent}>
          <Text style={styles.description}>{`${
            localization.APPOINTMENTS.rateReservation.descRateReservation
          } ${":  "}${reservationData?.rating?.description}`}</Text>
        </View>
      );
    }

    if (past && !reservationData?.rating?.description)
      return (
        <SharedInputTextArea
          placeholderText={
            localization.APPOINTMENTS.rateReservation.rateExplanation
          }
          description={description}
          setDescription={setDescription}
        />
      );
  };
  const confirmHandler = async () => {
    router.back();
    setIsModal(false);
  };

  const handleUserRatingChange = (rating: number) => {
    setUserFeedbackRating(rating);
  };
  const renderStarComponent = () => {
    if (past && !rating)
      return <StarRating onRatingChange={handleUserRatingChange} />;
    if (past && rating)
      return <ReservationMarkComponent data={reservationData} />;
  };

  const sharedRateQuestionHandler = () => {
    setIsModalQuestion(false);

    setTimeout(async () => {
      await rateReservation(itemId, userFeedbackRating, description);
    }, 500);
  };

  const sharedQuestionHandler = () => {
    setIsModalQuestion(false);

    setTimeout(async () => {
      await cancelReservation(itemId);
    }, 500);
  };
  const modalReservationHandler = () => {
    setIsModalQuestion(true);
  };

  const renderSharedButton = () => {
    const buttonLabel = past
      ? localization.APPOINTMENTS.rateReservation.rateUs
      : localization.APPOINTMENTS.cancelReservation.cancelButton;
    if (!reservationData?.rating) {
      return (
        <View style={styles.btnSubmitContainer}>
          <SharedButtonDateReservation
            onPress={modalReservationHandler}
            text={buttonLabel}
          />
        </View>
      );
    }
  };
  const renderQuestion = () => {
    const titleQuestion = !past
      ? localization.APPOINTMENTS.cancelReservation.cancelQuestion
      : localization.APPOINTMENTS.rateReservation.rateQuestion;
    const questionButtonYes = !past
      ? localization.APPOINTMENTS.cancelReservation.yesButton
      : localization.APPOINTMENTS.rateReservation.yesButton;
    const questionButtonNo =
      localization.APPOINTMENTS.cancelReservation.noButton;

    const submitAppointment = past
      ? sharedRateQuestionHandler
      : sharedQuestionHandler;

    return (
      <SharedQuestion
        isOpen={isModalQuestion && !isInitialLoading && !isLoading} 
        onClose={() => setIsModalQuestion(false)}
        onLogOut={submitAppointment}
        icon={<FontAwesome name="question-circle-o" size={64} color="white" />}
        title={titleQuestion}
        buttonTextYes={questionButtonYes}
        buttonTextNo={questionButtonNo}
      />
    );
  };
  if (isInitialLoading) {
    return <SharedLoader isOpen={isInitialLoading} />;
  }

  if (reservationData)
    return (
      <ScrollView automaticallyAdjustKeyboardInsets style={styles.container}>
        <SharedCoverImage image={company?.media?.coverImageAppointments} />
        <SharedBackButton
          onPress={router.back}
          styleBtn={{ marginBottom: 10 }}
        />

        <HeaderReservationTime data={reservationData} />
        <View style={styles.containerCancel}>
          {reservationData && (
            <SharedDetailsReservation data={reservationData} />
          )}
          {renderDescription()}

          {renderStarComponent()}
          {renderRateDescription()}
          {renderSharedButton()}
        </View>

        {isModalQuestion && renderQuestion()}

        {isModal && !isInitialLoading && !isLoading && (
          <SharedMessage
            isOpen={isModal && !isInitialLoading && !isLoading}
            onClose={confirmHandler}
            onConfirm={confirmHandler}
            icon={
              <FontAwesome
                name={error ? "close" : "check-circle-o"}
                size={64}
                color="white"
              />
            }
            title={error || message}
            buttonText="Ok"
          />
        )}
        <SharedLoader isOpen={isLoading} />
      </ScrollView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  containerWrapper: {
    marginTop: 10,
    display: "flex",
  },
  noWrapper: {
    display: "none",
  },
  btnSubmitContainer: {
    display: "flex",
    marginVertical: 20,
    marginHorizontal: 20,
  },
  containerCancel: {
    marginTop: 10,
  },
  description: {
    color: "white",
  },
  descContent: {
    marginVertical: 1,
    marginHorizontal: 10,
    alignItems: "center",
    padding: 12,
  },
});
export default withKeyboardAvoid(ResevationNotificationScreen);
