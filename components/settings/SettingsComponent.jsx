import { View, StyleSheet, StatusBar, Text } from "react-native";
import { SharedQuestion } from "@/shared-components/SharedQuestion";
import { FontAwesome } from "@expo/vector-icons";
import MenuItemContainer from "./MenuItemContainer";
import ProfileUserComponent from "./ProfileUserComponent";
import LoginRedirect from "./LoginRedirect";
import { useAuth } from "@/context/AuthContext";
import { useLocalization } from "@/context/LocalizationContext";
import { router } from "expo-router";

const SettingsComponent = () => {
  const { localization } = useLocalization();
  const {
    logoutFirebase,
    onPressHandler,
    isMessage,
    setIsMessage,
    userData,
    isToken
  } = useAuth();

  const redirectToLogin = () => {
    router.push("/(z_auth)/login")
  }



  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="black" />
      {isToken && <ProfileUserComponent data={userData} onPress={onPressHandler} />}
      {!isToken && <LoginRedirect onPress={redirectToLogin} title={localization.SETTINGS.clickHere} />}
      <MenuItemContainer onPress={onPressHandler} isToken={isToken} />
      {isMessage && (
        <SharedQuestion
          isOpen={isMessage}
          onClose={() => setIsMessage(false)}
          onLogOut={logoutFirebase}
          icon={
            <FontAwesome
              name="question-circle-o"
              size={64}
              color="white"
            />
          }
          title={localization.SETTINGS.LOGOUT.question}
          buttonTextYes={localization.SETTINGS.LOGOUT.leave}
          buttonTextNo={localization.SETTINGS.LOGOUT.cancel}
        />
      )}
    </View>
  );
};

export default SettingsComponent;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
});


