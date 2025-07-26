import { Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

const SharedButton = (props: any) => {
  return (
    <TouchableOpacity
      style={[styles.btn, props.disabled && styles.btnDisabled]}
      disabled={props.loading || props.disabled}
      onPress={props.onPress}
    >
      <Text style={styles.btnText}>
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
    borderColor: "grey",
    backgroundColor: "grey",
    color: 'black'
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
export default SharedButton;
