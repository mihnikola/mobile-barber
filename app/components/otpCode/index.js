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
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

const RESEND_TIME = 30; // seconds
const otpCode = () => {
  const nav = useNavigation();
  const [code, setCode] = useState(Array(4).fill("")); // 6-digit code
  const [timer, setTimer] = useState(RESEND_TIME);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleResendCode = () => {
    if (!canResend) return;

    // Resend OTP logic goes here (API call)
    console.log("OTP resent!");


    // Restart timer
    setTimer(RESEND_TIME);
    setCanResend(false);
  };
  const handleVerify = () => {
    const otp = code.join("");
    if (otp.length === 4) {
    //   Alert.alert("OTP Entered", otp);
      // You can send OTP to backend here
    nav.navigate('components/changePass/index');


    } else {
      Alert.alert("Incomplete OTP", "Please enter all 4 digits.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar backgroundColor="black" barStyle="dark-content" />
      <View>
        <Text style={styles.mainTitle}>Enter OTP Code</Text>
      </View>
      <View>
        <Text style={styles.subtitle}>
          OTP code has been sent to +381 54 54 5465848
        </Text>
      </View>
      <OtpInput code={code} setCode={setCode} />
      {canResend ? (
        <Text style={styles.resendText} onPress={handleResendCode}>
          Resend Code
        </Text>
      ) : (
        <Text style={styles.timerText}>Resend Code in {timer}s</Text>
      )}
      <View style={styles.imageContainer}>
        <Image
          source={require("../../../assets/images/fgtPass.png")}
          style={styles.image}
        />
      </View>

      <View style={styles.btnFooter}>
        <SharedButton text="Submit" onPress={handleVerify} />
      </View>
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
  resendContainer: {
    alignItems: "center",
    marginVertical: 15,
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
