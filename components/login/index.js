import {
  BackHandler,
  findNodeHandle,
  Platform,
  ScrollView,
  View,
} from "react-native";
import { useEmailField, usePasswordField } from "@/lib/hooks/useFormFields";
import SharedRedirect from "@/components/layout/SharedRedirect";
import { router } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import { useLocalization } from "@/context/LocalizationContext";
import SharedLogin from "@/components/layout/SharedLogin";
import { useCompany } from "@/context/CompanyContext";
import { useEffect, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { makeStyles } from "@/theme";
import { AppText, Button, Icon, MessageDialog, PasswordField, Pressable, TextField } from "@/components/ui";
import { routes } from "@/lib/navigation/routes";


const LoginScreen = () => {
  const styles = useStyles();
  const { email, handleEmailChange } = useEmailField({ validate: false });
  const { password, handlePasswordChange, passwordInputRef } = usePasswordField({ validate: false });
  const scrollRef = useRef(null);
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
      style={styles.screen}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="always"
    >
      <Pressable hitSlop={20} onPress={router.back} style={styles.back}>
        <Icon name="back" />
      </Pressable>

      <View style={styles.header}>
        <SharedLogin />
        <AppText variant="displayLg" align="center" style={styles.title}>
          {localization.LOGIN.title}
        </AppText>
        <AppText variant="body" color="inkMuted" align="center">
          {localization.LOGIN.description}
        </AppText>
      </View>

      <View style={styles.social}>
        <Button
          variant="socialDark"
          title={localization.GOOGLE_BTN.label}
          image={require("@/assets/images/googleg_64dp.png")}
          onPress={signIn}
          loading={loading === "google"}
        />
        {Platform.OS === "ios" && (
          <Button
            variant="socialLight"
            title={localization.APPLE_BTN.label}
            image={require("@/assets/images/apple.png")}
            onPress={onAppleButtonPress}
            loading={loading === "ios"}
          />
        )}
      </View>

      <View style={styles.divider}>
        <View style={styles.dividerLine} />
        <AppText variant="label" color="inkMuted" style={styles.dividerText}>
          {localization.LOGIN.or}
        </AppText>
        <View style={styles.dividerLine} />
      </View>

      <TextField
        label={localization.EMAIL.label}
        value={email}
        returnKeyType="next"
        onSubmitEditing={() => {
          const node = findNodeHandle(passwordInputRef.current);
          if (node) {
            scrollRef.current?.scrollResponderScrollNativeHandleToKeyboard(node, 80, true);
          }
          passwordInputRef.current?.focus();
        }}
        onChangeText={handleEmailChange}
        placeholder={localization.EMAIL.placeholder}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <View onLayout={(e) => (passwordLayoutY.current = e.nativeEvent.layout.y)}>
        <PasswordField
          label={localization.PASSWORD.label}
          value={password}
          ref={passwordInputRef}
          onChangeText={handlePasswordChange}
          placeholder={localization.PASSWORD.placeholder}
        />
      </View>

      <Pressable onPress={forgotHandler} hitSlop={8} style={styles.forgot}>
        <AppText variant="bodySm" bold style={styles.link}>
          {localization.LOGIN.forgot}
        </AppText>
      </Pressable>

      <Button loading={loading === "login"} onPress={handleLogin} title={localization.LOGIN.submitBtn} style={styles.submit} />

      <SharedRedirect onPress={navigateToRegister} question={localization.LOGIN.question} text={localization.LOGIN.CTA} />

      {isMessage && (
        <MessageDialog
          isLoading={loading}
          isOpen={isMessage}
          onClose={!error ? confirmHandler : cancelHandler}
          onConfirm={!error ? confirmHandler : cancelHandler}
          icon={<Icon name={error ? "close" : success ? "check" : "info"} size={32} />}
          title={error || success || message}
          buttonText={localization.OK.label}
        />
      )}
    </ScrollView>
  );
};

const useStyles = makeStyles((colors) => ({
  screen: { flex: 1, backgroundColor: colors.bg },
  content: { flexGrow: 1, paddingHorizontal: 16, paddingTop: 16, paddingBottom: 32 },
  back: { alignSelf: "flex-start", padding: 4 },
  header: { alignItems: "center", gap: 8, marginTop: 8, marginBottom: 24 },
  title: { marginTop: 16 },
  social: { gap: 8 },
  divider: { flexDirection: "row", alignItems: "center", gap: 12, marginTop: 24, marginBottom: 8 },
  dividerLine: { flex: 1, height: 1, backgroundColor: colors.line },
  dividerText: { textTransform: "uppercase", letterSpacing: 0.78 },
  forgot: { alignSelf: "flex-end", marginTop: 12 },
  link: { textDecorationLine: "underline" },
  submit: { marginTop: 24, marginBottom: 24 },
}));

export default LoginScreen;
