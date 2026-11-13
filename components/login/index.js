import {
  BackHandler,
  Dimensions,
  findNodeHandle,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import usePassword from "./hooks/usePassword";
import useEmail from "./hooks/useEmail";
import SharedInput from "@/shared-components/SharedInput";
import SharedButton from "@/shared-components/SharedButton";
import SharedRedirect from "@/shared-components/SharedRedirect";
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
import { ColorsBarber } from "@/constants/Colors";
import { TouchableOpacity } from "@/shared-components/TouchableOpacity";
import { colors, fonts } from "@/theme";
import { Icon } from "@/components/ui";

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
    console.log("paramsLogin", paramLogin);
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
  const passwordLayoutY = useRef(0);

  return (
    <ScrollView
      ref={scrollRef}
      keyboardDismissMode="interactive"
      style={styles.safeArea}
      contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
      keyboardShouldPersistTaps="always"
    >
      <View style={styles.container}>
        <TouchableOpacity hitSlop={20} onPress={router.back}>
          <Icon name="back" size={25} />
        </TouchableOpacity>

        <View style={styles.logoImage}>
          <SharedLogin />
        </View>
        <View style={{ alignItems: "center", marginTop: 10 }}>
          <Text style={styles.mainTitle}>{localization.LOGIN.title}</Text>
          <Text style={styles.subtitle}>{localization.LOGIN.description}</Text>
        </View>

        <View style={styles.socialButtonsContainer}>
          <View style={{ flex: 1, justifyContent: "center" }}>
            {Platform.OS === "ios" ? (
              <View>
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
        <View
          onLayout={(e) => (passwordLayoutY.current = e.nativeEvent.layout.y)}
        >
          <SharedPassword
            label={localization.PASSWORD.label}
            value={password}
            ref={passwordInputRef}
            onChangeText={handlePasswordChange}
            placeholder={localization.PASSWORD.placeholder}
          />
        </View>
        <TouchableOpacity onPress={forgotHandler} style={{ paddingTop: 20 }}>
          <Text
            style={{
              color: ColorsBarber.dark.textColor,
              textAlign: "right",
              fontFamily: fonts.regular,
            }}
          >
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
              <Icon name={error ? "close" : success ? "check" : "info"} size={64} color="text" />
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
  safeArea: {
    flex: 1,
    backgroundColor: ColorsBarber.dark.background,
  },
  buttonGoogleIsLoading: {
    backgroundColor: colors.brandBlue,
    height: 58,
    width: "100%",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    shadowColor: ColorsBarber.dark.background,
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
    paddingVertical: 50,
    backgroundColor: ColorsBarber.dark.background,
  },
  logo: {
    width: 120,
    height: 100,
    resizeMode: "contain",
    backgroundColor: ColorsBarber.dark.background,
  },
  mainTitle: {
    fontSize: 22,
    fontFamily: fonts.bold,
    color: ColorsBarber.dark.textColor,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 13,
    color: ColorsBarber.dark.inActiveTextColor,
    marginBottom: 30,
    fontFamily: fonts.bold,
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
    borderColor: colors.white,
  },
  googleButton: {
    backgroundColor: colors.surfaceInput,
  },
  appleButton: {
    backgroundColor: colors.surfaceInput,
  },
  socialIcon: {
    marginRight: 10,
  },
  socialButtonText: {
    color: ColorsBarber.dark.textColor,
    fontSize: 16,
    fontFamily: fonts.regular,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 0,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.surfaceRaised,
  },
  dividerText: {
    color: ColorsBarber.dark.textColor,
    marginHorizontal: 10,
    fontSize: 15,
    fontFamily: fonts.bold,
  },
  input: {
    backgroundColor: colors.white,
    color: ColorsBarber.dark.textColorInput,
    padding: 15,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 2,
    borderColor: colors.white,
    fontFamily: fonts.regular,
  },
  passwordInputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 8,
    borderWidth: 2,

    borderColor: ColorsBarber.dark.inActiveTextColor,
  },
  passwordInput: {
    backgroundColor: colors.white,
    color: ColorsBarber.dark.textColor,
    padding: 15,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 2,
    borderColor: ColorsBarber.dark.inActiveTextColor,
    width: "80%",
  },
});

export default LoginScreen;
