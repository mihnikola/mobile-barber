import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  ToastAndroid,
} from "react-native";
import React, { useState } from "react";
import { IconSymbol } from "@/components/ui/IconSymbol";

import useEmail from "../register/hooks/useEmail";
import usePassword from "../register/hooks/usePassword";
import useConfirmPassword from "../register/hooks/useConfirmPassword";
import useRegisterForm from "../register/hooks/useRegisterForm";
import { LABEL_VALUES } from "@/constants";

const Register = ({ change }) => {
  const [userName, setUserName] = useState("");
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

  const handleRegister = () => {
    if (emailError || passwordError || passwordConfirmError) {
      ToastAndroid.show("Please fix the validation errors", ToastAndroid.SHORT);
      return;
    }

    handleRegistration({ name: userName, email, password });
  };
  return (
    <ScrollView style={styles.form}>
      <Image
        source={require("@/assets/images/logoImage.png")}
        style={styles.logoImageImg}
      />
      <View>
        <Text style={styles.title}>Sign up</Text>
      </View>
      <View style={styles.formContent}>
        <TextInput
          placeholder="Unesi ime i prezime "
          value={userName}
          onChangeText={setUserName}
          style={styles.textInput}
        />
        <TextInput
          placeholder="Unesi email "
          value={email}
          onChangeText={handleEmailChange}
          style={styles.textInput}
        />
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            value={password}
            onChangeText={handlePasswordChange}
            placeholder="Enter your password"
            secureTextEntry={!isPasswordVisible}
          />
          <TouchableOpacity
            onPress={togglePasswordVisibility}
            style={styles.iconContainer}
          >
            <IconSymbol
              name={isPasswordVisible ? "visible" : "not.visible"}
              size={25}
              color="gray"
            />
          </TouchableOpacity>
          {passwordError ? (
            <Text style={styles.errorText}>{passwordError}</Text>
          ) : null}
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            value={confirmPassword}
            onChangeText={handleConfirmPasswordChange}
            placeholder="Confirm your password"
            secureTextEntry={!isPasswordConfirmVisible}
          />
          <TouchableOpacity
            onPress={togglePasswordConfirmVisibility}
            style={styles.iconContainer}
          >
            <IconSymbol
              name={isPasswordConfirmVisible ? "visible" : "not.visible"}
              size={25}
              color="gray"
            />
          </TouchableOpacity>
          {passwordConfirmError ? (
            <Text style={styles.errorText}>{passwordConfirmError}</Text>
          ) : null}
        </View>

        <TouchableOpacity onPress={handleRegister} disabled={loading}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>
              {loading ? "Submitting..." : LABEL_VALUES.REGISTER}
            </Text>
          </View>
        </TouchableOpacity>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
      </View>

      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            You have account? Click{" "}
            <TouchableOpacity onPress={change} style={{ marginTop: 7 }}>
              <Text style={styles.linkText}>here.</Text>
            </TouchableOpacity>
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default Register;

const styles = StyleSheet.create({
  errorText: {
    color: "green",
    fontSize: 12,
    marginBottom: 10,
  },
  formContent: {
    display: "flex",
    gap: 5,
  },
  form: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  input: {
    flex: 1,
    height: 40,
    paddingLeft: 10,
    fontSize: 16,
    color: "black",
  },
  inputContainer: {
    position: "relative",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  iconContainer: {
    position: "absolute",
    right: 10, // Aligns the icon to the right of the TextInput
    top: 10, // Centers the icon vertically inside the input
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    padding: 10,
    textAlign: "center",
  },
  button: {
    margin: 10,
    backgroundColor: "gray",
    borderColor: "#000",
    borderWidth: 1,
    textAlign: "center",
  },
  title: {
    fontSize: 30,
    color: "#fff",
    // marginBottom: 20,
    // marginTop: 5,
    marginVertical: 10,
    textAlign: "center",
  },
  logoImageImg: {
    height: 220,
    width: 250,
    margin: "auto",
    marginTop: 40,
  },
  textInput: {
    margin: "auto",
    width: "100%",
    padding: 10,
    borderBottomWidth: 1,
    backgroundColor: "white",
    color: "black",
  },
  container: {
    marginTop: 10,
    flexDirection: "column", // This is similar to flex-col in Tailwind
    justifyContent: "space-between",
    gap: 10, // React Native doesn't have a gap utility like Tailwind, but you can achieve spacing using margin or padding
  },
  textContainer: {
    alignItems: "center", // For centering the text on smaller screens
    flexDirection: "row", // Flex row for larger screens (equivalent to md:flex-row in Tailwind)
    justifyContent: "space-between",
    alignSelf: "center",
  },
  text: {
    color: "#6B7280", // Equivalent to text-neutral-500
    textAlign: "center", // Default alignment for smaller screens
  },
  linkText: {
    textAlign: "center", // Default alignment for smaller screens
    color: "white",
    textDecorationLine: "underline",
    cursor: "pointer", // While this doesn't do exactly the same thing as cursor:pointer in web, it works for touch events in React Native
  },
});
