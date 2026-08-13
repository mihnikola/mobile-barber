import {
  BackHandler,
  Dimensions,
  findNodeHandle,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
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
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { SharedMessage } from "@/shared-components/SharedMessage";
import { router, useLocalSearchParams } from "expo-router";
import SharedPassword from "@/shared-components/SharedPassword";
const { width } = Dimensions.get("window");
import { useAuth } from "@/context/AuthContext";
import { useLocalization } from "@/context/LocalizationContext";
import SharedLogin from "@/shared-components/SharedLogin";
import { useCompany } from "@/context/CompanyContext";
import CustomGoogleButton from "../home/CustomGoogleButton";
import CustomAppleButton from "../home/CustomAppleButton";
import { useEffect, useRef } from "react";
import SharedBackButton from "@/shared-components/SharedBackButton";
import withKeyboardAvoid from "../wrapper/WrapperKeyboard";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = () => {
  const { email, handleEmailChange } = useEmail();
  const { password, handlePasswordChange, passwordInputRef } = usePassword();
  const scrollRef = useRef(null);
  const insets = useSafeAreaInsets();
  // const { data } = useLocalSearchParams();

  const { localization } = useLocalization();

  const {
    setIsMessage,
    isMessage,

    error,
    success,
    status,
    verificationOTPCode,

    message,
    loading,

    signIn,
    onAppleButtonPress,
    login,

    redirectValidation,
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
      backAction,
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

  const confirmHandler = async () => {
    const paramLogin = await AsyncStorage.getItem("paramLogin");
    if (status === 606) {
      verificationOTPCode();
    } else {
      setIsMessage(false);

      setTimeout(() => {
        redirectValidation(paramLogin);
      }, 500);
    }
  };
  const forgotHandler = () => {
    router.push("/(z_auth)/forgotPass");
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "black" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={insets.top}
    >
      <ScrollView
        ref={scrollRef}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          paddingBottom: 25,
          paddingTop: insets.top > 20 ? insets.top - 10 : insets.top,
        }}
      >
        <View style={styles.container}>
          {/* <SharedBackButton onPress={router.back} /> */}
          <TouchableOpacity hitSlop={20} onPress={router.back}>
            <MaterialIcons name="arrow-back" size={25} color="white" />
          </TouchableOpacity>

          <View style={styles.logoImage}>
            <SharedLogin image={company?.media?.logo} />
          </View>
          <View style={{ alignItems: "center", marginTop: 10 }}>
            <Text style={styles.mainTitle}>{localization.LOGIN.title}</Text>
            <Text style={styles.subtitle}>
              {localization.LOGIN.description}
            </Text>
          </View>

          <View style={styles.socialButtonsContainer}>
            <View style={{ flex: 1, justifyContent: "center" }}>
              {Platform.OS === "ios" ? (
                <View style={styles.socialBtns}>
                  <CustomGoogleButton
                    onPress={signIn}
                    isGoogleLoading={loading === "google"}
                  />
                  <CustomAppleButton
                    onPress={onAppleButtonPress}
                    isAppleLoading={loading === "ios"}
                  />
                </View>
              ) : (
                <CustomGoogleButton
                  onPress={signIn}
                  isGoogleLoading={loading === "google"}
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
              passwordInputRef.current?.focus();
            }}
            onChangeText={handleEmailChange}
            placeholder={localization.EMAIL.placeholder}
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
          />

          <SharedPassword
            label={localization.PASSWORD.label}
            value={password}
            ref={passwordInputRef}
            onChangeText={handlePasswordChange}
            placeholder={localization.PASSWORD.placeholder}
          />

          <TouchableOpacity onPress={forgotHandler} style={{ paddingTop: 20 }}>
            <Text style={{ color: "white", textAlign: "right" }}>
              {localization.LOGIN.forgot}
            </Text>
          </TouchableOpacity>

          <SharedButton
            // loading={isLoadingLogin}
            loading={loading === "login"}
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
              isLoading={loading}
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
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  socialBtns: {
    display: "flex",
    flexDirection: "column",
    gap: 15,
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
  logoImage: {
    alignItems: "center",
    marginTop: 10,
  },

  iconStyle: {
    width: 30,
    height: 30,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 10,
    paddingTop: 20,
    backgroundColor: "black",
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
