import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  Platform,
} from "react-native";
import { ScrollView } from "react-native";
import { Image } from "react-native";
import SharedButton from "@/shared-components/SharedButton";
import usePassword from "./hooks/usePassword";
import useConfirmPassword from "./hooks/useConfirmPassword";
import useChangePasswordHandler from "./hooks/useChangePasswordHandler";
import { FontAwesome } from "@expo/vector-icons";
import { SharedMessage } from "@/shared-components/SharedMessage";
import { router, useLocalSearchParams } from "expo-router";
import SharedConfirmPassword from "@/shared-components/SharedConfirmPassword";
import SharedPassword from "@/shared-components/SharedPassword";

const changePass = () => {
  const params = useLocalSearchParams();
  const { data } = params;

  const {
    password,
    passwordError,
    handlePasswordChange,
  } = usePassword();
  const {
    confirmPassword,
    handleConfirmPasswordChange,
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



  const confirmHandler = () => {
    setIsMessage(false);
    router.dismissAll();
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
    justifyContent: "space-between",
    flexWrap: "wrap",
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
    // width: 290,
    // height: 290,
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
