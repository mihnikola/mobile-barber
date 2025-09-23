import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  Platform,
} from "react-native";
import React, { useState } from "react";
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
import SharedLogo from "@/shared-components/SharedLogo";
import { useLocalization } from "@/context/LocalizationContext";
const Register = () => {
  const [userName, setUserName] = useState("");
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
  const { email, emailError, handleEmailChange } = useEmail();
  const { phoneNumber, handlePhoneNumberChange, errorPhoneNumber } =
    usePhoneNumber();
  const { password, passwordError, handlePasswordChange } = usePassword();
  const { confirmPassword, handleConfirmPasswordChange } =
    useConfirmPassword(password);

  const handleRegister = () => {
    handleRegistration({
      name: userName,
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
  const confirmHandler = () => {
    setIsMessage(false);
    router.replace({
      pathname: "/(tabs)/(04_settings)/otpCode",
      params: { data: email },
    });
  };

  const confirmHandler2 = () => {
    setIsMessage(false);
  };

  return (
    <ScrollView style={styles.safeArea}>
      <StatusBar backgroundColor="black" barStyle="dark-content" />
      <View style={styles.container}>
        <SharedLogo image={image} />

        <Text style={styles.mainTitle}>{localization.REGISTER.title}</Text>
        <Text style={styles.subtitle}>{localization.REGISTER.description}</Text>

        <SharedInput
          label={localization.NAME.label}
          placeholder={localization.NAME.placeholder}
          value={userName}
          style={styles.input}
          onChangeText={setUserName}
        />
        <SharedInput
          label={localization.EMAIL.label}
          placeholder={localization.EMAIL.placeholder}
          keyboardType="email-address"
          value={email}
          autoCapitalize="none"
          onChangeText={handleEmailChange}
          style={styles.input}
          error={emailError}
        />

        <SharedPhoneNumber
          label={localization.PHONENUMBER.label}
          placeholder="6x xxx xxxx"
          placeholderTextColor="#888"
          keyboardType="phone-pad"
          dataDetectorTypes="phoneNumber"
          value={phoneNumber}
          onChangeText={handlePhoneNumberChange}
          autoComplete="tel"
          error={errorPhoneNumber}
        />

        <SharedPassword
          label={localization.PASSWORD.label}
          value={password}
          onChangeText={handlePasswordChange}
          placeholder={localization.PASSWORD.placeholder}
          error={passwordError}
        />
        <SharedConfirmPassword
          label={localization.CONFIRM_PASSWORD.label}
          value={confirmPassword}
          onChangeText={handleConfirmPasswordChange}
          placeholder={localization.CONFIRM_PASSWORD.placeholder}
        />

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

export default Register;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: "black",
  },
  container: {
    flex: 1,
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
