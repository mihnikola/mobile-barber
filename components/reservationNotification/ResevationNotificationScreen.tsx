import { useLocalization } from "@/context/LocalizationContext";
import { ScrollView, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import SharedDetailsReservation from "@/components/booking/SharedDetailsReservation";
import StarRating from "@/components/reservation/StarRateComponent";
import ReservationMarkComponent from "@/components/reservation/ReservationMarkComponent";
import { useAppointment } from "@/context/AppointmentContext";
import { coverImageAppointments } from "@/constants";
import HeaderCoverImageContainer from "@/components/layout/HeaderCoverImageContainer";
import { makeStyles } from "@/theme";
import { AppText, Button, Card, ConfirmDialog, EmptyState, Icon, layout, Loader, MessageDialog, TextArea, withScreen } from "@/components/ui";

function ResevationNotificationScreen() {
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
        <Card>
          <AppText variant="bodyStrong" style={styles.descriptionLabel}>
            {localization.APPOINTMENTS.rateReservation.descReservation}
          </AppText>
          <AppText variant="bodySm" color="inkMuted">
            {reservationData?.description}
          </AppText>
        </Card>
      );
    }
  };
  const renderRateDescription = () => {
    if (reservationData?.rating?.description) {
      return (
        <>
          <View style={styles.divider} />
          <AppText variant="bodyStrong" style={styles.descriptionLabel}>
            {localization.APPOINTMENTS.rateReservation.descRateReservation}
          </AppText>
          <AppText variant="bodySm" color="inkMuted">
            {reservationData?.rating?.description}
          </AppText>
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
          <View style={styles.divider} />
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
        <View style={styles.actionBar}>
          <Button style={layout.buttonBlock}
            variant={past ? "primary" : "danger"}
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
      <EmptyState icon="close" title={localization.APPOINTMENTS.cancelReservation.rejectedMessage} />
    );
  };
  const renderExpirationTitle = () => {
    return (
      <EmptyState icon="clock" title={localization.APPOINTMENTS.cancelReservation.expiredMessage} />
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
                  <Card style={styles.rateCard}>
                    {renderStarComponent()}
                    {renderRateDescription()}
                  </Card>
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
  container: { flex: 1, backgroundColor: colors.bg },
  containerCancel: { marginTop: 8, paddingBottom: 16 },
  descriptionLabel: { marginBottom: 4 },
  rateCard: { alignItems: "stretch" },
  divider: { height: 1, backgroundColor: colors.line, marginVertical: 12 },
  // sticky bottom action bar (as on the services screen)
  actionBar: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.line,
  },
}))
export default withScreen(ResevationNotificationScreen, "keyboard");
