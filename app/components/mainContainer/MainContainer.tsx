import React, { useContext, useEffect } from "react";
import { BooleanContext } from "@/context/BooleanContext";
import { Stack } from "expo-router";
import { NavigationIndependentTree } from "@react-navigation/native";
import OnboardingScreen from "../initalComponents/InitialComponent";
import { StatusBar } from "react-native";

const MainContainer = () => {
  const { initialToken, getInitialTokenData, getTokenData, isToken } =
    useContext(BooleanContext);

  useEffect(() => {
    if (initialToken) {
      getTokenData();
    }
  }, [initialToken, isToken]);

  useEffect(() => {
    getInitialTokenData();
  }, []);

  return (
    <NavigationIndependentTree>
      {!initialToken && <OnboardingScreen />}
      {initialToken && (
        <Stack>
          <StatusBar backgroundColor="black" />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
          <Stack.Screen
            name="components/services/index"
            options={{ title: "",headerShown: false }}
          />
          <Stack.Screen
            name="components/login/index"
            options={{ title: "", headerShown: false }}
          />
          <Stack.Screen
            name="components/register/index"
            options={{ title: "", headerShown: false }}
          />
          <Stack.Screen
            name="components/reservation/index"
            options={{ title: "", headerShown: false }}
          />
          <Stack.Screen
            name="components/reservation/datereservation"
            options={{ title: "", headerShown: false }}
          />
          <Stack.Screen
            name="components/reservation/makereservation"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="components/reservation/reservationdetails"
            options={{ title: "", headerShown: false }}
          />
          <Stack.Screen
            name="components/infoapp/userprofile"
            options={{ title: "", headerShown: false }}
          />
          <Stack.Screen
            name="components/infoapp/aboutapplication"
            options={{ title: "", headerShown: false }}
          />
          <Stack.Screen
            name="components/infoapp/privacypolicy"
            options={{ title: "", headerShown: false }}
          />
        </Stack>
      )}
    </NavigationIndependentTree>
  );
};

export default MainContainer;
