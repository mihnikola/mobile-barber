import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Platform } from "react-native";
import SharedButton from "@/shared-components/SharedButton";
import useEmailOtpCode from "../changePass/hooks/useEmailOtpCode";
import { SharedMessage } from "@/shared-components/SharedMessage";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import SharedInput from "@/shared-components/SharedInput";
import useEmail from "./hooks/useEmail";
import { useLocalization } from "@/context/LocalizationContext";
import WrapperAuth from "../wrapperAuth/WrapperAuth";
import SharedBackButton from "@/shared-components/SharedBackButton";
import { router } from "expo-router";
import { ColorsBarber } from "@/constants/Colors";

const ForgotPassword = () => {
  const { email, emailError, handleEmailChange } = useEmail();

  const { localization } = useLocalization();

  const {
    checkEmailValidation,
    error,
    setError,
    isLoading,
    isMessage,
    setIsMessage,
  } = useEmailOtpCode();
  const navHandler = () => {
    checkEmailValidation(email);
  };

  const confirmHandler2 = () => {
    setIsMessage(false);
    setError(null);
  };
  return (
    <WrapperAuth>
      {/* <SharedBackButton
        onPress={router.back}
        absolutePosition={false}
        styleBtn={{ marginBottom: 30 }}
      /> */}

      <TouchableOpacity
        hitSlop={20}
        onPress={router.back}
        style={{ marginVertical: 15 }}
      >
        <MaterialIcons
          name="arrow-back"
          size={25}
          color={ColorsBarber.dark.textColor}
        />
      </TouchableOpacity>

      <View style={{ flex: 1 }}>
        <View>
          <Text style={styles.mainTitle}>
            {localization.FORGOT_PASSWORD.title}
          </Text>

          <Text style={styles.subtitle}>
            {localization.FORGOT_PASSWORD.subtitle}
          </Text>
        </View>
        <View style={{ marginTop: 10 }}>
          <SharedInput
            label={localization.EMAIL.label}
            value={email}
            onChangeText={handleEmailChange}
            placeholder={localization.EMAIL.placeholder}
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
            error={emailError}
          />
        </View>
      </View>

      <View style={{ marginBottom: 20 }}>
        <SharedButton
          disabled={emailError.length > 0 && email.length > 0}
          onPress={navHandler}
          loading={isLoading}
          text={localization.FORGOT_PASSWORD.submitBtn}
        />
      </View>

      {error && (
        <SharedMessage
          isOpen={isMessage || error}
          onClose={error && confirmHandler2}
          onConfirm={error && confirmHandler2}
          icon={
            <FontAwesome
              name="close"
              size={64}
              color={ColorsBarber.dark.textColor}
            />
          }
          title={error}
          buttonText={localization.OK.label}
        />
      )}
    </WrapperAuth>
  );
};
const styles = StyleSheet.create({
  mainTitle: {
    fontSize: 28,
    fontFamily: "OldStandard-Bold",
    color: ColorsBarber.dark.background,
    marginHorizontal: 10,
  },
  subtitle: {
    fontSize: 16,
    color: ColorsBarber.dark.inActiveTextColor,
    fontFamily: "OldStandard-Regular",

    lineHeight: 22,
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

  image: {
    resizeMode: "contain",
  },
  input: {
    backgroundColor: "white",
    color: ColorsBarber.dark.textColor,
    fontFamily: "OldStandard-Regular",

    padding: 15,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 2,
    borderColor: "white",
    paddingVertical: 15,
  },
  mainTitle: {
    fontSize: 22,
    fontFamily: "OldStandard-Bold",
    color: ColorsBarber.dark.textColor,
  },
});
export default ForgotPassword;
