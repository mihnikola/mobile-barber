import { View, Text, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import useEmailOtpCode from "../changePass/hooks/useEmailOtpCode";
import { SharedMessage } from "@/shared-components/SharedMessage";
import { FontAwesome } from "@expo/vector-icons";

const RESEND_TIME = 50; // seconds
// const RESEND_TIME = 10; // seconds

const ResendOtpCodeTimer = ({ email }) => {
  const [timer, setTimer] = useState(RESEND_TIME);
  const [canResend, setCanResend] = useState(false);

  const { checkEmailValidation, isMessage,setIsMessage,setMessage,error,message } = useEmailOtpCode();
  const confirmHandler = () => {
    setIsMessage(false);
    setMessage(null);
  };
  const handleResendCode = () => {
    if (!canResend) return;

    checkEmailValidation(email);
    // Resend OTP logic goes here (API call)
    console.log("OTP resent!");
    // Restart timer
    setTimer(RESEND_TIME);
    setCanResend(false);
    // setCode([]);
  };
  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setTimeout(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer]);

  return (
    <View>
      {canResend ? (
        <Text style={styles.resendText} onPress={handleResendCode}>
          Resend Code
        </Text>
      ) : (
        <Text style={styles.timerText}>Resend Code in {timer}s</Text>
      )}
      {isMessage && (
        <SharedMessage
          isOpen={isMessage}
          onClose={confirmHandler}
          onConfirm={confirmHandler}
          icon={
            <FontAwesome
              name={error ? "close" : "check-circle-o"} // The specific FontAwesome icon to use
              size={64} // Size of the icon
              color="white" // Corresponds to text-blue-500
            />
          }
          title={error || message} // Title of the modal
          buttonText="Ok" // Text for the action button
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  resendContainer: {
    alignItems: "center",
    marginVertical: 15,
  },
  resendText: {
    color: "#00AEEF",
    fontSize: 16,
    fontWeight: "bold",
  },
  timerText: {
    color: "#999",
    fontSize: 14,
  },
});
export default ResendOtpCodeTimer;
