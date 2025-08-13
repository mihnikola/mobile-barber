import useLoginForm from "./hooks/useLoginForm";
import {
  BackHandler,
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
import { IconSymbol } from "@/components/ui/IconSymbol";
import usePassword from "./hooks/usePassword";
import useEmail from "./hooks/useEmail";
import SharedInput from "@/shared-components/SharedInput";
import SharedButton from "@/shared-components/SharedButton";
import SharedRedirect from "@/shared-components/SharedRedirect";
import { FontAwesome } from "@expo/vector-icons";
import { SharedMessage } from "@/shared-components/SharedMessage";
import { useCallback, useEffect } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SharedLoader } from "@/shared-components/SharedLoader";
const { width } = Dimensions.get("window");

const LoginScreen = () => {
  const params = useLocalSearchParams();
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

  function handleBackButtonClick3() {
    return true;
  }
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick3);
    return () => {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackButtonClick3
      );
    };
  }, []);

  const handleLogin = async () => {
    login(email, password);
  };
  const navigateToRegister = () => {
    router.push("(tabs)/(04_settings)/register");
  };

  const handleGoogleLogin = () => {
    console.log("Google Login");
    // Implement Google login with Expo AuthSession or a dedicated library
  };

  const handleAppleLogin = () => {
    console.log("Apple Login");
    // Implement Apple login with Expo AuthSession or a dedicated library
  };
  const confirmHandler2 = async () => {
    setIsMessage(false);
  };
  const confirmHandler = async () => {
    setIsMessage(false);

    if (status === 606) {
      verificationOTPCode(email, password);

      router.push({
        pathname: "/(tabs)/(04_settings)/otpCodeRegister",
        params: { email, password },
      });
    } else {
      redirectValidation();
    }
  };

  const redirectValidation = () => {
    console.log("redirectValidation++++",data)
    if (data === "1") {
      router.push({
        pathname: "/(tabs)/(02_barbers)/calendar",
        params: { reevaluted: true },
      });
      console.log("/(tabs)/(02_barbers)/calendar-", data);
    } else if (data === "2") {
      router.push({
        pathname: "/(tabs)/(03_calendar)",
        params: { reevaluted: true },
      });
      console.log("/(tabs)/(03_calendar)-", data);
    } else {
      router.push({
        pathname: "/(tabs)/(04_settings)",
        params: { reevaluted: true },
      });
    }
  };
  const forgotHandler = () => {
    router.push("/(tabs)/(04_settings)/forgotPass");
  };

  const getToken = async () => {
    const storedToken = await AsyncStorage.getItem("token");
    if (storedToken) {
      router.push({
        pathname: "/(tabs)/(04_settings)",
        params: { reevaluted: true },
      });
    }
  };
  useFocusEffect(
    useCallback(() => {
      getToken();
    }, [])
  );

  return (
    <ScrollView style={styles.safeArea}>
      <StatusBar backgroundColor="black" barStyle="dark-content" />
      <View style={styles.container}>
        <Image
          source={require("@/assets/images/logoFamilyImg.png")}
          style={styles.logo}
        />

        <Text style={styles.mainTitle}>Let's get you Login!</Text>
        <Text style={styles.subtitle}>Enter your information below</Text>

        <View style={styles.socialButtonsContainer}>
          <TouchableOpacity
            style={[styles.socialButton, styles.googleButton]}
            onPress={handleGoogleLogin}
          >
            <Image
              source={require("@/assets/images/googleG.png")} // Adjust path as neededgoogleG
              style={styles.iconStyle}
            />

            <Text style={styles.socialButtonText}>Google</Text>
          </TouchableOpacity>
          <TouchableOpacity
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
          </TouchableOpacity>
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
        <SharedInput
          label="Password"
          value={password}
          onChangeText={handlePasswordChange}
          placeholder="Enter your password"
          style={styles.passwordInput}
          stylePassword={styles.passwordInputContainer}
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
            icon={
              <FontAwesome
                name={error ? "close" : "check-circle-o"} // The specific FontAwesome icon to use
                size={64} // Size of the icon
                color="white" // Corresponds to text-blue-500
              />
            }
            title={error || success || message} // Title of the modal
            buttonText="Ok" // Text for the action button
          />
        )}
        {isLoading && <SharedLoader isOpen={isLoading} />}
      </View>
    </ScrollView>
  );
};
export default LoginScreen;
const styles = StyleSheet.create({
  safeArea: {
    paddingVertical: 20,
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
    backgroundColor: "#0A0B0E", // Dark background color
    paddingTop: Platform.OS === "android" ? 20 : 0, // Add padding for Android status bar
  },
  logo: {
    width: 200, // Adjust size as needed
    height: 80, // Adjust size as needed
    resizeMode: "cover",
    alignSelf: "flex-start", // Aligns to the left as in the image
    marginLeft: -50,
    marginBottom: 20,
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
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#333",
  },
  passwordInput: {
    flex: 1,
    color: "black",
    padding: 15,
    fontSize: 16,
  },
});
