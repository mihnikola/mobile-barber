import {
  View,
  StyleSheet,
} from "react-native";
import SharedButton from "@/shared-components/SharedButton";
import { useConfirmPasswordField, usePasswordField } from "@/lib/hooks/useFormFields";
import useChangePasswordHandler from "./hooks/useChangePasswordHandler";
import { SharedMessage } from "@/shared-components/SharedMessage";
import { router, useLocalSearchParams } from "expo-router";
import SharedConfirmPassword from "@/shared-components/SharedConfirmPassword";
import SharedPassword from "@/shared-components/SharedPassword";
import { useLocalization } from "@/context/LocalizationContext";
import { removeOtpParamsStorage } from "@/helpers/verificationOtpParams";
import { colors } from "@/theme";
import { AppText, Icon, Pressable, Screen } from "@/components/ui";

const ChangePass = () => {
  const { data } = useLocalSearchParams();

  const { localization } = useLocalization();
  const { password, passwordError, handlePasswordChange, passwordInputRef } =
    usePasswordField();
  const {
    confirmPassword,
    handleConfirmPasswordChange,
    passwordConfirmInputRef,
  } = useConfirmPasswordField(password);

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
    router.back();
  };
  const confirmHandler2 = () => {
    setIsMessage(false);
  };

  return (
    <Screen mode="form">
      <Pressable
        hitSlop={20}
        onPress={router.back}
        style={{ marginVertical: 15 }}
      >
        <Icon name="back" size={25} />
      </Pressable>
      <View style={{ flex: 1 }}>
        <View>
          <AppText variant="heading">
            {localization.CHANGE_PASS.mainTitle}
          </AppText>
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
            <Icon name={error ? "close" : "check"} size={64} color="text" />
          }
          title={error || message}
          buttonText={localization.OK.label}
        />
      )}
    </Screen>
  );
};
const styles = StyleSheet.create({
  passContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: colors.textInactive,
    borderRadius: 10,
    alignItems: "center",
    paddingHorizontal: 10,
    backgroundColor: colors.background,
  },
  passwordInputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: colors.textInactive,
  },
  passwordInput: {
    backgroundColor: colors.white,
    color: colors.text,
    padding: 15,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 2,
    borderColor: colors.white,
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
    backgroundColor: colors.white,
    color: colors.text,
    padding: 15,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 2,
    borderColor: colors.white,
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
    backgroundColor: colors.background,
  },
  image: {
    resizeMode: "cover",
  },
  subtitle: {
    fontSize: 13,
   color: colors.textInactive,
  },
});
export default ChangePass;
