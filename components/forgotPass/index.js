import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  StatusBar,
} from "react-native";
import { Platform } from "react-native";
import SharedButton from "@/shared-components/SharedButton";
import useEmailOtpCode from "../changePass/hooks/useEmailOtpCode";
import { SharedMessage } from "@/shared-components/SharedMessage";
import { FontAwesome } from "@expo/vector-icons";
import SharedInput from "@/shared-components/SharedInput";
import useEmail from "./hooks/useEmail";
import SharedImageForgotPass from "@/shared-components/SharedImageForgotPass";
import { useLocalization } from "@/context/LocalizationContext";

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
    <ScrollView style={styles.container}>
      <StatusBar backgroundColor="black" barStyle="dark-content" />
      <View>
        <Text style={styles.mainTitle}>
          {localization.FORGOT_PASSWORD.title}
        </Text>
      </View>
      <View>
        <Text style={styles.subtitle}>
          {localization.FORGOT_PASSWORD.subtitle}
        </Text>
      </View>
      {/* <SharedImageForgotPass /> */}

      <View style={styles.radiobtn}>
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
      <SharedButton
        disabled={emailError.length > 0 || isLoading}
        onPress={navHandler}
        loading={isLoading}
        text={localization.FORGOT_PASSWORD.submitBtn}
      />
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
    </ScrollView>
  );
};
const styles = StyleSheet.create({
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
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "black",
    paddingTop: Platform.OS === "android" ? 20 : 0,
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
  },
  mainTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 13,
    color: "#ccc",
  },
});
export default ForgotPassword;
