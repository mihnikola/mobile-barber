import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  ToastAndroid,
  BackHandler,
  StatusBar,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { IconSymbol } from "@/components/ui/IconSymbol";

import useEmail from "../register/hooks/useEmail";
import usePassword from "../register/hooks/usePassword";
import useConfirmPassword from "../register/hooks/useConfirmPassword";
import useRegisterForm from "../register/hooks/useRegisterForm";
import { SharedMessage } from "@/shared-components/SharedMessage";
import { useNavigation } from "@react-navigation/native";
import SharedInput from "@/shared-components/SharedInput";
import SharedButton from "@/shared-components/SharedButton";
import SharedRedirect from "@/shared-components/SharedRedirect";
import usePhoneNumber from "./hooks/usePhoneNumber";
import { FontAwesome } from "@expo/vector-icons";
const Register = () => {
  const navigation = useNavigation();
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
    navigation.goBack();
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
    navigation.navigate("components/login/index");
  };
  const confirmHandler = () => {
    setIsMessage(false);
    navigation.navigate("components/login/index");
  };
  return (
    <ScrollView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <Image
          source={require("../../../assets/images/logoFamilyImg.png")}
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
          style={styles.phoneNumberInput}
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
            onClose={confirmHandler}
            onConfirm={confirmHandler}
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
    height: 50,
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#333", // Default border color
    paddingHorizontal: 10, // Padding inside the combined input area
  },
  phoneNumberInput: {
    flex: 1, // Take up remaining space
    height: "100%", // Make TextInput fill the height of the container
    color: "black",
    fontSize: 16,
    // No border or background here, handled by inputContainer
    padding: 0, // Remove default TextInput padding
  },

  safeArea: {
    flex: 1,
    backgroundColor: "#0A0B0E", // Dark background color
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "black",
    paddingTop: Platform.OS === "android" ? 20 : 0, // Add padding for Android status bar
  },
  logo: {
    width: 200, // Adjust size as needed
    height: 80, // Adjust size as needed
    resizeMode: "cover",
    alignSelf: "flex-start", // Aligns to the left as in the image
    marginLeft: -50,
    marginBottom: 20,
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
    borderColor: "#333",
  },
  passwordInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#333",
  },
  passwordInput: {
    flex: 1,
    color: "black",
    padding: 15,
    fontSize: 16,
  },
});
