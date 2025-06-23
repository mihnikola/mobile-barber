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
  Dimensions,
} from "react-native";
import { useEffect, useState } from "react";

import useEmail from "../register/hooks/useEmail";
import usePassword from "../register/hooks/usePassword";
import useConfirmPassword from "../register/hooks/useConfirmPassword";
import useRegisterForm from "../register/hooks/useRegisterForm";
import { useRouter } from "expo-router";
import { useNavigation } from "@react-navigation/native";
const { width } = Dimensions.get("window");

export const Register = () => {
  const navigation = useNavigation();
  const [userName, setUserName] = useState("");
  const router = useRouter();
  const {
    loading,
    error,
    handleSubmit: handleRegistration,
  } = useRegisterForm();
  const { email, emailError, handleEmailChange } = useEmail();

  const {
    password,
    passwordError,
    isPasswordVisible,
    handlePasswordChange,
    togglePasswordVisibility,
  } = usePassword();
  const {
    confirmPassword,
    passwordConfirmError,
    isPasswordConfirmVisible,
    handleConfirmPasswordChange,
    togglePasswordConfirmVisibility,
  } = useConfirmPassword(password); // Use the useConfirmPassword hook, passing the 'password' state

  const showToast = (text) => {
    ToastAndroid.show(text, ToastAndroid.SHORT);
  };
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
    if (!userName || !confirmPassword || !password || !email) {
      showToast("Please fill out all fields.");
      return;
    }

    if (confirmPassword !== password) {
      showToast("Your passwords does not match");
      return;
    }
    if (emailError) {
      showToast(emailError);
      return;
    }
    if (passwordError) {
      return;
    }
    handleRegistration({ name: userName, email, password });
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
        <Text style={styles.inputLabel}>Name</Text>

        <TextInput
          placeholder="Enter your name"
          value={userName}
          onChangeText={setUserName}
          style={styles.input}
        />

        <Text style={styles.inputLabel}>Email Address</Text>
        <TextInput
          placeholder="Enter your email"
          keyboardType="email-address"
          value={email}
          autoCapitalize="none"
          onChangeText={handleEmailChange}
          style={styles.input}
        />
        <Text style={styles.inputLabel}>Password</Text>
        <View style={styles.passwordInputContainer}>
          <TextInput
            style={styles.passwordInput}
            value={password}
            onChangeText={handlePasswordChange}
            placeholder="Enter your password"
            secureTextEntry={!isPasswordVisible}
          />
          <TouchableOpacity
            style={styles.passwordToggle}
            onPress={togglePasswordVisibility}
          >
            <Text style={{ color: "#888" }}>
              {isPasswordVisible ? "Hide" : "Show"}
            </Text>
          </TouchableOpacity>
          
        </View>
         {password.length > 0 && passwordError ? (
            <Text style={styles.errorText}>{passwordError}</Text>
          ) : null}
        <Text style={styles.inputLabel}>Re-Enter Password</Text>

        <View style={styles.passwordInputContainer}>
          <TextInput
            style={styles.passwordInput}
            value={confirmPassword}
            onChangeText={handleConfirmPasswordChange}
            placeholder="Confirm your password"
            secureTextEntry={!isPasswordConfirmVisible}
          />
          <TouchableOpacity
            style={styles.passwordToggle}
            onPress={togglePasswordConfirmVisibility}
          >
            <Text style={{ color: "#888" }}>
              {isPasswordConfirmVisible ? "Hide" : "Show"}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.loginButton} disabled={loading} onPress={handleRegister}>
          <Text style={styles.loginButtonText}>{loading ? "Loading..." : "Register"}</Text>
        </TouchableOpacity>

        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>Already have an account? </Text>
          <TouchableOpacity onPress={navigateToLogin}>
            <Text style={styles.registerLink}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Register;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#0A0B0E", // Dark background color
  },
  iconStyle: {
    width: 30, // Set your desired width
    height: 30, // Set your desired height (maintain aspect ratio for best results)
    resizeMode: "cover", // or 'cover', 'stretch', etc. 'contain' is usually good for icons
  },
  errorText:{
    color: 'red'
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#0A0B0E", // Dark background color
    paddingTop: Platform.OS === "android" ? 40 : 0, // Add padding for Android status bar
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
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: "#ccc",
    marginBottom: 2,
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
    width: width / 2 - 30, // Approx half screen width minus padding
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#333",
  },
  googleButton: {
    backgroundColor: "#1C1C1E", // Darker background for Google
  },
  appleButton: {
    backgroundColor: "#1C1C1E", // Darker background for Apple
  },
  socialIcon: {
    marginRight: 10,
  },
  socialButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#333",
  },
  dividerText: {
    color: "#888",
    marginHorizontal: 10,
    fontSize: 14,
  },
  inputLabel: {
    color: "#ccc",
    fontSize: 14,
    marginBottom: 8,
    marginTop: 15,
  },
  input: {
    backgroundColor: "#1C1C1E", // Dark input background
    color: "#fff",
    padding: 15,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#333",
  },
  passwordInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1C1C1E",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#333",
  },
  passwordInput: {
    flex: 1,
    color: "#fff",
    padding: 15,
    fontSize: 16,
  },
  passwordToggle: {
    padding: 10,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 20,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#666",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  checkboxChecked: {
    backgroundColor: "#007AFF", // Blue color for checked state
    borderColor: "#007AFF",
  },
  checkmark: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  checkboxLabel: {
    color: "#ccc",
    fontSize: 14,
  },
  forgotPasswordText: {
    color: "#007AFF", // Blue color for link
    fontSize: 14,
    fontWeight: "600",
  },
  loginButton: {
    backgroundColor: "#2596be", // Blue login button
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 30,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "auto", // Pushes to the bottom
    marginBottom: 20,
  },
  registerText: {
    color: "#ccc",
    fontSize: 14,
  },
  registerLink: {
    color: "#2596be", // Blue color for link
    fontSize: 14,
    fontWeight: "600",
  },
});
