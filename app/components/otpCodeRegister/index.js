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
import { Alert } from "react-native";
import OtpInput from "./OtpCodeInput";
import { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import ResendOtpCodeTimer from "./ResendOtpCodeTimer";
import useSubmitOtpCode from "./hooks/useSubmitOtpCode";
import { SharedMessage } from "@/shared-components/SharedMessage";
import { FontAwesome } from "@expo/vector-icons";

const otpCodeRegister = () => {
  const route = useRoute(); // Get the route object
  const { data } = route.params;
  const [code, setCode] = useState(Array(6).fill("")); // 6-digit code
  const navigation = useNavigation();
        <Text style={styles.mainTitle}>Enter OTP Code</Text>
  const { checkOtpCodeValidation, message, setIsMessage, isMessage, error, isLoading } =
    useSubmitOtpCode();

  const handleVerify = () => {
    const otp = code.join("");
    if (otp.length === 6) {
      //   Alert.alert("OTP Entered", otp);
      // You can send OTP to backend here
      checkOtpCodeValidation(data, otp);
      //   console.log("::checkOtpCodeValidation",message);
      // if (message) {
      //   nav.navigate("components/changePass/index");
      // }
    } else {
      Alert.alert("Incomplete OTP", "Please enter all 6 digits.");
    }
  };

  const confirmHandler = () => {
    setIsMessage(false);
    navigation.navigate("components/login/index");
  }

  const confirmHandler2 = () => {
    setIsMessage(false);

  }

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
          source={require("../../../assets/images/fgtPass.png")}
          style={styles.image}
        />
      </View>

      <View style={styles.btnFooter}>
        <SharedButton
          disabled={code.join("").length < 6 || isLoading}
          text={isLoading ? "Submitting...":"Submit"}
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
    backgroundColor: "#0A0B0E",
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
export default otpCodeRegister;
