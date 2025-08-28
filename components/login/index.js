import useLoginForm from "./hooks/useLoginForm";
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
import { SharedLoader } from "@/shared-components/SharedLoader";
import SharedPassword from "@/shared-components/SharedPassword";
const { width } = Dimensions.get("window");
import { GoogleSigninButton } from "@react-native-google-signin/google-signin";
import useGoogleSignIn from "./hooks/useGoogleSignIn";


const LoginScreen = (props) => {
  console.log("dlkashdjkhasgdjhsagdjhgsadhjg")
  const params = useLocalSearchParams();
  const {tokenData} = props;
  const {
    signIn,
    error: errorGoogle,
    isMessage: isMessageGoogle,
    pending: pendingGoogle,
    success: successGoogle,
    setIsMessage: setIsMessageGoogle,
  } = useGoogleSignIn();
  const { data } = params;
  const { email, handleEmailChange } = useEmail();
  const { password, handlePasswordChange } = usePassword();
  const {
    pending,
    login,
    status,
    success,
    setIsMessage,
    isMessage,
    error,
    verificationOTPCode,
    isLoading,
    message,
  } = useLoginForm();

  const handleLogin = async () => {
    login(email, password);
  };
  const navigateToRegister = () => {
    router.push("(tabs)/(04_settings)/register");
  };

  const handleAppleLogin = () => {
    // Implement Apple login with Expo AuthSession or a dedicated library
  };
  const confirmHandler2 = async () => {
    setIsMessage(false);
  };
  const confirmHandlerGoogle = async () => {

    setIsMessageGoogle(false);
    redirectValidation();
  };
  const confirmHandlerGoogle2 = async () => {
    setIsMessageGoogle(false);
  };
  const confirmHandler = async () => {
    if (status === 606) {
      verificationOTPCode(email, password);
    } else {
      setIsMessage(false);

      redirectValidation();
    }
  };

  const redirectValidation = () => {
    if (data === "1") {
      router.push({
        pathname: "/(tabs)/(02_barbers)/calendar",
        params: { reevaluted: true },
      });
    } else if (data === "2") {
      router.push({
        pathname: "/(tabs)/(03_calendar)",
        params: { reevaluted: true },
      });
    }else{
      tokenData();
    }
  };
  const forgotHandler = () => {
    router.push("/(tabs)/(04_settings)/forgotPass");
  };

  return (
    <ScrollView style={styles.safeArea}>
      <StatusBar backgroundColor="black" barStyle="dark-content" />
      <View style={styles.container}>
        <Image
          source={require("@/assets/images/adaptive-icon.png")}
          style={styles.logo}
        />

        <Text style={styles.mainTitle}>Let's get you Login!</Text>
        <Text style={styles.subtitle}>Enter your information below</Text>

        <View style={styles.socialButtonsContainer}>
          {/* <TouchableOpacity
            style={[styles.socialButton, styles.googleButton]}
            onPress={handleGoogleLogin}
          >
            <Image
              source={require("@/assets/images/googleG.png")} // Adjust path as neededgoogleG
              style={styles.iconStyle}
            /> */}
          <GoogleSigninButton
            style={{ width: "100%", height: 58 }}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={signIn}
          />

          {/* <Text style={styles.socialButtonText}>Google</Text> */}
          {/* </TouchableOpacity> */}
          {/* <TouchableOpacity
            style={[styles.socialButton, styles.appleButton]}
            onPress={handleAppleLogin}
          >
            <IconSymbol
              name="apple"
              size={24}
              color="white"
              style={styles.socialIcon}
            />
            <Text style={styles.socialButtonText}>Apple</Text>
          </TouchableOpacity> */}
        </View>

        <View style={styles.dividerContainer}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>Or Login With</Text>
          <View style={styles.dividerLine} />
        </View>

        <SharedInput
          label="Email Address"
          value={email}
          onChangeText={handleEmailChange}
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
        />

        <SharedPassword
          label="Password"
          value={password}
          onChangeText={handlePasswordChange}
          placeholder="Enter your password"
        />

        <TouchableOpacity onPress={forgotHandler} style={{ paddingTop: 20 }}>
          <Text style={{ color: "white", textAlign: "right" }}>
            Forgot password?
          </Text>
        </TouchableOpacity>

        <SharedButton
          loading={pending}
          onPress={handleLogin}
          text={pending ? "Loading" : "Login"}
        />
        <SharedRedirect
          onPress={navigateToRegister}
          question="Don't have an account?"
          text="Register Now"
        />
        {isMessage && (
          <SharedMessage
            isOpen={isMessage}
            onClose={!error ? confirmHandler : confirmHandler2}
            onConfirm={!error ? confirmHandler : confirmHandler2}
            isLoading={isLoading}
            icon={
              <FontAwesome
                name={error ? "close" : success ? "check-circle-o" : "info"} // The specific FontAwesome icon to use
                size={64} // Size of the icon
                color="white" // Corresponds to text-blue-500
              />
            }
            title={error || success || message} // Title of the modal
            buttonText={isLoading ? "Loading..." : "OK"} // Text for the action button
          />
        )}
        {pendingGoogle && <SharedLoader />}
        {pending && <SharedLoader />}
        {isMessageGoogle && (
          <SharedMessage
            isOpen={isMessageGoogle}
            onClose={
              !errorGoogle ? confirmHandlerGoogle : confirmHandlerGoogle2
            }
            onConfirm={
              !errorGoogle ? confirmHandlerGoogle : confirmHandlerGoogle2
            }
            isLoading={pendingGoogle}
            icon={
              <FontAwesome
                name={errorGoogle ? "close" : "check-circle-o"} // The specific FontAwesome icon to use
                size={64} // Size of the icon
                color="white" // Corresponds to text-blue-500
              />
            }
            title={errorGoogle || successGoogle} // Title of the modal
            buttonText={pendingGoogle ? "Loading..." : "OK"} // Text for the action button
          />
        )}
      </View>
    </ScrollView>
  );
};
export default LoginScreen;
const styles = StyleSheet.create({
  safeArea: {
    paddingVertical: 10,
    flex: 1,
    backgroundColor: "black", // Dark background color
  },
  iconStyle: {
    width: 30, // Set your desired width
    height: 30, // Set your desired height (maintain aspect ratio for best results)
    resizeMode: "cover", // or 'cover', 'stretch', etc. 'contain' is usually good for icons
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "black", // Dark background color
    paddingTop: Platform.OS === "android" ? 20 : 0, // Add padding for Android status bar
  },
  logo: {
    width: 120, // Adjust size as needed
    height: 100, // Adjust size as needed
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
    backgroundColor: "#1C1C1E", // Darker background for Google
  },
  appleButton: {
    backgroundColor: "#1C1C1E", // Darker background for Apple
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
    backgroundColor: "white", // Dark input background
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
    backgroundColor: "white", // Dark input background
    color: "black",
    padding: 15,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 2,
    borderColor: "white",
    width: "80%",
  },
});
