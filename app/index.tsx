import { Image, View } from "react-native";
import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useCompany } from "@/context/CompanyContext";
import { ColorsBarber } from "@/constants/Colors";

const SplashScreen = () => {
  const { getCompany } = useCompany();

  const getInitialTokenData = async () => {
    const result = await AsyncStorage.getItem("initialToken");
    setTimeout(() => {
      router.replace(result === "true" ? "/(tabs)/(01_home)" : "introScreen");
    }, 3000);
  };

  useEffect(() => {
    getCompany();

    getInitialTokenData();
  }, []);

  return (
    <View
      style={{
        backgroundColor: ColorsBarber.light.background,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image
        source={require("./../assets/images/logoFrizer.png")}
        style={{ resizeMode: "contain", width: 350 }}
      />
    </View>
  );
};

export default SplashScreen;
