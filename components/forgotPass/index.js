import { View, StyleSheet } from "react-native";
import { Platform } from "react-native";
import SharedButton from "@/shared-components/SharedButton";
import useEmailOtpCode from "../changePass/hooks/useEmailOtpCode";
import { SharedMessage } from "@/shared-components/SharedMessage";
import SharedInput from "@/shared-components/SharedInput";
import useEmail from "./hooks/useEmail";
import { useLocalization } from "@/context/LocalizationContext";
import SharedBackButton from "@/shared-components/SharedBackButton";
import { router } from "expo-router";
import { colors, fonts } from "@/theme";
import { AppText, Icon, Pressable, Screen } from "@/components/ui";

const ForgotPassword = () => {
  const { email, emailError, handleEmailChange } = useEmail();

  const { localization } = useLocalization();

  const {
    checkEmailValidation,
    error,
    setError,
    isLoading,
    isMessage,
    setIsMessage,
  } = useEmailOtpCode();
  const navHandler = () => {
    checkEmailValidation(email);
  };

  const confirmHandler2 = () => {
    setIsMessage(false);
    setError(null);
  };
  return (
    <Screen mode="form">
      {/* <SharedBackButton
        onPress={router.back}
        absolutePosition={false}
        styleBtn={{ marginBottom: 30 }}
      /> */}

      <Pressable
        hitSlop={20}
        onPress={router.back}
        style={{ marginVertical: 15 }}
      >
        <Icon name="back" size={25} />
      </Pressable>

      <View style={{ flex: 1 }}>
        <View>
          <AppText variant="heading">
            {localization.FORGOT_PASSWORD.title}
          </AppText>

          <AppText variant="bodyLg" color="textInactive" style={styles.subtitle}>
            {localization.FORGOT_PASSWORD.subtitle}
          </AppText>
        </View>
        <View style={{ marginTop: 10 }}>
          <SharedInput
            label={localization.EMAIL.label}
            value={email}
            onChangeText={handleEmailChange}
            placeholder={localization.EMAIL.placeholder}
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
            error={emailError}
          />
        </View>
      </View>

      <View style={{ marginBottom: 20 }}>
        <SharedButton
          disabled={emailError.length > 0 && email.length > 0}
          onPress={navHandler}
          loading={isLoading}
          text={localization.FORGOT_PASSWORD.submitBtn}
        />
      </View>

      {error && (
        <SharedMessage
          isOpen={isMessage || error}
          onClose={error && confirmHandler2}
          onConfirm={error && confirmHandler2}
          icon={
            <Icon name="close" size={64} color="text" />
          }
          title={error}
          buttonText={localization.OK.label}
        />
      )}
    </Screen>
  );
};
const styles = StyleSheet.create({
  subtitle: {

    lineHeight: 22,
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

  image: {
    resizeMode: "contain",
  },
  input: {
    backgroundColor: colors.white,
    color: colors.textOnLight,
    fontFamily: fonts.regular,

    padding: 15,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 2,
    borderColor: colors.white,
    paddingVertical: 15,
  },
});
export default ForgotPassword;
