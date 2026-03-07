import { useLocalization } from "@/context/LocalizationContext";
import React from "react";
import {
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

const CustomAppleButton = ({ onPress, isAppleLoading }) => {
  const { localization } = useLocalization();
  return (
    <>
      {isAppleLoading && (
        <TouchableOpacity style={styles.button}>
          <ActivityIndicator size={22} color="black" />
        </TouchableOpacity>
      )}
      {!isAppleLoading && (
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Image
            source={require("@/assets/images/apple.png")}
            style={styles.icon}
            resizeMode="contain"
          />

          <Text style={styles.buttonText}>{localization.APPLE_BTN.label}</Text>
        </TouchableOpacity>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#ffffffff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    paddingHorizontal: 24,
    borderRadius: 8,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    minWidth: 220,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  buttonText: {
    color: "#000000ff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default CustomAppleButton;
