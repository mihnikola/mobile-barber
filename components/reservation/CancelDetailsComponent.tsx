import { useLocalization } from "@/context/LocalizationContext";
import SharedButtonDateReservation from "@/shared-components/SharedButtonDateReservation";
import { StyleSheet, Text, View } from "react-native";
import useCancelReservation from "./hooks/useCancelReservation";
import { FontAwesome } from "@expo/vector-icons";
import { SharedQuestion } from "@/shared-components/SharedQuestion";
import { SharedMessage } from "@/shared-components/SharedMessage";
import { router } from "expo-router";
import { SharedLoader } from "@/shared-components/SharedLoader";
import { useState } from "react";

function CancelDetailsComponent({ data, itemId }) {
  console.log("CancelDetailsComponent+++")

  const { localization } = useLocalization();
  const {
    isLoading,
    cancelReservation,

    cancelError,
    cancelSuccess,
  } = useCancelReservation();

  const [isCanceling, setIsCanceling] = useState(false);

  const cancelReservationHandler = () => {
    setIsCanceling(true);
  };
  const sharedQuestionHandler = () => {
    setIsCanceling(false);
    console.log("sharedQuestionHandler+++", itemId);
    cancelReservation(itemId);
  };

  const confirmHandler = () => {
    setIsCanceling(false);
    router.back();
  };
  const cancelHandler = () => {
    setIsCanceling(false);
  };
  if (isLoading) {
    return <SharedLoader isOpen={isLoading} />;
  }
  return (
    <>
      <View style={styles.containerCancel}>
        {data?.description && (
          <View style={styles.containerWrapper}>
            <Text>{localization.APPOINTMENTS.description}</Text>
            <Text style={styles.description}>{data?.description}</Text>
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
          buttonTextYes={localization.APPOINTMENTS.cancelReservation.yesButton}
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
    </>
  );
}

const styles = StyleSheet.create({
  containerCancel: {
    position: "relative",
  },
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
export default CancelDetailsComponent;
