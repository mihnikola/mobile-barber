import { View } from "react-native";
import useEmailOtpCode from "../changePass/hooks/useEmailOtpCode";
import { useEmailField } from "@/lib/hooks/useFormFields";
import { useLocalization } from "@/context/LocalizationContext";
import { router } from "expo-router";
import { routes } from "@/lib/navigation/routes";
import { makeStyles } from "@/theme";
import { AppText, Button, Icon, MessageDialog, Pressable, Screen, TextField } from "@/components/ui";

const ForgotPassword = () => {
  const styles = useStyles();
  const { email, emailError, handleEmailChange } = useEmailField();

  const { localization } = useLocalization();

  const {
    checkEmailValidation,
    error,
    setError,
    isLoading,
    isMessage,
    setIsMessage,
  } = useEmailOtpCode();
  const navHandler = async () => {
    if (await checkEmailValidation(email)) router.push(routes.auth.otpCode);
  };

  const confirmHandler2 = () => {
    setIsMessage(false);
    setError(null);
  };
  return (
    <Screen mode="form">
      <Pressable hitSlop={20} onPress={router.back} style={styles.back}>
        <Icon name="back" />
      </Pressable>

      <View style={styles.body}>
        <AppText variant="displayLg">{localization.FORGOT_PASSWORD.title}</AppText>
        <AppText variant="body" color="inkMuted" style={styles.subtitle}>
          {localization.FORGOT_PASSWORD.subtitle}
        </AppText>
        <TextField
          label={localization.EMAIL.label}
          value={email}
          onChangeText={handleEmailChange}
          placeholder={localization.EMAIL.placeholder}
          keyboardType="email-address"
          autoCapitalize="none"
          error={emailError}
        />
      </View>

      <Button
        style={styles.submit}
        disabled={emailError.length > 0 && email.length > 0}
        onPress={navHandler}
        loading={isLoading}
        title={localization.FORGOT_PASSWORD.submitBtn}
      />

      {error && (
        <MessageDialog
          isOpen={isMessage || error}
          onClose={error && confirmHandler2}
          onConfirm={error && confirmHandler2}
          icon={<Icon name="close" size={32} />}
          title={error}
          buttonText={localization.OK.label}
        />
      )}
    </Screen>
  );
};

const useStyles = makeStyles(() => ({
  back: { alignSelf: "flex-start", padding: 4, marginTop: 16, marginBottom: 16 },
  body: { flex: 1 },
  subtitle: { marginTop: 8, marginBottom: 8 },
  submit: { marginTop: 24, marginBottom: 32 },
}));

export default ForgotPassword;
