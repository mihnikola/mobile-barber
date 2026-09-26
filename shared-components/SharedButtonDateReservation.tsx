import { Text, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import React from "react";
import { ColorsBarber } from "@/constants/Colors";

const SharedButtonDateReservation = (props: any) => {
  return (
    <TouchableOpacity
      style={[styles.btn, props.disabled && styles.btnDisabled]}
      disabled={props.loading || props.disabled}
      onPress={props.onPress}
    >
      {!props.loading && <Text style={styles.btnText}>{props.text}</Text>}
      {props.loading && <ActivityIndicator size={25} color={ColorsBarber.light.textColor} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnText: {
   color: ColorsBarber.light.textColor,
    fontSize: 18,
    fontFamily: "OldStandard-Bold",
  },
  btnDisabled: {
    display: "none",
    borderColor: "grey",
    backgroundColor: "#8b8b8bff",
  },
  btn: {
    backgroundColor:  ColorsBarber.light.item,
    paddingVertical: 15,
    borderRadius: 8,
    borderColor: "white",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 30,
  },
});
export default SharedButtonDateReservation;
