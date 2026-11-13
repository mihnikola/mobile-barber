import {
  View,
} from "react-native";
import { useConfirmPasswordField, usePasswordField } from "@/lib/hooks/useFormFields";
import useChangePasswordHandler from "./hooks/useChangePasswordHandler";
import { router, useLocalSearchParams } from "expo-router";
import { useLocalization } from "@/context/LocalizationContext";
import { removeOtpParamsStorage } from "@/helpers/verificationOtpParams";
import { makeStyles } from "@/theme";
import { AppText, BackButton, Button, Icon, MessageDialog, PasswordField, Screen } from "@/components/ui";

const ChangePass = () => {
  const styles = useStyles();
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
      <BackButton style={styles.back} />
      <View style={styles.body}>
        <AppText variant="displayLg">{localization.CHANGE_PASS.mainTitle}</AppText>
        <PasswordField
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
        <PasswordField
          label={localization.CONFIRM_PASSWORD.label}
          value={confirmPassword}
          ref={passwordConfirmInputRef}
          onChangeText={handleConfirmPasswordChange}
          placeholder={localization.CONFIRM_PASSWORD.placeholder}
        />
      </View>
      <Button
        style={styles.submit}
        loading={isLoading}
        title={localization.SUBMIT.label}
        disabled={password.length > 0 && passwordError.length > 0}
        onPress={submitChanges}
      />
      {isMessage && (
        <MessageDialog
          isOpen={isMessage}
          onClose={!error ? confirmHandler : confirmHandler2}
          onConfirm={!error ? confirmHandler : confirmHandler2}
          icon={<Icon name={error ? "close" : "check"} size={32} />}
          title={error || message}
          buttonText={localization.OK.label}
        />
      )}
    </Screen>
  );
};

const useStyles = makeStyles(() => ({
  back: { alignSelf: "flex-start", marginTop: 16, marginBottom: 16 },
  body: { flex: 1 },
  submit: { marginTop: 24, marginBottom: 32 },
}));

export default ChangePass;
