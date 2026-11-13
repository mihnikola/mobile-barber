import {
  View,
} from "react-native";
import SharedButton from "@/components/legacy/SharedButton";
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
import { fonts, makeStyles } from "@/theme";
import { AppText, Icon, Loader, MessageDialog, Pressable, Screen } from "@/components/ui";
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
        <Pressable
          hitSlop={20}
          onPress={router.back}
          style={{ marginVertical: 15 }}
        >
          <Icon name="back" size={25} />
        </Pressable>

        <View style={{ flex: 1 }}>
          <View>
            <AppText variant="heading" style={styles.mainTitle}>
              {localization.OTP_CODE.mainTitle}
            </AppText>
          </View>
          <View style={{ marginTop: 20 }}>
            <AppText size={13} color="textInactive">
              {localization.OTP_CODE.subtitlePrimary} {verifyData?.email}.
            </AppText>
            <AppText size={13} color="textInactive">
              {localization.OTP_CODE.subtitleSecondary}
            </AppText>
          </View>
          <OtpInput code={code} setCode={setCode} />
          <ResendOtpCodeTimer resendHandler={handleResendCodeHandler} />
          {/* <SharedImageForgotPass /> */}
        </View>
        <View style={styles.btnFooter}>
          <SharedButton
            // disabled={code.join("").length < 6}
            onPress={handleVerify}
            text={localization.SUBMIT.label}
            loading={isLoading}
          />
        </View>
        {isLoaderVerify && <Loader />}
        {isMessage && (
          <MessageDialog
            isOpen={isMessage}
            onClose={!error ? confirmHandler : confirmHandler2}
            onConfirm={!error ? confirmHandler : confirmHandler2}
            icon={
              <Icon name={error ? "close" : "check"} size={64} color="text" />
            }
            title={error || message}
            buttonText={localization.OK.label}
          />
        )}
      </Screen>
    );
  }
};
const useStyles = makeStyles((colors) => ({
  safeArea: {
    flex: 1,
    backgroundColor: colors.backgroundDeep,
  },
  btnFooter: {
    marginBottom: 20,
  },
  radiobtn: {
    flex: 2,
    flexDirection: "column",
    gap: 25,
  },
  imageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },

  resendText: {
    color: colors.text,
    fontSize: 16,
    fontFamily: fonts.bold,
  },
  timerText: {
    color: colors.text,
    fontFamily: fonts.regular,

    fontSize: 14,
  },
  iconStyle: {
    width: 30,
    height: 30,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: colors.background,
  },
  image: {
    width: 290,
    height: 290,
    resizeMode: "contain",
    backgroundColor: colors.background,
  },
  mainTitle: {
    marginBottom: 5,
  },
  socialButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.white,
  },
}));
export default OtpCode;
