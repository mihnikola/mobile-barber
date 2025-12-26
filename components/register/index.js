import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  Platform,
  findNodeHandle,
} from "react-native";
import React, { useRef, useState } from "react";
import useEmail from "./hooks/useEmail";
import usePassword from "./hooks/usePassword";
import useConfirmPassword from "./hooks/useConfirmPassword";
import useRegisterForm from "./hooks/useRegisterForm";
import { SharedMessage } from "@/shared-components/SharedMessage";
import SharedInput from "@/shared-components/SharedInput";
import SharedButton from "@/shared-components/SharedButton";
import SharedRedirect from "@/shared-components/SharedRedirect";
import usePhoneNumber from "./hooks/usePhoneNumber";
import { FontAwesome } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import SharedPassword from "@/shared-components/SharedPassword";
import SharedConfirmPassword from "@/shared-components/SharedConfirmPassword";
import SharedPhoneNumber from "@/shared-components/SharedPhoneNumber";
import { useLocalization } from "@/context/LocalizationContext";
import SharedLogin from "@/shared-components/SharedLogin";
import { saveOtpParamsStorage } from "@/helpers/verificationOtpParams";
import withKeyboardAvoid from "../wrapper/WrapperKeyboard";
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
  // const { emailInputRef, emailError, handleEmailChange } = useEmail();
  const { email, emailError, handleEmailChange, emailInputRef } = useEmail();

  const { phoneNumber, handlePhoneNumberChange, errorPhoneNumber, phoneNumberInputRef } =
    usePhoneNumber();
  const { password, passwordError, handlePasswordChange, passwordInputRef } = usePassword();
  const { confirmPassword, handleConfirmPasswordChange, confirmPasswordInputRef } =
    useConfirmPassword(password);

  const handleRegister = () => {
    // const data = {
    //   name,
    //   email,
    //   password,
    //   phoneNumber,
    //   emailError,
    //   passwordError,
    //   confirmPassword,
    // };

    // console.log("data", data)


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
    router.push("/(z_auth)/otpCode");
  };

  const confirmHandler2 = () => {
    setIsMessage(false);
  };

  return (

    <ScrollView ref={scrollRef} keyboardDismissMode="interactive"
      style={styles.safeArea} contentContainerStyle={{ flexGrow: 1, padding: 20, paddingBottom: 20 }} keyboardShouldPersistTaps="always">
      <View style={styles.container}>
        {/* <View style={{ flex: 1 }}> */}
        <SharedLogin image={image} />

        <Text style={styles.mainTitle}>{localization.REGISTER.title}</Text>
        <Text style={styles.subtitle}>{localization.REGISTER.description}</Text>

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
            placeholderTextColor="#888"
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
                  true
                );
              }
              passwordInputRef.current?.focus();
            }}
          />
        </View>
        <View onLayout={(e) => (passwordLayoutY.current = e.nativeEvent.layout.y)}>

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
                  true
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
              <FontAwesome
                name={error ? "close" : "check-circle-o"}
                size={64}
                color="white"
              />
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
    paddingVertical: 10,
    backgroundColor: "black",
  },
  container: {
    // flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "black",
    paddingTop: Platform.OS === "android" ? 20 : 0,
  },
  logo: {
    width: 120,
    height: 100,
    resizeMode: "contain",
    backgroundColor: "black",
  },
  mainTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },
  subtitle: {
    fontSize: 13,
    color: "#ccc",
  },

  input: {
    backgroundColor: "white",
    color: "black",
    padding: 15,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 2,
    borderColor: "white",
  },
  passwordInputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 2,

    borderColor: "#333",
  },
  passwordInput: {
    backgroundColor: "white",
    color: "black",
    padding: 15,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 2,
    borderColor: "white",
    width: "80%",
  },
});

export default withKeyboardAvoid(Register);
