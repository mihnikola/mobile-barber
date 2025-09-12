import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React from "react";

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
      {props.loading && <ActivityIndicator size={25} color="white" />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnTextDisabled: {
    color: "#3f3f3fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  btnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  btnDisabled: {
    borderColor: "grey",
    backgroundColor: "#8b8b8bff",
    color: "#3f3f3fff",
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
