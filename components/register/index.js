import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  BackHandler,
  StatusBar,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
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
import { router } from "expo-router";
const Register = () => {
  const [userName, setUserName] = useState("");
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

  function handleBackButtonClick3() {
    router.push("/(tabs)/(04_settings)/login");

    return true;
  }
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick3);
    return () => {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackButtonClick3
      );
    };
  }, []);

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
    router.push("/(tabs)/(04_settings)/login");
  };
  const confirmHandler = () => {
    setIsMessage(false);
    router.push({
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
        <Image
          source={require("@/assets/images/adaptive-icon.png")}
          style={styles.logo}
        />

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

        <SharedInput
          label="Phone Number"
          placeholder="6x xxx xxxx"
          placeholderTextColor="#888"
          keyboardType="phone-pad"
          dataDetectorTypes="phoneNumber"
          value={phoneNumber}
          onChangeText={handlePhoneNumberChange}
          stylePassword={styles.phoneNumberInputContainer}
          style={styles.input}
          autoComplete="tel"
          error={errorPhoneNumber}
        />

        <SharedInput
          label="Password"
          value={password}
          onChangeText={handlePasswordChange}
          placeholder="Enter your password"
          style={styles.passwordInput}
          stylePassword={styles.passwordInputContainer}
          error={passwordError}
        />

        <SharedInput
          label="Re-Enter Password"
          value={confirmPassword}
          onChangeText={handleConfirmPasswordChange}
          placeholder="Confirm your password"
          style={styles.passwordInput}
          stylePassword={styles.passwordInputContainer}
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
                name={error ? "close" : "check-circle-o"} // The specific FontAwesome icon to use
                size={64} // Size of the icon
                color="white" // Corresponds to text-blue-500
              />
            }
            title={error || success} // Title of the modal
            buttonText="Ok" // Text for the action button
          />
        )}
      </View>
    </ScrollView>
  );
};

export default Register;

const styles = StyleSheet.create({
  phoneNumberInputContainer: {
    flexDirection: "row", // Arrange children horizontally
    alignItems: "center", // Vertically align items in the center
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#333", // Default border color
    paddingHorizontal: 10, // Padding inside the combined input area
  },
  phoneNumberInput: {
    backgroundColor: "white", // Dark input background
    color: "black",
    padding: 15,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 2,
    borderColor: "white",
  },

  safeArea: {
    flex: 1,
    paddingVertical: 20,
    backgroundColor: "black", // Dark background color
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "black",
    paddingTop: Platform.OS === "android" ? 20 : 0, // Add padding for Android status bar
  },
 logo: {
    width: 130, // Adjust size as needed
    height: 80, // Adjust size as needed
    resizeMode: "cover",
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
    backgroundColor: "white", // Dark input background
    color: "black",
    padding: 15,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 2,
    borderColor: "white",
  },
  passwordInputContainer: {
    flexDirection: "row",
    justifyContent:"space-between",
    flexWrap:"wrap",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 2,
    // maxWidth:"100%",
    borderColor: "#333",
  },
  passwordInput: {
   backgroundColor: "white", // Dark input background
    color: "black",
    padding: 15,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 2,
    borderColor: "white",
  },
});
