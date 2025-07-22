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
import { IconSymbol } from "@/components/ui/IconSymbol";
import usePassword from "../login/hooks/usePassword";
import useEmail from "../login/hooks/useEmail";
import { useNavigation } from "@react-navigation/native";
import SharedInput from "@/shared-components/SharedInput";
import SharedButton from "@/shared-components/SharedButton";
import SharedRedirect from "@/shared-components/SharedRedirect";
import { FontAwesome } from "@expo/vector-icons";
import { SharedMessage } from "@/shared-components/SharedMessage";
const { width } = Dimensions.get("window");

const LoginScreen = () => {
  const navigation = useNavigation();
  const { email, handleEmailChange } = useEmail();

  const { password, handlePasswordChange } = usePassword();
  const { pending, login, success, setIsMessage, isMessage,error } = useLoginForm();
  const handleLogin = () => {
    if(error){
      return;
    }
    login(email, password);
  };
  const navigateToRegister = () => {
    navigation.navigate("components/register/index"); // Navigate to app/(auth)/register.tsx
  };

  const handleGoogleLogin = () => {
    console.log("Google Login");
    // Implement Google login with Expo AuthSession or a dedicated library
  };

  const handleAppleLogin = () => {
    console.log("Apple Login");
    // Implement Apple login with Expo AuthSession or a dedicated library
  };

  const confirmHandler = () => {
    setIsMessage(false);
    navigation.navigate("(tabs)", { screen: "index" });
  }
  const forgotHandler = () => {
        {/* components/forgotPass/index */}
    navigation.navigate("components/forgotPass/index");
  }

  return (
    <ScrollView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <Image
          source={require("../../../assets/images/logoFamilyImg.png")}
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
              source={require("../../../assets/images/googleG.png")} // Adjust path as neededgoogleG
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
    <TouchableOpacity onPress={forgotHandler} style={{paddingTop: 20}}>
      <Text style={{color: 'white',textAlign: 'right' }}>Forgot password?</Text>
    </TouchableOpacity>

        <SharedButton loading={pending} onPress={handleLogin} text="Login" />
        <SharedRedirect
          onPress={navigateToRegister}
          question="Don't have an account?"
          text="Register Now"
        />
        {isMessage && (
          <SharedMessage
            isOpen={isMessage}
            onClose={confirmHandler}
            onConfirm={confirmHandler}
            icon={
              <FontAwesome
                name={error ? "close":"check-circle-o"} // The specific FontAwesome icon to use
                size={64} // Size of the icon
                color="white" // Corresponds to text-blue-500
              />
            }
            title={error || success} // Title of the modal
            buttonText="Ok" // Text for the action button
          />
        )}
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#0A0B0E", // Dark background color
  },
  iconStyle: {
    width: 30, // Set your desired width
    height: 30, // Set your desired height (maintain aspect ratio for best results)
    resizeMode: "cover", // or 'cover', 'stretch', etc. 'contain' is usually good for icons
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
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

export default LoginScreen;
