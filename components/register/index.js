import {
  View,
  Text,
  StyleSheet,
  Image,
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
const Register = () => {
  const [userName, setUserName] = useState("");
  const { image } = useLocalSearchParams();
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
      pathname: "/(tabs)/(04_settings)/otpCodeRegister",
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

        <Text style={styles.mainTitle}>Register your account</Text>
        <Text style={styles.subtitle}>Enter your information below</Text>

        <SharedInput
          label="Name"
          placeholder="Enter your name"
          value={userName}
          style={styles.input}
          onChangeText={setUserName}
        />
        <SharedInput
          label="Email Address"
          placeholder="Enter your email"
          keyboardType="email-address"
          value={email}
          autoCapitalize="none"
          onChangeText={handleEmailChange}
          style={styles.input}
          error={emailError}
        />

        <SharedPhoneNumber
          label="Phone Number"
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
          label="Password"
          value={password}
          onChangeText={handlePasswordChange}
          placeholder="Enter your password"
          error={passwordError}
        />
        <SharedConfirmPassword
          label="Re-Enter Password"
          value={confirmPassword}
          onChangeText={handleConfirmPasswordChange}
          placeholder="Confirm your password"
        />

        <SharedButton
          disabled={
            emailError.length > 0 ||
            passwordError.length > 0 ||
            errorPhoneNumber.length > 0
          }
          loading={loading}
          onPress={handleRegister}
          text="Register"
        />

        <SharedRedirect
          onPress={navigateToLogin}
          question="Already have an account?"
          text="Login"
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
            buttonText="Ok"
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
