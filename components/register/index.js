import {
  View,
  StyleSheet,
  ScrollView,
  findNodeHandle,
} from "react-native";
import React, { useRef, useState } from "react";
import { useConfirmPasswordField, useEmailField, usePasswordField } from "@/lib/hooks/useFormFields";
import useRegisterForm from "./hooks/useRegisterForm";
import { SharedMessage } from "@/components/legacy/SharedMessage";
import SharedInput from "@/components/legacy/SharedInput";
import SharedButton from "@/components/legacy/SharedButton";
import SharedRedirect from "@/components/layout/SharedRedirect";
import usePhoneNumber from "./hooks/usePhoneNumber";
import { router, useLocalSearchParams } from "expo-router";
import SharedPassword from "@/components/legacy/SharedPassword";
import SharedConfirmPassword from "@/components/legacy/SharedConfirmPassword";
import SharedPhoneNumber from "@/components/legacy/SharedPhoneNumber";
import { useLocalization } from "@/context/LocalizationContext";
import SharedLogin from "@/components/layout/SharedLogin";
import { saveOtpParamsStorage } from "@/helpers/verificationOtpParams";
import { colors, fonts } from "@/theme";
import { AppText, Icon, Pressable } from "@/components/ui";
import { routes } from "@/lib/navigation/routes";
const Register = () => {
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
      style={styles.safeArea}
      contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
      keyboardShouldPersistTaps="always"
    >
      <View style={styles.container}>
        <View style={{ marginTop: 10 }}>
          <Pressable hitSlop={20} onPress={router.back}>
            <Icon name="back" size={25} />
          </Pressable>
        </View>
        <View style={{ alignItems: "center", marginTop: 10 }}>
          <SharedLogin />
        </View>
        <View style={{ alignItems: "center", marginTop: 10 }}>
          <AppText variant="heading">{localization.REGISTER.title}</AppText>
          <AppText size={13} color="textInactive">
            {localization.REGISTER.description}
          </AppText>
        </View>

        <SharedInput
          autoFocus
          label={localization.NAME.label}
          placeholder={localization.NAME.placeholder}
          ref={refName}
          returnKeyType="next"
          onSubmitEditing={() => emailInputRef.current.focus()}
          style={styles.input}
          value={name}
          onChangeText={setName}
        />
        <View
          onLayout={(e) => {
            emailLayoutY.current = e.nativeEvent.layout.y;
          }}
        >
          <SharedInput
            label={localization.EMAIL.label}
            placeholder={localization.EMAIL.placeholder}
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
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
          <SharedPhoneNumber
            label={localization.PHONENUMBER.label}
            placeholder="6x xxx xxxx"
            placeholderTextColor={colors.textInactive}
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
          <SharedPassword
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
          <SharedConfirmPassword
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

        <SharedButton
          disabled={
            emailError.length > 0 ||
            passwordError.length > 0 ||
            errorPhoneNumber.length > 0
          }
          loading={loading}
          onPress={handleRegister}
          text={localization.REGISTER.submitBtn}
        />

        <SharedRedirect
          onPress={navigateToLogin}
          question={localization.REGISTER.question}
          text={localization.REGISTER.CTA}
        />
        {isMessage && (
          <SharedMessage
            isOpen={isMessage}
            onClose={!error ? confirmHandler : confirmHandler2}
            onConfirm={!error ? confirmHandler : confirmHandler2}
            icon={
              <Icon name={error ? "close" : "check"} size={64} color="text" />
            }
            title={error || success}
            buttonText={localization.OK.label}
          />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 25,
    backgroundColor: colors.background,
  },

  logo: {
    width: 120,
    height: 100,
    resizeMode: "contain",
    backgroundColor: colors.background,
  },

  input: {
    backgroundColor: colors.white,
    color: colors.textOnLight,
    padding: 15,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 2,
    borderColor: colors.white,
    fontFamily: fonts.regular,

  },
  passwordInputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 8,
    borderWidth: 2,

    borderColor: colors.divider,
  },
  passwordInput: {
    backgroundColor: colors.white,
    color:  colors.text,
    padding: 15,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 2,
    borderColor: colors.white,
    width: "80%",
  },
});

export default Register;
