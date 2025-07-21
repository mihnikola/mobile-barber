import React, { useContext, useEffect, useState } from "react";
import { BooleanContext } from "@/context/BooleanContext";
import { Stack } from "expo-router";
import { NavigationIndependentTree } from "@react-navigation/native";
import InitialComponent from "../initalComponents/InitialComponent";
import { StatusBar } from "react-native";
import SplashScreen from "@/shared-components/SplashScreen";

const MainContainer = () => {
  const {
    initialToken,
    getInitialTokenData,
    getTokenData,
    isToken,
    addInitialTokenData,
  } = useContext(BooleanContext);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getTokenData();
    setIsLoading(false);
  }, [initialToken, isToken]);

  useEffect(() => {
    setTimeout(async () => {
      try {
        const x = await getInitialTokenData();
      } catch (e) {}
    }, 1000);
  }, [initialToken]);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <NavigationIndependentTree>
      {!initialToken && !isLoading && (
        <InitialComponent addToken={addInitialTokenData} />
      )}
      {initialToken && !isLoading && (
        <Stack>
          <StatusBar backgroundColor="black" />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
          <Stack.Screen
            name="components/services/index"
            options={{ title: "", headerShown: false }}
          />
          <Stack.Screen
            name="components/login/index"
            options={{ title: "", headerShown: false }}
          />
          <Stack.Screen
            name="components/forgotPass/index"
            options={{
              title: "",
              headerTintColor: "white", 
              headerStyle: {
                backgroundColor: "black",
              },
            }}
          />
           <Stack.Screen
            name="components/otpCode/index"
            options={{
              title: "",
              headerTintColor: "white", 
              headerStyle: {
                backgroundColor: "black",
              },
            }}
          />
          <Stack.Screen
            name="components/changePass/index"
            options={{
              title: "",
              headerTintColor: "white", 
              headerStyle: {
                backgroundColor: "black",
              },
            }}
          />
          <Stack.Screen
            name="components/register/index"
            options={{ title: "", headerShown: false }}
          />
          <Stack.Screen
            name="components/aboutUs/index"
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
