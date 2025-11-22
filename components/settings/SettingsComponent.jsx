import { View, StyleSheet, StatusBar, Text } from "react-native";
import { SharedQuestion } from "@/shared-components/SharedQuestion";
import { FontAwesome } from "@expo/vector-icons";
import MenuItemContainer from "./MenuItemContainer";
import ProfileUserComponent from "./ProfileUserComponent";
import LoginRedirect from "./LoginRedirect";
import { useAuth } from "@/context/AuthContext";
import { useLocalization } from "@/context/LocalizationContext";
import { router } from "expo-router";
import { SharedLoader } from "@/shared-components/SharedLoader";
import Loader from "../Loader";
import { useEffect, useState } from "react";
import { SharedMessage } from "@/shared-components/SharedMessage";
import { removeStorage } from "@/helpers/token";

const SettingsComponent = () => {
  const { localization } = useLocalization();

  const {
    logoutFirebase,
    onPressHandler,
    userData,
    setIsLogout,
    isLogout,
    isLoading,
    isLoadingLogin,
    getTokenData,
    isToken,
    setError,
  } = useAuth();

  useEffect(() => {
    getTokenData();
  }, []);

  const [loader, setLoader] = useState(false);
  const [logoutData, setLogoutData] = useState(false);

  const logoutConfirm = async () => {
    setLoader(true);
    setIsLogout(false);
    const x = await logoutFirebase();
    setLoader(false);
  };

  if (loader) {
    return <SharedLoader />;
  }
  const redirectToLogin = () => {
    router.push({
      pathname: "/(z_auth)/login",
      params: { data: "settings" },
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="black" />
      {isToken ? (
        <ProfileUserComponent data={userData} onPress={onPressHandler} />
      ) : (
        <LoginRedirect
          onPress={redirectToLogin}
          title={localization.SETTINGS.clickHere}
        />
      )}
      <MenuItemContainer onPress={onPressHandler} isToken={isToken} />
      {isLogout && (
        <SharedQuestion
          isOpen={isLogout}
          onClose={() => setIsLogout(false)}
          onLogOut={logoutConfirm}
          icon={
            <FontAwesome name="question-circle-o" size={64} color="white" />
          }
          title={localization.SETTINGS.LOGOUT.question}
          buttonTextYes={localization.SETTINGS.LOGOUT.leave}
          buttonTextNo={localization.SETTINGS.LOGOUT.cancel}
        />
      )}
      {logoutData && (
        <SharedMessage
          buttonText="Odlogovani ste"
          isLoading={loader}
          icon={<FontAwesome name="check" size={64} color="white" />}
          onConfirm={() => setLogoutData(false)}
          isOpen={logoutData}
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
