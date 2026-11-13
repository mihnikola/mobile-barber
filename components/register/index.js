import {
  View,
  ScrollView,
  findNodeHandle,
} from "react-native";
import React, { useRef, useState } from "react";
import { useConfirmPasswordField, useEmailField, usePasswordField } from "@/lib/hooks/useFormFields";
import useRegisterForm from "./hooks/useRegisterForm";
import SharedRedirect from "@/components/layout/SharedRedirect";
import usePhoneNumber from "./hooks/usePhoneNumber";
import { router, useLocalSearchParams } from "expo-router";
import { useLocalization } from "@/context/LocalizationContext";
import SharedLogin from "@/components/layout/SharedLogin";
import { saveOtpParamsStorage } from "@/helpers/verificationOtpParams";
import { makeStyles } from "@/theme";
import { AppText, BackButton, Button, Icon, MessageDialog, PasswordField, PhoneField, TextField } from "@/components/ui";
import { routes } from "@/lib/navigation/routes";
const Register = () => {
  const styles = useStyles();
  const refName = useRef(null);
  const [name, setName] = useState("");
  const scrollRef = useRef(null);
  const emailLayoutY = useRef(0);
  const phoneNumberLayoutY = useRef(0);
  const passwordLayoutY = useRef(0);
  const passwordConfirmLayoutY = useRef(0);

  const { image } = useLocalSearchParams();
  const { localization } = useLocalization();
  const {
    loading,
    error,
    isMessage,
    setIsMessage,
    success,
    handleSubmit: handleRegistration,
  } = useRegisterForm();
  // const { emailInputRef, emailError, handleEmailChange } = useEmailField();
  const { email, emailError, handleEmailChange, emailInputRef } = useEmailField();

  const {
    phoneNumber,
    handlePhoneNumberChange,
    errorPhoneNumber,
    phoneNumberInputRef,
  } = usePhoneNumber();
  const { password, passwordError, handlePasswordChange, passwordInputRef } =
    usePasswordField();
  const {
    confirmPassword,
    handleConfirmPasswordChange,
    confirmPasswordInputRef,
  } = useConfirmPasswordField(password);

  const handleRegister = () => {
    handleRegistration({
      name,
      email,
      password,
      phoneNumber,
      emailError,
      passwordError,
      confirmPassword,
    });
  };

  const navigateToLogin = () => {
    router.back();
  };
  const confirmHandler = async () => {
    setIsMessage(false);
    const verifyData = { email, password, confirmPassword };
    await saveOtpParamsStorage(verifyData);
    router.push(routes.auth.otpCode);
  };

  const confirmHandler2 = () => {
    setIsMessage(false);
  };

  return (
    <ScrollView
      ref={scrollRef}
      keyboardDismissMode="interactive"
      style={styles.screen}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="always"
    >
      <View style={styles.container}>
        <BackButton style={styles.back} />
        <View style={styles.header}>
          <SharedLogin />
          <AppText variant="displayLg" align="center" style={styles.title}>
            {localization.REGISTER.title}
          </AppText>
          <AppText variant="body" color="inkMuted" align="center">
            {localization.REGISTER.description}
          </AppText>
        </View>

        <TextField
          autoFocus
          label={localization.NAME.label}
          placeholder={localization.NAME.placeholder}
          ref={refName}
          returnKeyType="next"
          onSubmitEditing={() => emailInputRef.current.focus()}
          value={name}
          onChangeText={setName}
        />
        <View
          onLayout={(e) => {
            emailLayoutY.current = e.nativeEvent.layout.y;
          }}
        >
          <TextField
            label={localization.EMAIL.label}
            placeholder={localization.EMAIL.placeholder}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            error={emailError}
            onChangeText={handleEmailChange}
            ref={emailInputRef}
            returnKeyType="next"
            onSubmitEditing={() => {
              phoneNumberInputRef.current?.focus();
              scrollRef.current?.scrollTo({
                y: emailLayoutY.current - 20,
                animated: true,
              });
            }}
          />
        </View>
        <View
          onLayout={(e) => {
            phoneNumberLayoutY.current = e.nativeEvent.layout.y;
          }}
        >
          <PhoneField
            label={localization.PHONENUMBER.label}
            placeholder="6x xxx xxxx"
            keyboardType="phone-pad"
            dataDetectorTypes="phoneNumber"
            value={phoneNumber}
            onChangeText={handlePhoneNumberChange}
            autoComplete="tel"
            ref={phoneNumberInputRef}
            error={errorPhoneNumber}
            returnKeyType="next"
            onSubmitEditing={() => {
              const node = findNodeHandle(passwordInputRef.current);
              if (node) {
                scrollRef.current?.scrollResponderScrollNativeHandleToKeyboard(
                  node,
                  80,
                  true,
                );
              }
              passwordInputRef.current?.focus();
            }}
          />
        </View>
        <View
          onLayout={(e) => (passwordLayoutY.current = e.nativeEvent.layout.y)}
        >
          <PasswordField
            label={localization.PASSWORD.label}
            value={password}
            onChangeText={handlePasswordChange}
            placeholder={localization.PASSWORD.placeholder}
            error={passwordError}
            ref={passwordInputRef}
            returnKeyType="next"
            onSubmitEditing={() => {
              const node = findNodeHandle(confirmPasswordInputRef.current);
              if (node) {
                scrollRef.current?.scrollResponderScrollNativeHandleToKeyboard(
                  node,
                  80,
                  true,
                );
              }
              confirmPasswordInputRef.current?.focus();
            }}
          />
        </View>
        <View
          onLayout={(e) =>
            (passwordConfirmLayoutY.current = e.nativeEvent.layout.y)
          }
        >
          <PasswordField
            label={localization.CONFIRM_PASSWORD.label}
            value={confirmPassword}
            ref={confirmPasswordInputRef}
            onFocus={() => {
              scrollRef.current?.scrollToEnd({ animated: true });
            }}
            onChangeText={handleConfirmPasswordChange}
            placeholder={localization.CONFIRM_PASSWORD.placeholder}
          />
        </View>

        <Button
          style={styles.submit}
          disabled={
            emailError.length > 0 ||
            passwordError.length > 0 ||
            errorPhoneNumber.length > 0
          }
          loading={loading}
          onPress={handleRegister}
          title={localization.REGISTER.submitBtn}
        />

        <SharedRedirect
          onPress={navigateToLogin}
          question={localization.REGISTER.question}
          text={localization.REGISTER.CTA}
        />
        {isMessage && (
          <MessageDialog
            isOpen={isMessage}
            onClose={!error ? confirmHandler : confirmHandler2}
            onConfirm={!error ? confirmHandler : confirmHandler2}
            icon={
              <Icon name={error ? "close" : "check"} size={32} />
            }
            title={error || success}
            buttonText={localization.OK.label}
          />
        )}
      </View>
    </ScrollView>
  );
};

const useStyles = makeStyles((colors) => ({
  screen: { flex: 1, backgroundColor: colors.bg },
  content: { flexGrow: 1, paddingHorizontal: 16, paddingTop: 16, paddingBottom: 32 },
  container: { flex: 1 },
  back: { alignSelf: "flex-start" },
  header: { alignItems: "center", gap: 8, marginTop: 8, marginBottom: 8 },
  title: { marginTop: 16 },
  submit: { marginTop: 24, marginBottom: 24 },
}));

export default Register;
