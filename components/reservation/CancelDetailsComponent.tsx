import { useLocalization } from "@/context/LocalizationContext";
import SharedButtonDateReservation from "@/shared-components/SharedButtonDateReservation";
import { BackHandler, ScrollView, StyleSheet, Text, View } from "react-native";
import useCancelReservation from "./hooks/useCancelReservation";
import { FontAwesome } from "@expo/vector-icons";
import { SharedQuestion } from "@/shared-components/SharedQuestion";
import { SharedMessage } from "@/shared-components/SharedMessage";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { SharedLoader } from "@/shared-components/SharedLoader";
import { useCallback, useEffect, useState } from "react";
import useFetchReservation from "./hooks/useFetchReservation";
import HeaderReservationTime from "./HeaderReservationTime";
import SharedCoverImage from "@/shared-components/SharedCoverImage";
import { useCompany } from "@/context/CompanyContext";
import SharedDetailsReservation from "@/shared-components/SharedDetailsReservation";

function CancelDetailsComponent() {
  const { localization } = useLocalization();
  const { itemId } = useLocalSearchParams();
  const {
    reservationData,
    isLoading: isLoadingReservationData,
    error,
    fetchReservationDetails,
  } = useFetchReservation();

  useEffect(() => {
    fetchReservationDetails(itemId);
  }, []);
  const [isCanceling, setIsCanceling] = useState(false);
  const { company } = useCompany();

  const {
    isLoading,
    cancelReservation,
    cancelError,
    cancelSuccess,
    setCancelSuccess,
  } = useCancelReservation();

  useFocusEffect(
    useCallback(()=>{
      const backAction = () => {
        router.push("/(tabs)/(03_calendar)")
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();

    },[])
  )

  const cancelReservationHandler = () => {
    setIsCanceling(true);
  };
  const sharedQuestionHandler = () => {
    setIsCanceling(false);
    cancelReservation(itemId);
  };
  const confirmHandler = () => {
    setCancelSuccess(null);
    router.back();
  };
  const cancelHandler = () => {
    setIsCanceling(false);
  };

  if(isLoading || isLoadingReservationData){
    return <SharedLoader />
  }
  if (reservationData) {
    return (
      <ScrollView style={styles.container}>
        <SharedCoverImage image={company?.media?.coverImageAppointments} />
        <HeaderReservationTime data={reservationData} />
        <View style={styles.containerCancel}>
          {reservationData && (
            <SharedDetailsReservation data={reservationData} />
          )}
          {reservationData?.description && (
            <View style={styles.containerWrapper}>
              <Text>{localization.APPOINTMENTS.description}</Text>
              <Text style={styles.description}>
                {reservationData?.description}
              </Text>
            </View>
          )}

          <View style={styles.btnSubmitContainer}>
            <SharedButtonDateReservation
              onPress={cancelReservationHandler}
              text={localization.APPOINTMENTS.cancelReservation.cancelButton}
            />
          </View>
        </View>
        {isCanceling && !cancelError && !cancelSuccess && (
          <SharedQuestion
            isOpen={isCanceling}
            onClose={() => setIsCanceling(false)}
            onLogOut={sharedQuestionHandler}
            icon={
              <FontAwesome name="question-circle-o" size={64} color="white" />
            }
            title={localization.APPOINTMENTS.cancelReservation.cancelQuestion}
            buttonTextYes={
              localization.APPOINTMENTS.cancelReservation.yesButton
            }
            buttonTextNo={localization.APPOINTMENTS.cancelReservation.noButton}
          />
        )}

        {cancelSuccess?.length > 0 && (
          <SharedMessage
            isOpen={cancelSuccess?.length > 0}
            onClose={!cancelError ? confirmHandler : cancelHandler}
            onConfirm={!cancelError ? confirmHandler : cancelHandler}
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
    display: "flex",
  },
  btnSubmitContainer: {
    display: "flex",
    marginVertical: 20,
    marginHorizontal: 20,
  },
  containerCancel: {
    marginTop: 10,
  },
});
export default CancelDetailsComponent;
