import {
  View,
} from "react-native";
import OtpInput from "./OtpCodeInput";
import { useEffect, useState } from "react";
import ResendOtpCodeTimer from "./ResendOtpCodeTimer";
import useSubmitOtpCode from "./hooks/useSubmitOtpCode";
import { router } from "expo-router";
import { useLocalization } from "@/context/LocalizationContext";
import {
  getOtpParamsStorage,
  removeOtpParamsStorage,
} from "@/helpers/verificationOtpParams";
import { makeStyles } from "@/theme";
import { AppText, Button, Icon, Loader, MessageDialog, Pressable, Screen } from "@/components/ui";
import { routes } from "@/lib/navigation/routes";

const OtpCode = () => {
  const styles = useStyles();
  const [code, setCode] = useState(Array(6).fill(""));
  const [verifyData, setVerifyData] = useState(null);
  const [isLoaderVerify, setIsLoaderVerify] = useState(false);
  const { localization } = useLocalization();

  const getOtpParams = async () => {
    setIsLoaderVerify(true);

    try {
      const result = await getOtpParamsStorage();
      setVerifyData(JSON.parse(result));
      setIsLoaderVerify(false);
    } catch (error) {}
  };
  useEffect(() => {
    getOtpParams();
  }, []);

  const {
    checkOtpCodeValidation,
    checkOtpCodeVerification,
    message,
    setIsMessage,
    isMessage,
    error,
    isLoading,
    isVerified,
    verificationOTPCode,
    checkverifyEmail,
    verificationOTPCodeResend,
    setError,
  } = useSubmitOtpCode();

  const handleVerify = async () => {
    const otp = code.join("");
    if (otp.length !== 6) {
      setIsMessage(true);
      setError(localization.OTP_CODE.validCode);
      return;
    }
    if (otp.length === 6) {
      if (
        verifyData?.email &&
        verifyData?.password &&
        verifyData?.confirmPassword
      ) {
        checkverifyEmail(verifyData?.email, otp);
      } else if (verifyData?.email && verifyData?.password) {
        checkOtpCodeVerification(verifyData?.email, verifyData?.password, otp);
      } else {
        checkOtpCodeValidation(verifyData?.email, otp);
      }
    } else {
      setIsMessage(true);
      setError(localization.OTP_CODE.validCode);
    }
  };

  const confirmHandler = async () => {
    setIsMessage(false);
    router.dismissAll();
    // changePassword
    if (verifyData?.email && !verifyData?.password) {
      router.push({
        pathname: routes.auth.changePassword,
        params: { data: verifyData?.email },
      });
    }
    // ovo ti je kad ostavi otp code za kasnije pa mora preko login forme

    if (isVerified && verifyData?.email && verifyData?.password) {
      await removeOtpParamsStorage();
    }

    // verification via otp code - register

    if (
      verifyData?.email &&
      verifyData?.password &&
      verifyData?.confirmPassword
    ) {

      await removeOtpParamsStorage();

      router.replace(routes.auth.login);
    }
  };

  const handleResendCodeHandler = () => {
    verificationOTPCodeResend(verifyData);
  };
  const confirmHandler2 = () => {
    setIsMessage(false);
  };

  if (verifyData) {
    return (
      <Screen mode="form">
        <Pressable hitSlop={20} onPress={router.back} style={styles.back}>
          <Icon name="back" />
        </Pressable>

        <View style={styles.body}>
          <AppText variant="displayLg">{localization.OTP_CODE.mainTitle}</AppText>
          <AppText variant="body" color="inkMuted" style={styles.lead}>
            {localization.OTP_CODE.subtitlePrimary} {verifyData?.email}. {localization.OTP_CODE.subtitleSecondary}
          </AppText>
          <OtpInput code={code} setCode={setCode} />
          <ResendOtpCodeTimer resendHandler={handleResendCodeHandler} />
        </View>
        <Button style={styles.submit} onPress={handleVerify} title={localization.SUBMIT.label} loading={isLoading} />
        {isLoaderVerify && <Loader />}
        {isMessage && (
          <MessageDialog
            isOpen={isMessage}
            onClose={!error ? confirmHandler : confirmHandler2}
            onConfirm={!error ? confirmHandler : confirmHandler2}
            icon={<Icon name={error ? "close" : "check"} size={32} />}
            title={error || message}
            buttonText={localization.OK.label}
          />
        )}
      </Screen>
    );
  }
};

const useStyles = makeStyles(() => ({
  back: { alignSelf: "flex-start", padding: 4, marginTop: 16, marginBottom: 16 },
  body: { flex: 1 },
  lead: { marginTop: 8 },
  submit: { marginTop: 24, marginBottom: 32 },
}));
export default OtpCode;
