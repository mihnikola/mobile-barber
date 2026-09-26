import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { ColorsBarber } from "@/constants/Colors";

const SharedButton = (props: any) => {
  return (
    <TouchableOpacity
      style={[styles.btn, props.disabled && styles.btnDisabled]}
      disabled={props.loading || props.disabled}
      onPress={props.onPress}
    >
      {!props.loading && (
        <Text
          style={[styles.btnText, props.disabled && styles.btnTextDisabled]}
        >
          {props.text}
        </Text>
      )}
      {props.loading && (
        <ActivityIndicator size={25} color={ColorsBarber.light.textColor} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnText: {
    color: ColorsBarber.light.textColor,
    fontSize: 18,
    fontFamily: "OldStandard-Bold", // Ključ iz useFonts
  },
  btnDisabled: {
    borderColor: ColorsBarber.light.inActiveTextColor,
    backgroundColor: ColorsBarber.light.background,
    fontFamily: "OldStandard-Bold", // Ključ iz useFonts
  },
  btnTextDisabled: {
    color: ColorsBarber.light.textColor,
    fontSize: 18,
    fontFamily: "OldStandard-Bold",
  },

  btn: {
    backgroundColor: ColorsBarber.light.item,
    paddingVertical: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: ColorsBarber.light.textColor,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 30,
    minHeight: 50,
  },
});
export default SharedButton;
