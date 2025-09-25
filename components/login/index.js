import {
  Dimensions,
  Image,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import usePassword from "./hooks/usePassword";
import useEmail from "./hooks/useEmail";
import SharedInput from "@/shared-components/SharedInput";
import SharedButton from "@/shared-components/SharedButton";
import SharedRedirect from "@/shared-components/SharedRedirect";
import { FontAwesome } from "@expo/vector-icons";
import { SharedMessage } from "@/shared-components/SharedMessage";
import { router, useLocalSearchParams } from "expo-router";
import SharedPassword from "@/shared-components/SharedPassword";
const { width } = Dimensions.get("window");
// import { GoogleSigninButton } from "@react-native-google-signin/google-signin";
import { useAuth } from "@/context/AuthContext";
import { useLocalization } from "@/context/LocalizationContext";
import SharedLogin from "@/shared-components/SharedLogin";
import { useCompany } from "@/context/CompanyContext";

const LoginScreen = () => {
  const { data } = useLocalSearchParams();

  const { email, handleEmailChange } = useEmail();
  const { password, handlePasswordChange } = usePassword();

  const { localization } = useLocalization();
  const {
    isLoading,
    setIsMessage,
    isMessage,
    error,
    login,
    success,
    status,
    verificationOTPCode,
    message,
    // isGoogleLoading,
    // signIn,
  } = useAuth();

  const { company } = useCompany();

  const handleLogin = async () => {
    login(email, password);
  };
  const navigateToRegister = () => {
    router.push({
      pathname: "(tabs)/(04_settings)/register",
      params: { image: company?.media?.logo },
    });
  };

  const cancelHandler = async () => {
    setIsMessage(false);
  };
  const confirmHandler = async () => {
    if (status === 606) {
      verificationOTPCode();
    } else {
      setIsMessage(false);
      redirectValidation();
    }
  };

  const redirectValidation = () => {
    if (data === "calendar") {
      router.push({
        pathname: "/(tabs)/(02_barbers)/calendar",
        params: { reevaluted: true },
      });
    } else if (data === "appointments") {
      router.push({
        pathname: "/(tabs)/(03_calendar)",
        params: { reevaluted: true },
      });
    }
  };
  const forgotHandler = () => {
    router.push("/(tabs)/(04_settings)/forgotPass");
  };

  return (
    <ScrollView style={styles.safeArea}>
      <StatusBar backgroundColor="black" barStyle="dark-content" />
      <View style={styles.container}>
        <SharedLogin image={company?.media?.logo} />

        <Text style={styles.mainTitle}>{localization.LOGIN.title}</Text>
        <Text style={styles.subtitle}>{localization.LOGIN.description}</Text>

        <View style={styles.socialButtonsContainer}>
          {/* <GoogleSigninButton
            style={{ width: "100%", height: 58 }}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={signIn}
          /> */}
        </View>

        <View style={styles.dividerContainer}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>{localization.LOGIN.or}</Text>
          <View style={styles.dividerLine} />
        </View>

        <SharedInput
          label={localization.EMAIL.label}
          value={email}
          onChangeText={handleEmailChange}
          placeholder={localization.EMAIL.placeholder}
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
        />

        <SharedPassword
          label={localization.PASSWORD.label}
          value={password}
          onChangeText={handlePasswordChange}
          placeholder={localization.PASSWORD.placeholder}
        />

        <TouchableOpacity onPress={forgotHandler} style={{ paddingTop: 20 }}>
          <Text style={{ color: "white", textAlign: "right" }}>
            {localization.LOGIN.forgot}
          </Text>
        </TouchableOpacity>

        <SharedButton
          loading={isLoading}
          onPress={handleLogin}
          text={localization.LOGIN.submitBtn}
        />

        <SharedRedirect
          onPress={navigateToRegister}
          question={localization.LOGIN.question}
          text={localization.LOGIN.CTA}
        />
        {isMessage && (
          <SharedMessage
            isOpen={isMessage}
            onClose={!error ? confirmHandler : cancelHandler}
            onConfirm={!error ? confirmHandler : cancelHandler}
            isLoading={isLoading}
            icon={
              <FontAwesome
                name={error ? "close" : success ? "check-circle-o" : "info"}
                size={64}
                color="white"
              />
            }
            title={error || success || message}
            buttonText={localization.OK.label}
          />
        )}
        {/* {isGoogleLoading && <SharedLoader />} */}
      </View>
    </ScrollView>
  );
};
export default LoginScreen;
const styles = StyleSheet.create({
  safeArea: {
    paddingVertical: 10,
    flex: 1,
    backgroundColor: "black",
  },
  iconStyle: {
    width: 30, 
    height: 30, 
    resizeMode: "cover", 
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "black",
    paddingTop: Platform.OS === "android" ? 20 : 0, 
  },
  logo: {
    width: 120,
    height: 100,
    resizeMode: "contain",
    backgroundColor: "black",
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
    marginBottom: 30,
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
    width: width / 2 - 30,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "white",
  },
  googleButton: {
    backgroundColor: "#1C1C1E",
  },
  appleButton: {
    backgroundColor: "#1C1C1E",
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
    marginVertical: 0,
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
  input: {
    backgroundColor: "white", 
    color: "black",
    padding: 15,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 2,
    borderColor: "white",
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
    width: "80%",
  },
});
