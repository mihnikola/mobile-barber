import {
  View,
  Text,
  TextInput,
  StatusBar,
  StyleSheet,
  Platform,
} from "react-native";
import { ScrollView } from "react-native";
import { Image } from "react-native";
import SharedButton from "@/shared-components/SharedButton";
import OtpInput from "./OtpCodeInput";
import { useState } from "react";
import ResendOtpCodeTimer from "./ResendOtpCodeTimer";
import useSubmitOtpCode from "./hooks/useSubmitOtpCode";
import { SharedMessage } from "@/shared-components/SharedMessage";
import { FontAwesome } from "@expo/vector-icons";
import useSendEmailVerification from "./hooks/useSendEmailVerification";
import { router, useLocalSearchParams } from "expo-router";

const otpCodeRegister = () => {
  const params = useLocalSearchParams(); // Get the route object
  const { data, email, password } = params;
  const [code, setCode] = useState(Array(6).fill("")); // 6-digit code

  <Text style={styles.mainTitle}>Enter OTP Code</Text>;
  const {
    checkOtpCodeValidation,
    checkOtpCodeVerification,
    message,
    setIsMessage,
    isMessage,
    error,
    isLoading,
    isVerified,
    setIsVerified,
  } = useSubmitOtpCode();

  const {
    verificationOTPCode,
    isMessageVerification,
    isLoadingVerification,
    setIsMessageVerification,
    errorVerification,
    messageVerification,
    setErrorVerification,
  } = useSendEmailVerification();


  const handleVerify = async () => {
    const otp = code.join("");
    if (otp.length === 6) {

      if (email && password) {
        checkOtpCodeVerification(email, password, otp);
      } else {
        checkOtpCodeValidation(data, otp);
      }
    } else {
      setIsMessage(true);
      setError("Please enter all 6 digits.");
    }
  };

  const confirmHandler = () => {
    setIsMessage(false);
    setIsMessageVerification(false);
    if (!email && !password) {
      router.push("/(tabs)/(04_settings)/login");
    }
    if (isVerified && email && password) {
      router.dismissAll();
      router.push("/(tabs)/(01_home)");
    }
  };

  const confirmHandler2 = () => {
    setIsMessage(false);
    setIsMessageVerification(false);
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar backgroundColor="black" barStyle="dark-content" />
      <View>
        <Text style={styles.mainTitle}>Enter OTP Code</Text>
      </View>
      <View>
        <Text style={styles.subtitle}>
          OTP code has been sent to {data || email}.
        </Text>
        <Text style={styles.subtitle}>
          If you didn't find it, check your SPAM mailbox.
        </Text>
      </View>
      <OtpInput code={code} setCode={setCode} />
      <ResendOtpCodeTimer email={data || email} />
      <View style={styles.imageContainer}>
        <Image
          source={require("@/assets/images/fgtPass.png")}
          style={styles.image}
        />
      </View>

      <View style={styles.btnFooter}>
        <SharedButton
          disabled={
            code.join("").length < 6 || isLoading || isLoadingVerification
          }
          text={isLoading || isLoadingVerification ? "Submitting..." : "Submit"}
          onPress={handleVerify}
        />
      </View>
      {isMessage && !isMessageVerification && (
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
          title={error || message} // Title of the modal
          buttonText="Ok" // Text for the action button
        />
      )}
      {isMessageVerification && !isMessage && (
        <SharedMessage
          isOpen={isMessageVerification}
          onClose={!errorVerification ? confirmHandler : confirmHandler2}
          onConfirm={!errorVerification ? confirmHandler : confirmHandler2}
          icon={
            <FontAwesome
              name={errorVerification ? "close" : "check-circle-o"} // The specific FontAwesome icon to use
              size={64} // Size of the icon
              color="white" // Corresponds to text-blue-500
            />
          }
          title={errorVerification || messageVerification} // Title of the modal
          buttonText="Ok" // Text for the action button
        />
      )}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#0A0B0E",
  },
  btnFooter: {
    marginVertical: 40,
  },
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

  resendText: {
    color: "#00AEEF",
    fontSize: 16,
    fontWeight: "bold",
  },
  timerText: {
    color: "#999",
    fontSize: 14,
  },
  iconStyle: {
    width: 30,
    height: 30,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "black",
    paddingTop: Platform.OS === "android" ? 20 : 0,
  },
  image: {
    // width: 290,
    // height: 290,
    resizeMode: "cover",
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
    padding: 5,
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
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "white",
  },
});
export default otpCodeRegister;
