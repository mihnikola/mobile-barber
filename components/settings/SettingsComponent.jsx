import { ScrollView, StyleSheet } from "react-native";
import { SharedQuestion } from "@/shared-components/SharedQuestion";
import MenuItemContainer from "./MenuItemContainer";
import ProfileUserComponent from "./ProfileUserComponent";
import LoginRedirect from "./LoginRedirect";
import { useAuth } from "@/context/AuthContext";
import { useLocalization } from "@/context/LocalizationContext";
import { router } from "expo-router";
import { SharedLoader } from "@/shared-components/SharedLoader";
import { useEffect } from "react";
import { useLastPathNavigation } from "@/context/NavigationContext";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Icon, withScreen } from "@/components/ui";
import { colors } from "@/theme";

const SettingsComponent = () => {
  const { localization } = useLocalization();
  const { saveLastTab } = useLastPathNavigation();

  const {
    logoutFirebase,
    onPressHandler,
    userData,
    setIsLogout,
    loading,
    isLogout,
    getTokenData,
    setLoading,
    isToken,
    setError,
    logoutHandler,
  } = useAuth();

  useEffect(() => {
    getTokenData();
  }, []);

  const logoutConfirm = async () => {
    setIsLogout(false);
    setLoading("logout");
    saveLastTab(null);

    setTimeout(async () => {
      try {
        // 2. Čekamo da se završi kompletan API poziv i brisanje storage-a
        await logoutFirebase();

        console.log("logoutFirebase je završen, sada gasim loader...");
      } catch (error) {
        console.log("Greška tokom logout procesa:", error);
      } finally {
        // 3. TEK OVDE gasimo loader (unutar finally bloka, što garantuje
        // da će se izvršiti čak i ako server baci grešku)
        setLoading(null);

        setTimeout(() => {
          logoutHandler();
        }, 100);
      }
    }, 1000);
  };

  const redirectToLogin = () => {
    router.push({
      pathname: "/(z_auth)/",
    });
    AsyncStorage.setItem("paramLogin", "settings");
  };

  return (
    <ScrollView style={styles.container}>
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
            <Icon name="question" size={64} color="text" />
          }
          title={localization.SETTINGS.LOGOUT.question}
          buttonTextYes={localization.SETTINGS.LOGOUT.title}
          buttonTextNo={localization.SETTINGS.LOGOUT.cancel}
        />
      )}


      <SharedLoader isOpen={loading === "logout"} />
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 20,
  },
});

export default withScreen(SettingsComponent);
