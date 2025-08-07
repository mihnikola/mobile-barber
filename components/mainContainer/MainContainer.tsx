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
        <Stack screenOptions={{ headerShown: false }}>
          <StatusBar backgroundColor="black" />
          <Stack.Screen
            name="(tabs)"
            options={{ title: "", headerShown: false }}
          />
          <Stack.Screen name="(02_barbers)" options={{ headerShown: false }} />

          {/* start auth */}
          <Stack.Screen
            name="components/login/index"
            options={{ title: "", headerShown: false }}
          />
          <Stack.Screen
            name="components/forgotPass/index"
            options={{
              title: "",
              headerStyle: {
                backgroundColor: "black", // Replace with your desired color
              },
              headerTintColor: "white", // This sets the color of the title text and back button arrow
            }}
          />
          <Stack.Screen
            name="components/register/index"
            options={{ title: "", headerShown: false }}
          />

          <Stack.Screen
            name="components/otpCode/index"
            options={{
              title: "",
              headerStyle: {
                backgroundColor: "black", // Replace with your desired color
              },
              headerTintColor: "white", // This sets the color of the title text and back button arrow
            }}
          />
          <Stack.Screen
            name="components/otpCodeRegister/index"
            options={{
              title: "",
              headerStyle: {
                backgroundColor: "black", // Replace with your desired color
              },
              headerTintColor: "white", // This sets the color of the title text and back button arrow
            }}
          />
          <Stack.Screen
            name="components/changePass/index"
            options={{
              title: "",
              headerShown: false,
            }}
          />
          {/* end auth */}

          <Stack.Screen
            name="components/aboutUs/index"
            options={{
              title: "",
              headerStyle: {
                backgroundColor: "black", // Replace with your desired color
              },
              headerTintColor: "white", // This sets the color of the title text and back button arrow
            }}
          />

          <Stack.Screen
            name="components/infoapp/helpSupport"
            options={{
              title: "",
              headerStyle: {
                backgroundColor: "black", // Replace with your desired color
              },
              headerTintColor: "white", // This sets the color of the title text and back button arrow
            }}
          />
          <Stack.Screen
            name="components/reservation/index"
            options={{ title: "", headerShown: false }}
          />
          <Stack.Screen
            name="components/reservation/makereservation"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="components/reservation/datereservation"
            options={{ headerShown: false }}
          />
         
          <Stack.Screen
            name="components/infoapp/userprofile"
            options={{ title: "", headerShown: false }}
          />
          <Stack.Screen
            name="components/infoapp/aboutapplication"
            options={{
              title: "",
              headerStyle: {
                backgroundColor: "black", // Replace with your desired color
              },
              headerTintColor: "white", // This sets the color of the title text and back button arrow
            }}
          />
          <Stack.Screen
            name="components/infoapp/privacypolicy"
            options={{
              title: "",
              headerStyle: {
                backgroundColor: "black", // Replace with your desired color
              },
              headerTintColor: "white", // This sets the color of the title text and back button arrow
            }}
          />
        </Stack>
      )}
    </NavigationIndependentTree>
  );
};

export default MainContainer;
