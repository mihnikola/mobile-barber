import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
} from "react-native";
import { Platform } from "react-native";
import SharedButton from "@/shared-components/SharedButton";
import useEmailOtpCode from "../changePass/hooks/useEmailOtpCode";
import { SharedMessage } from "@/shared-components/SharedMessage";
import { FontAwesome } from "@expo/vector-icons";
import SharedInput from "@/shared-components/SharedInput";
import useEmail from "./hooks/useEmail";
// import SharedImageForgotPass from "@/shared-components/SharedImageForgotPass";
import { useLocalization } from "@/context/LocalizationContext";
import WrapperAuth from "../wrapperAuth/WrapperAuth";
import SharedBackButton from "@/shared-components/SharedBackButton";
import { router } from "expo-router";

const ForgotPassword = () => {
  const { email, emailError, handleEmailChange } = useEmail();

  const { localization } = useLocalization();

  const {
    checkEmailValidation,
    error,
    setError,
    isLoading,
    isMessage,
    setIsMessage,
  } = useEmailOtpCode();
  const navHandler = () => {
    checkEmailValidation(email);
  };

  const confirmHandler2 = () => {
    setIsMessage(false);
    setError(null);
  };
  return (
    <WrapperAuth>
      <SharedBackButton
        onPress={router.back}
        absolutePosition={false}
        styleBtn={{ marginBottom: 30, marginHorizontal: 5 }}
      />

      <View style={{ flex: 1 }}>
        <View style={{ marginHorizontal: 10 }}>
          <Text style={styles.mainTitle}>
            {localization.FORGOT_PASSWORD.title}
          </Text>

          <Text style={styles.subtitle}>
            {localization.FORGOT_PASSWORD.subtitle}
          </Text>
        </View>
        <View style={{ marginTop: 20, marginHorizontal: 10 }}>
          <SharedInput
            label={localization.EMAIL.label}
            value={email}
            onChangeText={handleEmailChange}
            placeholder={localization.EMAIL.placeholder}
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
            error={emailError}
          />
        </View>
      </View>

      <View>
        <SharedButton
          disabled={emailError.length > 0 || isLoading}
          onPress={navHandler}
          loading={isLoading}
          text={localization.FORGOT_PASSWORD.submitBtn}
        />
      </View>

      {error && (
        <SharedMessage
          isOpen={isMessage || error}
          onClose={error && confirmHandler2}
          onConfirm={error && confirmHandler2}
          icon={<FontAwesome name="close" size={64} color="white" />}
          title={error}
          buttonText={localization.OK.label}
        />
      )}
    </WrapperAuth>
  );
};
const styles = StyleSheet.create({
  mainTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#000",
    marginHorizontal: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    lineHeight: 22,
    marginHorizontal: 10,
  },
  radiobtn: {
    flex: 2,
    flexDirection: "column",
    gap: 25,
  },
  imageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },

  image: {
    resizeMode: "contain",
  },
  input: {
    backgroundColor: "white",
    color: "black",
    padding: 15,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 2,
    borderColor: "white",
    paddingVertical: 15,
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
export default ForgotPassword;
