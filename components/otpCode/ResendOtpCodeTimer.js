import { View } from "react-native";
import { useEffect, useState } from "react";
import { useLocalization } from "@/context/LocalizationContext";
import { AppText } from "@/components/ui";

const RESEND_TIME = 50;
const ResendOtpCodeTimer = ({ resendHandler }) => {
  const [timer, setTimer] = useState(RESEND_TIME);
  const [canResend, setCanResend] = useState(false);

  const { localization } = useLocalization();

  const handleResendCodeHandler = () => {
    if (!canResend) return;
    setTimer(RESEND_TIME);
    setCanResend(false);
    resendHandler();
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
        <AppText variant="label" color="link" onPress={handleResendCodeHandler}>
          {localization.OTP_CODE.codeResendCapture}
        </AppText>
      ) : (
        <AppText color="textInactive">
          {localization.OTP_CODE.codeResend} {timer}
        </AppText>
      )}
      
    </View>
  );
};
export default ResendOtpCodeTimer;