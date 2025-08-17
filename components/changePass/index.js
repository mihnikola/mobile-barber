import {
  View,
  Text,
  TextInput,
  StatusBar,
  StyleSheet,
  Platform,
  TouchableOpacity,
  BackHandler,
} from "react-native";
import { ScrollView } from "react-native";
import { Image } from "react-native";
import SharedButton from "@/shared-components/SharedButton";
import usePassword from "./hooks/usePassword";
import useConfirmPassword from "./hooks/useConfirmPassword";
import useChangePasswordHandler from "./hooks/useChangePasswordHandler";
import { useEffect } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { SharedMessage } from "@/shared-components/SharedMessage";
import { router, useLocalSearchParams } from "expo-router";
import SharedInput from "@/shared-components/SharedInput";

const changePass = () => {
  const params = useLocalSearchParams();
  const { data } = params;

  const {
    password,
    passwordError,
    handlePasswordChange,
    isPasswordVisible,
    setIsPasswordVisible,
  } = usePassword();
  const {
    confirmPassword,
    handleConfirmPasswordChange,
    isPasswordConfirmVisible,
    setIsPasswordConfirmVisible,
  } = useConfirmPassword(password);

  const {
    handlePatchUser,
    message,
    isMessage,
    setIsMessage,
    error,
    isLoading,
  } = useChangePasswordHandler();
  const submitChanges = () => {
    handlePatchUser(data, password, confirmPassword);
  };

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

  const confirmHandler = () => {
    setIsMessage(false);
    router.push("/(tabs)/(04_settings)/login");
  };
  const confirmHandler2 = () => {
    setIsMessage(false);
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar backgroundColor="black" barStyle="dark-content" />
      <View>
        <Text style={styles.mainTitle}>Enter New Password</Text>
      </View>

      <View style={styles.textinputContainer}>
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
      </View>

      <View style={styles.imageContainer}>
        <Image
          source={require("@/assets/images/fgtPass.png")}
          style={styles.image}
        />
      </View>

      <View style={styles.btnFooter}>
        <SharedButton
          text={isLoading ? "Submitting..." : "Submit"}
          disabled={isLoading || passwordError.length > 0}
          onPress={submitChanges}
        />
      </View>
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
          title={error || message} // Title of the modal
          buttonText="Ok" // Text for the action button
        />
      )}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  passContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    alignItems: "center",
    paddingHorizontal: 10,
    backgroundColor: "#fff",
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
  textinputContainer: {
    display: "flex",
    gap: 10,
  },
  btnFooter: {
    marginVertical: 10,
  },
  icon: {
    paddingHorizontal: 8,
  },
  textInput: {
    backgroundColor: "white", // Dark input background
    color: "black",
    padding: 15,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 2,
    borderColor: "white",
  },
  imageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },

  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "black",
    paddingTop: Platform.OS === "android" ? 20 : 0,
  },
  image: {
    width: 290,
    height: 290,
    resizeMode: "cover",
  },
  mainTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginVertical: 20,
  },
  subtitle: {
    fontSize: 13,
    color: "#ccc",
  },
});
export default changePass;
