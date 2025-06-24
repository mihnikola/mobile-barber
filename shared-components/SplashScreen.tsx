import { View, StyleSheet, Text } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";
import { LinearGradient } from "expo-linear-gradient";

const SplashScreen = () => {
  return (
    <LinearGradient
      colors={["#404040", "#f0f0f0", "#000000"]} // Darker shades of grey to black
      style={styles.container}
    >
      <View style={{ height: 320, aspectRatio: 1 }}>
        <LottieView
          style={{ flex: 1, animationFillMode:"#000000" }}
          source={require("../assets/images/Animation - 1750340339988.json")}
          autoPlay
          loop
        />
      </View>
      <View>
        <Text
          style={{
            fontSize: 30,
            fontWeight: "900",
            fontStyle: "italic",
            textShadowColor: "rgba(255, 255, 255, 0.8)", // White color with 80% opacity
            textShadowOffset: { width: 0, height: 0 }, // No offset
            textShadowRadius: 8, // Blur radius
          }}
        >
          Family Barber Care
        </Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
  },
});

export default SplashScreen;
