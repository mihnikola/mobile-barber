import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  Platform,
  findNodeHandle,
  TouchableOpacity,
} from "react-native";
import { ScrollView } from "react-native";
import SharedButton from "@/shared-components/SharedButton";
import usePassword from "./hooks/usePassword";
import useConfirmPassword from "./hooks/useConfirmPassword";
import useChangePasswordHandler from "./hooks/useChangePasswordHandler";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { SharedMessage } from "@/shared-components/SharedMessage";
import { router, useLocalSearchParams } from "expo-router";
import SharedConfirmPassword from "@/shared-components/SharedConfirmPassword";
import SharedPassword from "@/shared-components/SharedPassword";
import SharedImageForgotPass from "@/shared-components/SharedImageForgotPass";
import { useLocalization } from "@/context/LocalizationContext";
import { removeOtpParamsStorage } from "@/helpers/verificationOtpParams";
import WrapperAuth from "../wrapperAuth/WrapperAuth";
import SharedBackButton from "@/shared-components/SharedBackButton";

const changePass = () => {
  const { data } = useLocalSearchParams();

  const { localization } = useLocalization();
  const { password, passwordError, handlePasswordChange, passwordInputRef } =
    usePassword();
  const {
    confirmPassword,
    handleConfirmPasswordChange,
    passwordConfirmInputRef,
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
    if (passwordError?.length === 0)
      handlePatchUser(data, password, confirmPassword);
  };

  const confirmHandler = async () => {
    setIsMessage(false);
    await removeOtpParamsStorage();
    // router.dismissAll();
    // router.replace("/(z_auth)/login");
    router.back();
  };
  const confirmHandler2 = () => {
    setIsMessage(false);
  };

  return (
    <WrapperAuth>
      <TouchableOpacity
        hitSlop={20}
        onPress={router.back}
        style={{ marginVertical: 15 }}
      >
        <MaterialIcons name="arrow-back" size={25} color="white" />
      </TouchableOpacity>
      <View style={{ flex: 1 }}>
        <View>
          <Text style={styles.mainTitle}>
            {localization.CHANGE_PASS.mainTitle}
          </Text>
        </View>

        <View style={styles.textinputContainer}>
          <SharedPassword
            label={localization.PASSWORD.label}
            value={password}
            onChangeText={handlePasswordChange}
            placeholder={localization.PASSWORD.placeholder}
            error={passwordError}
            returnKeyType="next"
            onSubmitEditing={() => {
              const node = findNodeHandle(passwordInputRef.current);
              if (node) {
                scrollRef.current?.scrollResponderScrollNativeHandleToKeyboard(
                  node,
                  80,
                  true,
                );
              }
              passwordConfirmInputRef.current?.focus();
            }}
          />
          <SharedConfirmPassword
            label={localization.CONFIRM_PASSWORD.label}
            value={confirmPassword}
            ref={passwordConfirmInputRef}
            onChangeText={handleConfirmPasswordChange}
            placeholder={localization.CONFIRM_PASSWORD.placeholder}
          />
        </View>
      </View>
      <View style={styles.btnFooter}>
        <SharedButton
          loading={isLoading}
          text={localization.SUBMIT.label}
          disabled={password.length > 0 && passwordError.length > 0}
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
              name={error ? "close" : "check-circle-o"}
              size={64}
              color="white"
            />
          }
          title={error || message}
          buttonText={localization.OK.label}
        />
      )}
    </WrapperAuth>
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
  },
  textinputContainer: {
    display: "flex",
    gap: 10,
  },
  btnFooter: {
    marginBottom: 25,
  },
  icon: {
    paddingHorizontal: 8,
  },
  textInput: {
    backgroundColor: "white",
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
  },
  image: {
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
});
export default changePass;
