import { View, Text, StatusBar, StyleSheet, Platform } from "react-native";
import { ScrollView } from "react-native";
import { Image } from "react-native";
import SharedButton from "@/shared-components/SharedButton";
import OtpInput from "./OtpCodeInput";
import { useState } from "react";
import ResendOtpCodeTimer from "./ResendOtpCodeTimer";
import useSubmitOtpCode from "./hooks/useSubmitOtpCode";
import { FontAwesome } from "@expo/vector-icons";
import { SharedMessage } from "@/shared-components/SharedMessage";
import { router, useLocalSearchParams } from "expo-router";

const otpCode = () => {
  const params = useLocalSearchParams();
  const { data } = params;


  const [code, setCode] = useState(Array(6).fill("")); // 6-digit code
  const {
    checkOtpCodeValidation,
    isLoading,
    message,
    setIsMessage,
    isMessage,
    error,
    setError,
  } = useSubmitOtpCode();
  const handleVerify = () => {
    const otp = code.join("");
    if (otp.length === 6) {
      //   Alert.alert("OTP Entered", otp);
      // You can send OTP to backend here
      checkOtpCodeValidation(data, otp);
    } else {
      setIsMessage(true);
      setError("Please enter all 6 digits.");
    }
  };

  const confirmHandler = () => {
    setIsMessage(false);
    // navigation.navigate("components/changePass/index",{data});
    router.push({
      pathname: "/(tabs)/(04_settings)/changePassword",
      params: { data },
    });
  };

  const confirmHandler2 = () => {
    setIsMessage(false);
    setError(null);
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar backgroundColor="black" barStyle="dark-content" />
      <View>
        <Text style={styles.mainTitle}>Enter OTP Code</Text>
      </View>
      <View>
        <Text style={styles.subtitle}>OTP code has been sent to {data}.</Text>
        <Text style={styles.subtitle}>
          If you didn't find it, check your SPAM mailbox.
        </Text>
      </View>
      <OtpInput code={code} setCode={setCode} />
      <ResendOtpCodeTimer email={data} />
      <View style={styles.imageContainer}>
        <Image
          source={require("@/assets/images/fgtPass.png")}
          style={styles.image}
        />
      </View>

      <View style={styles.btnFooter}>
        <SharedButton
          disabled={
            code.join("").length < 6 || isLoading
          }
          text={isLoading ? "Submitting..." : "Submit"}
          onPress={handleVerify}
        />
      </View>
       
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
          title={error || message} // Title of the modal
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
    width: 290,
    height: 290,
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
export default otpCode;
