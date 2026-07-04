import { useLocalization } from "@/context/LocalizationContext";
import SharedButtonDateReservation from "@/shared-components/SharedButtonDateReservation";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { SharedQuestion } from "@/shared-components/SharedQuestion";
import { SharedMessage } from "@/shared-components/SharedMessage";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import SharedCoverImage from "@/shared-components/SharedCoverImage";
import { useCompany } from "@/context/CompanyContext";
import SharedDetailsReservation from "@/shared-components/SharedDetailsReservation";
import HeaderReservationTime from "@/components/reservation/HeaderReservationTime";
import StarRating from "@/components/reservation/StarRateComponent";
import SharedInputTextAreaMark from "@/shared-components/SharedInputTextAreaMark";
import ReservationMarkComponent from "@/components/reservation/ReservationMarkComponent";
import withKeyboardAvoid from "../wrapper/WrapperKeyboard";
import SharedBackButton from "@/shared-components/SharedBackButton";
import { useAppointment } from "@/context/AppointmentContext";
import { SharedLoader } from "@/shared-components/SharedLoader";

function ResevationNotificationScreen() {
  const { localization } = useLocalization();
  const { company } = useCompany();
  const {
    reservationData,
    fetchReservationDetails,
    rateReservation,
    cancelReservation,
    error,
    message,
    loading,
    isModalQuestion,
    setIsModalQuestion,
    setIsModal,
    isModal,
    setDescription,
    description,
  } = useAppointment();

  const { itemId, past, rating, status } = useLocalSearchParams();

  useEffect(() => {
    fetchReservationDetails(itemId);
  }, [itemId]);

  const [userFeedbackRating, setUserFeedbackRating] = useState(5);

  const renderDescription = () => {
    if (reservationData?.description) {
      return (
        <View style={styles.card}>
          <View style={styles.descContent}>
            <View>
              <Text style={styles.descriptionLabel}>
                {localization.APPOINTMENTS.rateReservation.descReservation}
              </Text>
            </View>
            <View>
              <Text style={styles.descriptionValue}>
                {reservationData?.description}
              </Text>
            </View>
          </View>
        </View>
      );
    }
  };
  const renderRateDescription = () => {
    if (reservationData?.rating?.description) {
      return (
        <>
          <View
            style={{
              borderTopWidth: 1,
              borderTopColor: "#414141",
              width: "100%",
              marginTop: 2,
              marginBottom: 5,
            }}
          />
          <View style={styles.descContent}>
            <View>
              <Text style={styles.descriptionLabel}>
                {localization.APPOINTMENTS.rateReservation.descRateReservation}
              </Text>
            </View>
            <View>
              <Text style={styles.descriptionValue}>
                {reservationData?.rating?.description}
              </Text>
            </View>
          </View>
        </>
      );
    }

    if (
      past &&
      !reservationData?.rating?.description &&
      !reservationData?.rating
    )
      return (
        <>
          <View
            style={{
              borderTopWidth: 1,
              borderTopColor: "#414141",
              width: "100%",
              marginTop: 2,
            }}
          />
          <SharedInputTextAreaMark
            placeholderText={
              localization.APPOINTMENTS.rateReservation.rateExplanation
            }
            description={description}
            setDescription={setDescription}
          />
        </>
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

    rateReservation(itemId, userFeedbackRating, description);
  };

  const sharedQuestionHandler = () => {
    setIsModalQuestion(false);

    cancelReservation(itemId);
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
        isOpen={isModalQuestion}
        onClose={() => setIsModalQuestion(false)}
        onLogOut={submitAppointment}
        icon={<FontAwesome name="question-circle-o" size={64} color="white" />}
        title={titleQuestion}
        buttonTextYes={questionButtonYes}
        buttonTextNo={questionButtonNo}
      />
    );
  };

  if (
    loading === "rating" ||
    loading === "cancelling" ||
    loading === "fetchById"
  ) {
    return (
      <SharedLoader
        isOpen={
          loading === "rating" ||
          loading === "cancelling" ||
          loading === "fetchById"
        }
      />
    );
  }
  const renderRejectionTitle = () => {
    return (
      <View style={styles.missed}>
        <Text style={styles.textBoldRejected}>
          {localization.APPOINTMENTS.cancelReservation.rejectedMessage}
        </Text>
      </View>
    );
  };
  return (
    <View style={{ flex: 1 }}>
      <ScrollView automaticallyAdjustKeyboardInsets style={styles.container}>
        <SharedCoverImage image={company?.media?.coverImageAppointments} />
        <SharedBackButton
          onPress={router.back}
          styleBtn={{ marginBottom: 10 }}
        />

        {reservationData && (
          <>
            <HeaderReservationTime data={reservationData} />
            <View style={styles.containerCancel}>
              {reservationData && (
                <SharedDetailsReservation data={reservationData} />
              )}

              {renderDescription()}

              {past && status !== "1" && (
                <View style={styles.card}>
                  {renderStarComponent()}
                  {renderRateDescription()}
                </View>
              )}
            </View>
            {status === "1" && renderRejectionTitle()}
          </>
        )}
      </ScrollView>
      {status !== "1" && renderSharedButton()}

      {isModalQuestion && renderQuestion()}

      {isModal && (
        <SharedMessage
          isOpen={isModal}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  descriptionLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 5,
  },
  textBoldRejected: {
    color: "grey",
    fontSize: 24,
  },
  textBoldSuccess: {
    color: "grey",
    fontSize: 24,
    textAlign: "center",
  },
  missed: {
    height: "50%",
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "center",
  },
  descriptionValue: {
    fontSize: 14,
    color: "#CCCCCC",
  },
  containerWrapper: {
    marginTop: 10,
  },

  btnSubmitContainer: {
    marginVertical: 20,
    marginHorizontal: 20,
  },
  containerCancel: {
    marginTop: 10,
  },
  description: {
    color: "white",
  },
  card: {
    flexDirection: "column",
    backgroundColor: "#1E1E1E",
    borderRadius: 12,
    marginVertical: 8,
    marginHorizontal: 15,
    padding: 12,
    alignItems: "flex-start",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  descContent: {
    marginVertical: 1,
    alignItems: "flex-start",
  },
});
export default withKeyboardAvoid(ResevationNotificationScreen);
