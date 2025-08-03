import { Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

const SharedButtonDateReservation = (props: any) => {
  return (
    <TouchableOpacity
      style={[styles.btn, props.disabled && styles.btnDisabled]}
      disabled={props.loading || props.disabled}
      onPress={props.onPress}
    >
      <Text style={[styles.btnText]}>
        {props.loading ? "Loading..." : props.text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({

  btnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  btnDisabled:{
     display:"none",
    borderColor: "grey",
    backgroundColor: "#8b8b8bff",
    color: '#3f3f3fff'
  },
  btn: {
    backgroundColor: "#1C1C1E",
    paddingVertical: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "white",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 30,
  },
});
export default SharedButtonDateReservation;
