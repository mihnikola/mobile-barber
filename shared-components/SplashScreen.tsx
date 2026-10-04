import { Animated, Image, View } from "react-native";
import React, { useEffect, useRef } from "react";
import { ColorsBarber } from "@/constants/Colors";

const SplashScreen = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <View
      style={{
        backgroundColor: ColorsBarber.dark.background,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Animated.View
        style={{
          opacity: fadeAnim,
        }}
      >
        <Image
          source={require("./../assets/images/homeSplash.png")}
          style={{ resizeMode: "contain", width: 350 }}
        />
      </Animated.View>
    </View>
  );
};

export default SplashScreen;
