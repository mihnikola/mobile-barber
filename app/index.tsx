import { Image, View } from "react-native";
import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useCompany } from "@/context/CompanyContext";
import { useTheme } from "@/theme";

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
      {/* white artwork tinted with the theme's ink (was invisible on light); 20% smaller than before (350 → 280) */}
      <Image
        source={require("./../assets/images/homeSplash.png")}
        style={{ resizeMode: "contain", width: 280, height: 280 * (698 / 756), tintColor: colors.ink }}
      />
    </View>
  );
};

export default SplashScreen;
