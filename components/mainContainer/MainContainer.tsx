import React, { useContext } from "react";
import { BooleanContext } from "@/context/BooleanContext";
import { Stack } from "expo-router";
import { NavigationIndependentTree } from "@react-navigation/native";
import InitialComponent from "../initalComponents/InitialComponent";
import { StatusBar } from "react-native";
import SplashScreen from "@/shared-components/SplashScreen";

const MainContainer = () => {
  const { initialToken, isLoading, addInitialTokenData } =
    useContext(BooleanContext);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <NavigationIndependentTree>
      {!initialToken && !isLoading && (
        <InitialComponent addToken={addInitialTokenData} />
      )}
      {initialToken && !isLoading && (
        <Stack screenOptions={{ headerShown: false }} />
      )}
    </NavigationIndependentTree>
  );
};

export default MainContainer;
