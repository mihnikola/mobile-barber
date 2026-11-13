import { View } from "react-native";
import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useCompany } from "@/context/CompanyContext";
import { useTheme } from "@/theme";
import BrandLogo from "@/components/layout/BrandLogo";

const SplashScreen = () => {
  const { colors } = useTheme();
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
        backgroundColor: colors.bg,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* brand mark (gentleman: logo 280 px wide, tinted ink; atelier: typographic wordmark) */}
      <BrandLogo height={Math.round(280 * (698 / 756))} />
    </View>
  );
};

export default SplashScreen;
