import React, { useContext } from "react";
import { Stack } from "expo-router";
import { NavigationIndependentTree } from "@react-navigation/native";
import InitialComponent from "../initalComponents/InitialComponent";
import SplashScreen from "@/shared-components/SplashScreen";
import { AuthProvider, useAuth } from "@/context/AuthContext";

const MainContainer = () => {
  const { initialToken, isLoading, addInitialTokenData } = useAuth();

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <NavigationIndependentTree>
      {!initialToken && (
        <InitialComponent addToken={addInitialTokenData} />
      )}
      {initialToken && (
        <AuthProvider>
          <Stack initialRouteName="(tabs)" screenOptions={{ headerShown: false }} />
        </AuthProvider>
      )}
    </NavigationIndependentTree>
  );
};

export default MainContainer;
