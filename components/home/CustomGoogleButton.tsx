import { useLocalization } from "@/context/LocalizationContext";
import React from "react";
import { TouchableOpacity, Text, Image, View, StyleSheet } from "react-native";

const CustomGoogleButton = ({ onPress, style }) => {
  const { localization } = useLocalization();
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.content}>
        <Image
          source={require("@/assets/images/googleg_64dp.png")}
          style={styles.icon}
        />

        <Text style={styles.text}>{localization.GOOGLE_BTN.label}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#4285A0",
    height: 58,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: 30,
    height: 30,
    marginHorizontal: 10,
  },
  text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
});

export default CustomGoogleButton;
