import {
  ActivityIndicator,
  BackHandler,
  Dimensions,
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
import SharedPassword from "@/shared-components/SharedPassword";
const { width } = Dimensions.get("window");
import { GoogleSigninButton } from "@react-native-google-signin/google-signin";
import { useAuth } from "@/context/AuthContext";
import { useLocalization } from "@/context/LocalizationContext";
import SharedLogin from "@/shared-components/SharedLogin";
import { useCompany } from "@/context/CompanyContext";
import CustomGoogleButton from "../home/CustomGoogleButton";
import { useEffect, useState } from "react";
import { AppleButton, appleAuth } from '@invertase/react-native-apple-authentication';

const LoginScreen = () => {
  const { data } = useLocalSearchParams();

  const { email, handleEmailChange } = useEmail();
  const { password, handlePasswordChange } = usePassword();
  const [userApple, setUserApple] = useState(null);

  const { localization } = useLocalization();
//dobijanje podataka prvi put appleId sign in
//   {
//   "authorizationCode": "ce7f5698ecaa14259b86dd629d8a6e2b5.0.sttw.bYmnr1A4M55RmQwkK1BMJw",
//   "authorizedScopes": [],
//   "email": "blagoje.vukovic93@gmail.com",
//   "fullName": {
//     "familyName": "Vukovic",
//     "givenName": "Blagoje",
//     "middleName": null,
//     "namePrefix": null,
//     "nameSuffix": null,
//     "nickname": null
//   },
//   "identityToken": "eyJraWQiOiJiRnd6bGVSOHRmIiwiYWxnIjoiUlMyNTYifQ.eyJpc3MiOiJodHRwczovL2FwcGxlaWQuYXBwbGUuY29tIiwiYXVkIjoiZnRhLmJhcmJlci5hcHAiLCJleHAiOjE3NjU0NjE0NDAsImlhdCI6MTc2NTM3NTA0MCwic3ViIjoiMDAwMzM2LmI1NDM4NmIxYmY3ODQ1OGI4MGM1ODBiNzUyOTU4NGMxLjEyNTIiLCJub25jZSI6IjQxZjI4YzM1MTMwZDA1N2Y3YWRkOTVjYjQxZjg2YmRhMDNhMWY1MjcwNTkzZTZlZGUzYWRmOTVmMGIwMWQ2N2UiLCJjX2hhc2giOiJmS3g1UlpITjM5UEI4alFxZzJzOWtBIiwiZW1haWwiOiJibGFnb2plLnZ1a292aWM5M0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXV0aF90aW1lIjoxNzY1Mzc1MDQwLCJub25jZV9zdXBwb3J0ZWQiOnRydWUsInJlYWxfdXNlcl9zdGF0dXMiOjJ9.XGmNsJjb7emRiLdWKmCRfJEdvIq86nOGPJI8oLbeto87-wG95atXHd7UftstYMf-8E0EbSdeS540qCydxGMEr_TL56OkTzOK1n6Turm6rGA1xhyTYWxYEP_s0nhSGGfOEEtsx9sq1btR8TPyS0rlRx86TCuw5coPhTpYhKAGn5x2-2PZFFffcfKcG6I9oi5arNrp4x_3GhCAJRcrTtS_oNsjBOWT-gOs4Ax8gIYP4BpJyyJOaXqUyVVUQiQXxqjlCR1Nfo3q5Gsow2deYdfJjZnWNFWfAPKrX8ukzZc9JjHGwIyoo9B99p-ZiukAl5UaSAFhDr5SPehXFDIH_747jQ",
//   "nonce": "g81miG2o9AZZiObkny7eZhLXVg-Cyhzx",
//   "realUserStatus": 2,
//   "state": null,
//   "user": "000336.b54386b1bf78458b80c580b7529584c1.1252"
// }
//cilj je da se napravi logika kad ima sve podatke i kad nema 
//odnosno kad treba na BE da se jwtcode i odatle nadje email



  const {
    isLoadingLogin,
    setIsMessage,
    isMessage,
    error,
    login,
    success,
    status,
    verificationOTPCode,
    message,
    isGoogleLoading,
    signIn,
    signInIos
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
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const navigateToRegister = () => {
    router.push({
      pathname: "(z_auth)/register",
      params: { image: company?.media?.logo },
    });
  };

  const cancelHandler = async () => {
    setIsMessage(false);
  };
  const confirmHandler = async () => {
    if (status === 606) {
      verificationOTPCode();
    } else {
      setIsMessage(false);
      redirectValidation();
    }
  };

  const redirectValidation = () => {
    if (data === "calendar") {
      router.push({
        pathname: "/(tabs)/(02_barbers)/calendar",
        params: { reevaluted: true },
      });
    } else if (data === "appointments") {
      router.push({
        pathname: "/(tabs)/(03_calendar)",
        params: { reevaluted: true },
      });
    } else if (data === "settings") {
      router.push({
        pathname: "/(tabs)/(04_settings)",
        params: { reevaluted: true },
      });
    } else {
      router.push({
        pathname: "/(tabs)/(01_home)",
        params: { reevaluted: true },
      });
    }
  };
  const forgotHandler = () => {
    router.push("/(z_auth)/forgotPass");
  };
async function onAppleButtonPress() {
  // Start the sign-in request
  const appleAuthRequestResponse = await appleAuth.performRequest({
    requestedOperation: appleAuth.Operation.LOGIN,
    // As per the FAQ of react-native-apple-authentication, the name should come first in the following array.
    // See: https://github.com/invertase/react-native-apple-authentication#faqs
    requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
  });
  // Ensure Apple returned a user identityToken
  if (!appleAuthRequestResponse.identityToken) {
    throw new Error('Apple Sign-In failed - no identify token returned');
  }

  console.log("authToken", appleAuthRequestResponse)

  // const userData = {
  //   email: appleAuthRequestResponse?.email,
  //   fullName: appleAuthRequestResponse?.fullName,
  //   user: appleAuthRequestResponse?.user
  // }
  // signInIos(userData, appleAuthRequestResponse.identityToken);

}

  return (
    <ScrollView style={styles.safeArea}>
      <StatusBar backgroundColor="black" barStyle="dark-content" />
      <View style={styles.container}>
        <SharedLogin image={company?.media?.logo} />

        <Text style={styles.mainTitle}>{localization.LOGIN.title}</Text>
        <Text style={styles.subtitle}>{localization.LOGIN.description}</Text>

        <View style={styles.socialButtonsContainer}>
          <View style={{ flex: 1, justifyContent: "center" }}>
            <CustomGoogleButton
              onPress={signIn}
              isGoogleLoading={isGoogleLoading}
            />
              <AppleButton
        buttonStyle={AppleButton.Style.WHITE}
        buttonType={AppleButton.Type.SIGN_IN}
        style={{
          width: 160, // You must specify a width
          height: 45, // You must specify a height
        }}
        onPress={() => onAppleButtonPress()}
      />
          </View>
        </View>

        <View style={styles.dividerContainer}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>{localization.LOGIN.or}</Text>
          <View style={styles.dividerLine} />
        </View>

        <SharedInput
          label={localization.EMAIL.label}
          value={email}
          onChangeText={handleEmailChange}
          placeholder={localization.EMAIL.placeholder}
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
        />

        <SharedPassword
          label={localization.PASSWORD.label}
          value={password}
          onChangeText={handlePasswordChange}
          placeholder={localization.PASSWORD.placeholder}
        />

        <TouchableOpacity onPress={forgotHandler} style={{ paddingTop: 20 }}>
          <Text style={{ color: "white", textAlign: "right" }}>
            {localization.LOGIN.forgot}
          </Text>
        </TouchableOpacity>

        <SharedButton
          loading={isLoadingLogin}
          onPress={handleLogin}
          text={localization.LOGIN.submitBtn}
        />

        <SharedRedirect
          onPress={navigateToRegister}
          question={localization.LOGIN.question}
          text={localization.LOGIN.CTA}
        />
        {isMessage && (
          <SharedMessage
            isOpen={isMessage}
            onClose={!error ? confirmHandler : cancelHandler}
            onConfirm={!error ? confirmHandler : cancelHandler}
            icon={
              <FontAwesome
                name={error ? "close" : success ? "check-circle-o" : "info"}
                size={64}
                color="white"
              />
            }
            title={error || success || message}
            buttonText={localization.OK.label}
          />
        )}
      </View>
    </ScrollView>
  );
};
export default LoginScreen;
const styles = StyleSheet.create({
  buttonGoogleIsLoading: {
    backgroundColor: "#4285A0",
    height: 58,
    width: "100%",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },

  safeArea: {
    paddingVertical: 10,
    flex: 1,
    backgroundColor: "black",
  },
  iconStyle: {
    width: 30,
    height: 30,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "black",
    paddingTop: Platform.OS === "android" ? 20 : 0,
  },
  logo: {
    width: 120,
    height: 100,
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
    backgroundColor: "#1C1C1E",
  },
  appleButton: {
    backgroundColor: "#1C1C1E",
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
    backgroundColor: "white",
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
    backgroundColor: "white",
    color: "black",
    padding: 15,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 2,
    borderColor: "white",
    width: "80%",
  },
});
