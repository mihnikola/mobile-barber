// import useUser from "./hooks/useUser";
import LoginScreen from "../login";
import SettingsComponent from "./SettingsComponent";
import { useEffect } from "react";
import { SharedLoader } from "@/shared-components/SharedLoader";
import { useAuth } from "@/context/AuthContext";
const SettingsProfileComponent = () => {
  const {
    isToken,
    isLoading,
    getTokenData,
    onPressHandler,
    logoutFromFIrebase,
    isMessage,
    setIsMessage,
    userData,
    fetchUserData,
  } = useAuth();

  useEffect(() => {
    getTokenData();
  }, []);
  useEffect(() => {
    if (isToken) {
      fetchUserData();
    }
  }, [isToken]);
  if (isLoading) {
    return <SharedLoader />;
  }
  if (!isToken && !isLoading) {
    return <LoginScreen getTokenData={getTokenData} />;
  }
  if (isToken && !isLoading) {
    return (
      <SettingsComponent
        logout={logoutFromFIrebase}
        onPressHandler={onPressHandler}
        isMessage={isMessage}
        setIsMessage={setIsMessage}
        userData={userData}
      />
    );
  }
};

export default SettingsProfileComponent;
