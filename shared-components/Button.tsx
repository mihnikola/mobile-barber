import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  GestureResponderEvent,
} from "react-native";

// Define the types for the props
interface FlatButtonProps {
  text: string;
  onPress: (event: GestureResponderEvent) => void;
}

const FlatButton: React.FC<FlatButtonProps> = ({ text, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={onPress ? false : true}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    display: "flex",
    justifyContent: "center",
    paddingVertical: 20,
    paddingHorizontal: 30,
    backgroundColor: "#1C1C1E",
    borderColor: "white", // Darker border when selected
    borderWidth: 1,
    borderRadius: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textTransform: "uppercase",
    fontStyle: "italic",
    fontSize: 23,
    textAlign: "center",
  },
});

export default FlatButton;
