import {
  BackHandler,
  Dimensions,
  findNodeHandle,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useEmailField, usePasswordField } from "@/lib/hooks/useFormFields";
import SharedInput from "@/components/legacy/SharedInput";
import SharedButton from "@/components/legacy/SharedButton";
import SharedRedirect from "@/components/layout/SharedRedirect";
import { router, useLocalSearchParams } from "expo-router";
import SharedPassword from "@/components/legacy/SharedPassword";
import { useAuth } from "@/context/AuthContext";
import { useLocalization } from "@/context/LocalizationContext";
import SharedLogin from "@/components/layout/SharedLogin";
import { useCompany } from "@/context/CompanyContext";
import CustomGoogleButton from "@/components/legacy/CustomGoogleButton";
import CustomAppleButton from "@/components/legacy/CustomAppleButton";
import { useEffect, useRef } from "react";
import SharedBackButton from "@/components/layout/SharedBackButton";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fonts, makeStyles, useTheme } from "@/theme";
import { AppText, Icon, MessageDialog, Pressable } from "@/components/ui";
import { routes } from "@/lib/navigation/routes";

const { width } = Dimensions.get("window");

const LoginScreen = () => {
  const { colors } = useTheme();
  const styles = useStyles();
  const { email, handleEmailChange } = useEmailField({ validate: false });
  const { password, handlePasswordChange, passwordInputRef } = usePasswordField({ validate: false });
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
      pathname: routes.auth.register,
      params: { image: company?.media?.logo },
    });
  };

  const cancelHandler = async () => {
    setIsMessage(false);
  };

  const confirmHandler = async () => {
    const paramLogin = await AsyncStorage.getItem("paramLogin");
    if (status === 606) {
      if (await verificationOTPCode()) router.push(routes.auth.otpCode);
    } else {
      setIsMessage(false);

      setTimeout(async () => {
        const target = await redirectValidation(paramLogin);
        if (target === "settings") {
          router.back();
          router.replace(routes.settings.root);
        } else if (target === "appointments") {
          router.back();
          router.replace(routes.appointments.root);
        } else if (target === "calendar") {
          router.back();
        }
      }, 500);
    }
  };
  const forgotHandler = () => {
    router.push(routes.auth.forgotPassword);
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
        <Pressable hitSlop={20} onPress={router.back}>
          <Icon name="back" size={25} />
        </Pressable>

        <View style={styles.logoImage}>
          <SharedLogin />
        </View>
        <View style={{ alignItems: "center", marginTop: 10 }}>
          <AppText variant="heading" style={styles.mainTitle}>{localization.LOGIN.title}</AppText>
          <AppText variant="title" size={13} color="textInactive" style={styles.subtitle}>{localization.LOGIN.description}</AppText>
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
          <AppText variant="title" size={15} style={styles.dividerText}>{localization.LOGIN.or}</AppText>
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
        <Pressable onPress={forgotHandler} style={{ paddingTop: 20 }}>
          <Text
            style={{
              color: colors.text,
              textAlign: "right",
              fontFamily: fonts.regular,
            }}
          >
            {localization.LOGIN.forgot}
          </Text>
        </Pressable>

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
          <MessageDialog
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

const useStyles = makeStyles((colors) => ({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  buttonGoogleIsLoading: {
    backgroundColor: colors.brandBlue,
    height: 58,
    width: "100%",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    shadowColor: colors.background,
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
    backgroundColor: colors.background,
  },
  logo: {
    width: 120,
    height: 100,
    resizeMode: "contain",
    backgroundColor: colors.background,
  },
  mainTitle: {
    marginBottom: 5,
  },
  subtitle: {
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
    color: colors.text,
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
    marginHorizontal: 10,
  },
  input: {
    backgroundColor: colors.white,
    color: colors.textOnLight,
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

    borderColor: colors.textInactive,
  },
  passwordInput: {
    backgroundColor: colors.white,
    color: colors.text,
    padding: 15,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 2,
    borderColor: colors.textInactive,
    width: "80%",
  },
}));

export default LoginScreen;
