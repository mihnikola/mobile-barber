import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  StatusBar,
} from "react-native";
import { Platform } from "react-native";
import RadioButton from "./RadioButton";
import SharedButton from "@/shared-components/SharedButton";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import useEmailOtpCode from "../changePass/hooks/useEmailOtpCode";
import { SharedMessage } from "@/shared-components/SharedMessage";
import { FontAwesome } from "@expo/vector-icons";

const ForgotPassword = () => {
  const navigation = useNavigation();
  const [active, setActive] = useState("email");
  const [email, setEmail] = useState("mihaola993@gmail.com");
  const {
    checkEmailValidation,
    error,
    isLoading,
    message,
    setMessage,
    isMessage,
    setIsMessage,
  } = useEmailOtpCode();
  const navHandler = () => {
    checkEmailValidation(email);
  };
  const confirmHandler = () => {
    setIsMessage(false);
    setMessage(null);
    navigation.navigate("components/otpCode/index", {data: email});
  };
  return (
    <ScrollView style={styles.container}>
      <StatusBar backgroundColor="black" barStyle="dark-content" />
      <View>
        <Text style={styles.mainTitle}>Forgot Password</Text>
      </View>
      <View>
        <Text style={styles.subtitle}>
          Select which contact details should we use to reset your password
          
        </Text>
      </View>
      <View style={styles.imageContainer}>
        <Image
          source={require("../../../assets/images/fgtPass.png")}
          style={styles.image}
        />
      </View>
      <View style={styles.radiobtn}>
        {/* <RadioButton
          icon="sms"
          color="white"
          title="Send OTP via SMS"
          value="+395 54654 54 54"
          onPress={() => setActive("sms")}
          active={active === "sms"}
        /> */}
        <RadioButton
          icon="email"
          color="white"
          title="Send OTP via Email"
          value={email}
          onPress={() => setActive("email")}
          onChangeText={setEmail}
          active={active === "email"}
        />
      </View>
      <SharedButton loading={isLoading}  onPress={navHandler} text={isLoading ? `Sending...` : `Send OTP`} />
      {isMessage && (
        <SharedMessage
          isOpen={isMessage}
          onClose={confirmHandler}
          onConfirm={confirmHandler}
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
export default ForgotPassword;
