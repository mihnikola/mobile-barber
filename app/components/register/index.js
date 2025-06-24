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
import { useEffect, useState } from "react";

import useEmail from "../register/hooks/useEmail";
import usePassword from "../register/hooks/usePassword";
import useConfirmPassword from "../register/hooks/useConfirmPassword";
import useRegisterForm from "../register/hooks/useRegisterForm";
import { useNavigation } from "@react-navigation/native";
import SharedInput from "@/shared-components/SharedInput";
import SharedButton from "@/shared-components/SharedButton";
import SharedRedirect from "@/shared-components/SharedRedirect";
import usePhoneNumber from "./hooks/usePhoneNumber";

export const Register = () => {
  const navigation = useNavigation();
  const [userName, setUserName] = useState("");
  const {
    loading,
    error,
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
      confirmPassword
    });
  };

  const navigateToLogin = () => {
    navigation.navigate("components/login/index"); // Use replace to clear the auth stack
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
    backgroundColor: "#0A0B0E", // Dark background color
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
