import { useLocalization } from "@/context/LocalizationContext";
import { Dimensions, ScrollView, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import SharedCoverImage from "@/components/layout/SharedCoverImage";
import SharedDetailsReservation from "@/components/booking/SharedDetailsReservation";
import StarRating from "@/components/reservation/StarRateComponent";
import ReservationMarkComponent from "@/components/reservation/ReservationMarkComponent";
import SharedBackButton from "@/components/layout/SharedBackButton";
import { useAppointment } from "@/context/AppointmentContext";
import { coverImageAppointments } from "@/constants";
import HeaderCoverImageContainer from "@/components/layout/HeaderCoverImageContainer";
import { fonts, makeStyles, useTheme } from "@/theme";
import { AppText, Button, ConfirmDialog, Icon, layout, Loader, MessageDialog, TextArea, withScreen } from "@/components/ui";

const { height: windowHeight } = Dimensions.get("window");

function ResevationNotificationScreen() {
  const { colors } = useTheme();
  const styles = useStyles();
  const { localization } = useLocalization();
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
  
  const [isExpired, setIsExpired] = useState(false);
  const { itemId, past, rating, status, notification } = useLocalSearchParams();
  useEffect(() => {
    fetchReservationDetails(itemId, notification);
  }, [itemId]);

  const [userFeedbackRating, setUserFeedbackRating] = useState(5);

  const renderDescription = () => {
    if (reservationData?.description) {
      return (
        <View style={styles.card}>
          <View style={styles.descContent}>
            <View>
              <AppText variant="bodyStrong" style={styles.descriptionLabel}>
                {localization.APPOINTMENTS.rateReservation.descReservation}
              </AppText>
            </View>
            <View>
              <AppText variant="bodySm">
                {reservationData?.description}
              </AppText>
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
              borderTopColor: colors.ink,
              width: "100%",
              marginTop: 2,
              marginBottom: 5,
            }}
          />
          <View style={styles.descContent}>
            <View>
              <AppText variant="bodyStrong" style={styles.descriptionLabel}>
                {localization.APPOINTMENTS.rateReservation.descRateReservation}
              </AppText>
            </View>
            <View>
              <AppText variant="bodySm">
                {reservationData?.rating?.description}
              </AppText>
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
              borderTopColor: colors.line,
              width: "100%",
              marginTop: 2,
            }}
          />
          <TextArea variant="plain"
            placeholder={
              localization.APPOINTMENTS.rateReservation.rateExplanation
            }
            value={description}
            onChangeText={setDescription}
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

    if (!reservationData?.rating && Number(reservationData?.status) !== 1) {
      return (
        <View style={styles.btnSubmitContainer}>
          <Button style={layout.buttonBlock}
            onPress={modalReservationHandler}
            title={buttonLabel}
          />
        </View>
      );
    }
  };
  const expirationChecked = (expirationDate) => {
    const now = new Date();
    if (
      new Date(expirationDate).getTime() < now.getTime() &&
      Number(reservationData?.status) === 2
    ) {
      setIsExpired(true);
    } else {
      setIsExpired(false);
    }
  };
  useEffect(() => {
    if (reservationData) {
      expirationChecked(reservationData?.expirationDate);
    }
  }, [reservationData]);

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
      <ConfirmDialog
        isOpen={isModalQuestion}
        onClose={() => setIsModalQuestion(false)}
        onConfirm={submitAppointment}
        icon={
          <Icon name="question" size={64} color="ink" />
        }
        title={titleQuestion}
        confirmText={questionButtonYes}
        cancelText={questionButtonNo}
      />
    );
  };

  if (
    loading === "rating" ||
    loading === "cancelling" ||
    loading === "fetchById"
  ) {
    return (
      <Loader variant="overlay" visible={
          loading === "rating" ||
          loading === "cancelling" ||
          loading === "fetchById"
        } />
    );
  }
  const renderRejectionTitle = () => {
    return (
      <View style={styles.missed}>
        <AppText variant="displayMd" style={styles.textBoldRejected}>
          {localization.APPOINTMENTS.cancelReservation.rejectedMessage}
        </AppText>
      </View>
    );
  };
  const renderExpirationTitle = () => {
    return (
      <View style={styles.missed}>
        <AppText variant="displayMd" style={styles.textBoldRejected}>
          {localization.APPOINTMENTS.cancelReservation.expiredMessage}
        </AppText>
      </View>
    );
  };
  return (
    <View style={{ flex: 1 }}>
      <ScrollView automaticallyAdjustKeyboardInsets style={styles.container}>
        <HeaderCoverImageContainer
          image={coverImageAppointments}
          reservationData={reservationData}
        />

        {reservationData && (
          <>
            <View style={styles.containerCancel}>
              {reservationData && (
                <SharedDetailsReservation
                  key={reservationData?.id || reservationData?._id}
                  data={reservationData}
                />
              )}
              {renderDescription()}
              {past &&
                (status !== "1" || Number(reservationData?.status) !== 1) && (
                  <View style={styles.card}>
                    {renderStarComponent()}
                    {renderRateDescription()}
                  </View>
                )}
            </View>
            {(status === "1" || Number(reservationData?.status) === 1) &&
              renderRejectionTitle()}

            {(status === "2" || Number(reservationData?.status) === 2) &&
              isExpired &&
              renderExpirationTitle()}

          </>
        )}
      </ScrollView>
      {(status !== "1" || Number(reservationData?.status) !== 1) &&
        !isExpired &&
        renderSharedButton()}

      {isModalQuestion && renderQuestion()}

      {isModal && (
        <MessageDialog
          isOpen={isModal}
          onClose={confirmHandler}
          onConfirm={confirmHandler}
          icon={
            <Icon name={error ? "close" : "check"} size={64} color="ink" />
          }
          title={error || message}
          buttonText="Ok"
        />
      )}
    </View>
  );
}

const useStyles = makeStyles((colors) => ({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  descriptionLabel: {
    marginBottom: 5,
  },
  textBoldRejected: {
    fontSize: windowHeight < 667 ? 18 : 22, // Prilagođen font za manje/veće ekrane
    textAlign: "center",
  },
  textBoldSuccess: {
    color: colors.ink,

    fontFamily: fonts.displaySemiBold,
    fontSize: 24,
    textAlign: "center",
  },
  missed: {
    minHeight: windowHeight * 0.4, // Zauzima 40% visine ekrana
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
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
    color: colors.ink,
  },
  card: {
    flexDirection: "column",
    backgroundColor: colors.surface,
    borderRadius: 12,
    marginVertical: 8,
    marginHorizontal: 15,
    padding: 12,
    alignItems: "flex-start",
    shadowColor: colors.bg,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  descContent: {
    marginVertical: 1,
    alignItems: "flex-start",
  },
}));
export default withScreen(ResevationNotificationScreen, "keyboard");
