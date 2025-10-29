import { useLocalization } from "@/context/LocalizationContext";
import React from "react";
import {
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
const CustomGoogleButton = ({ onPress, isGoogleLoading }) => {
  const { localization } = useLocalization();
  return (
    <>
      {isGoogleLoading && (
        <TouchableOpacity style={styles.button}>
          <ActivityIndicator size={25} color="white" />
        </TouchableOpacity>
      )}
      {!isGoogleLoading && (
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Image
            source={require("@/assets/images/googleg_64dp.png")}
            style={styles.icon}
            resizeMode="contain"
          />

          <Text style={styles.buttonText}>{localization.GOOGLE_BTN.label}</Text>
        </TouchableOpacity>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#424242",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
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
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default CustomGoogleButton;
