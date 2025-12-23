import {
  ActivityIndicator,
  BackHandler,
  Dimensions,
  KeyboardAvoidingView,
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
import { GoogleSigninButton } from "@react-native-google-signin/google-signin";
import { useAuth } from "@/context/AuthContext";
import { useLocalization } from "@/context/LocalizationContext";
import SharedLogin from "@/shared-components/SharedLogin";
import { useCompany } from "@/context/CompanyContext";
import CustomGoogleButton from "../home/CustomGoogleButton";
import { useEffect, useState } from "react";
import {
  AppleButton,
  appleAuth,
} from "@invertase/react-native-apple-authentication";
import withKeyboardAvoid from "../wrapper/WrapperKeyboard";

const LoginScreen = () => {
  const { data } = useLocalSearchParams();

  const { email, handleEmailChange } = useEmail();
  const { password, handlePasswordChange } = usePassword();
  const [userApple, setUserApple] = useState(null);

  const { localization } = useLocalization();

  const {
    isLoadingLogin,
    setIsMessage,
    isMessage,
    error,
    login,
    success,
    status,
    verificationOTPCode,
    message,
    isGoogleLoading,
    isIosLoading,
    signIn,
    signInIos,
  } = useAuth();

  const { company } = useCompany();

  const handleLogin = async () => {
    login(email, password);
  };
  useEffect(() => {
    const backAction = () => {
      if (router.canGoBack()) {
        router.back();
      }
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const navigateToRegister = () => {
    router.push({
      pathname: "(z_auth)/register",
      params: { image: company?.media?.logo },
    });
  };

  const cancelHandler = async () => {
    setIsMessage(false);
  };

  const redirectValidation = () => {
    setIsMessage(false);
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
    } else if (data === "settings") {
      router.push({
        pathname: "/(tabs)/(04_settings)",
        params: { reevaluted: true },
      });
    } else {
      router.push({
        pathname: "/(tabs)/(01_home)",
        params: { reevaluted: true },
      });
    }
  };
  const confirmHandler = async () => {
    if (status === 606) {
      verificationOTPCode();
    } else {
      setIsMessage(false);
      setTimeout(() => {
        redirectValidation();
      }, 500);
    }
  };
  const forgotHandler = () => {
    router.push("/(z_auth)/forgotPass");
  };
  async function onAppleButtonPress() {
    // Start the sign-in request
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      // As per the FAQ of react-native-apple-authentication, the name should come first in the following array.
      // See: https://github.com/invertase/react-native-apple-authentication#faqs
      requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
    });
    // Ensure Apple returned a user identityToken
    if (!appleAuthRequestResponse.identityToken) {
      throw new Error("Apple Sign-In failed - no identify token returned");
    }

    const userData = {
      email: appleAuthRequestResponse?.email,
      fullName: appleAuthRequestResponse?.fullName,
      user: appleAuthRequestResponse?.user,
      token: appleAuthRequestResponse?.identityToken
    }
    await signInIos(userData);
  }

  return (
    <ScrollView style={styles.containerData} keyboardShouldPersistTaps={"always"}>
      <View style={styles.container}>
        <SharedLogin image={company?.media?.logo} />

        <Text style={styles.mainTitle}>{localization.LOGIN.title}</Text>
        <Text style={styles.subtitle}>{localization.LOGIN.description}</Text>

        <View style={styles.socialButtonsContainer}>
          <View style={{ flex: 1, justifyContent: "center" }}>
            {Platform.OS === "ios" ? (
              <View style={styles.socialBtns}>
                <CustomGoogleButton
                  onPress={signIn}
                  isGoogleLoading={isGoogleLoading}
                />
                <AppleButton
                  buttonStyle={AppleButton.Style.WHITE}
                  buttonType={AppleButton.Type.SIGN_IN}
                  style={{
                    width: 333, // You must specify a width
                    height: 45, // You must specify a height
                  }}
                  onPress={() => onAppleButtonPress()}
                />
              </View>
            ) : (
              <CustomGoogleButton
                onPress={signIn}
                isGoogleLoading={isGoogleLoading}
              />
            )}
          </View>
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
          loading={isLoadingLogin}
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
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  socialBtns: {
    display: "flex",
    flexDirection: "column",
    gap: 15,
  },
  containerData: {
    flex: 1,
  },
  buttonGoogleIsLoading: {
    backgroundColor: "#4285A0",
    height: 58,
    width: "100%",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
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

export default withKeyboardAvoid(LoginScreen);
