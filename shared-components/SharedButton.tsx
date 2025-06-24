import { Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

const SharedButton = (props: any) => {
  return (
    <TouchableOpacity
      style={styles.btn}
      disabled={props.loading}
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
  btn: {
    backgroundColor: "#2596be", // Blue login button
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 30,
  },
});
export default SharedButton;
