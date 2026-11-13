import { ScrollView } from "react-native";
import MenuItemContainer from "./MenuItemContainer";
import ProfileUserComponent from "./ProfileUserComponent";
import LoginRedirect from "./LoginRedirect";
import { useAuth } from "@/context/AuthContext";
import { useLocalization } from "@/context/LocalizationContext";
import { router } from "expo-router";
import { useEffect } from "react";
import { useLastPathNavigation } from "@/context/NavigationContext";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { ConfirmDialog, Icon, Loader, withScreen } from "@/components/ui";
import { makeStyles } from "@/theme";
import { routes } from "@/lib/navigation/routes";

/** Settings menu item id → route (moved out of AuthContext in Phase 4b). "6" = logout dialog. */
const MENU_ROUTES = {
  1: routes.settings.userProfile,
  2: routes.settings.languageSupport,
  100: routes.settings.aboutApplication,
  200: routes.settings.privacyPolicy,
  900: routes.settings.helpSupport,
};

const SettingsComponent = () => {
  const styles = useStyles();
  const { localization } = useLocalization();
  const { saveLastTab } = useLastPathNavigation();

  const {
    logoutFirebase,
    userData,
    setIsLogout,
    loading,
    isLogout,
    getTokenData,
    setLoading,
    isToken,
    logoutHandler,
  } = useAuth();

  const onPressHandler = (data) => {
    if (data === "6") {
      setIsLogout(true);
      return;
    }
    const route = MENU_ROUTES[data];
    if (route) router.push(route);
  };

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

      } catch {
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
      pathname: routes.auth.login,
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
        <ConfirmDialog
          isOpen={isLogout}
          onClose={() => setIsLogout(false)}
          onConfirm={logoutConfirm}
          icon={
            <Icon name="question" size={64} color="ink" />
          }
          title={localization.SETTINGS.LOGOUT.question}
          confirmText={localization.SETTINGS.LOGOUT.title}
          cancelText={localization.SETTINGS.LOGOUT.cancel}
        />
      )}


      <Loader variant="overlay" visible={loading === "logout"} />
    </ScrollView>
  );
};
const useStyles = makeStyles((colors) => ({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    paddingTop: 20,
  },
}));

export default withScreen(SettingsComponent);
