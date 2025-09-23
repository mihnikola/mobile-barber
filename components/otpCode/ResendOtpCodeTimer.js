import { View, Text, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import useEmailOtpCode from "../changePass/hooks/useEmailOtpCode";
import { SharedMessage } from "@/shared-components/SharedMessage";
import { FontAwesome } from "@expo/vector-icons";
import { useLocalization } from "@/context/LocalizationContext";

const RESEND_TIME = 50;

const ResendOtpCodeTimer = ({ email }) => {
  const [timer, setTimer] = useState(RESEND_TIME);
  const [canResend, setCanResend] = useState(false);

  const { localization } = useLocalization();
  const {
    checkEmailValidation,
    isMessage,
    setIsMessage,
    setMessage,
    error,
    message,
    handleResendCode,
  } = useEmailOtpCode();
  const confirmHandler = () => {
    setIsMessage(false);
    setMessage(null);
  };
  const handleResendCodeHandler = () => {
    if (!canResend) return;
    setTimer(RESEND_TIME);
    setCanResend(false);
    handleResendCode(email);
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
        <Text style={styles.resendText} onPress={handleResendCodeHandler}>
          {localization.OTP_CODE.codeResendCapture}
        </Text>
      ) : (
        <Text style={styles.timerText}>
          {localization.OTP_CODE.resendCode} {timer}
        </Text>
      )}
      {isMessage && (
        <SharedMessage
          isOpen={isMessage}
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














// import { View, Text, StyleSheet } from "react-native";
// import { useEffect, useState } from "react";
// import useEmailOtpCode from "../changePass/hooks/useEmailOtpCode";
// import { SharedMessage } from "@/shared-components/SharedMessage";
// import { FontAwesome } from "@expo/vector-icons";
// import { useLocalization } from "@/context/LocalizationContext";

// const RESEND_TIME = 50;

// const ResendOtpCodeTimer = ({ email }) => {
//   const [timer, setTimer] = useState(RESEND_TIME);
//   const [canResend, setCanResend] = useState(false);
//   const { localization } = useLocalization();

//   const {
//     checkEmailValidation,
//     isMessage,
//     setIsMessage,
//     setMessage,
//     error,
//     message,
    
//   } = useEmailOtpCode();
//   const confirmHandler = () => {
//     setIsMessage(false);
//     setMessage(null);
//   };
//   const handleResendCode = () => {
//     if (!canResend) return;
//     checkEmailValidation(email);
//     setTimer(RESEND_TIME);
//     setCanResend(false);
//   };
//   useEffect(() => {
//     let interval = null;
//     if (timer > 0) {
//       interval = setTimeout(() => {
//         setTimer((prev) => prev - 1);
//       }, 1000);
//     } else {
//       setCanResend(true);
//       clearInterval(interval);
//     }
//     return () => clearInterval(interval);
//   }, [timer]);

//   return (
//     <View>
//       {canResend ? (
//         <Text style={styles.resendText} onPress={handleResendCode}>
//           {localization.OTP_CODE.codeResendCapture}
//         </Text>
//       ) : (
//         <Text style={styles.timerText}>
//           {localization.OTP_CODE.codeResend} {timer}
//         </Text>
//       )}
//       {isMessage && (
//         <SharedMessage
//           isOpen={isMessage}
//           onClose={confirmHandler}
//           onConfirm={confirmHandler}
//           icon={
//             <FontAwesome
//               name={error ? "close" : "check-circle-o"}
//               size={64}
//               color="white"
//             />
//           }
//           title={error || message}
//           buttonText="Ok"
//         />
//       )}
//     </View>
//   );
// };
// const styles = StyleSheet.create({
//   resendContainer: {
//     alignItems: "center",
//     marginVertical: 15,
//   },
//   resendText: {
//     color: "#00AEEF",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   timerText: {
//     color: "#999",
//     fontSize: 14,
//   },
// });
// export default ResendOtpCodeTimer;
