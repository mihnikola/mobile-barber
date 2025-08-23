import { useState } from "react";
import { Image, StyleSheet, Text, TextInput, View } from "react-native";

const SharedPhoneNumber = (props: any) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <>
      <Text style={styles.inputLabel}>{props.label}</Text>

      <View
        style={[
          styles.phoneNumberInputContainer,
          isFocused && styles.textInputFocused,
        ]}
      >
        <Image
          source={require("../assets/images/serbiaFlag.png")}
          style={styles.flagIcon}
        />

        <Text style={styles.prefixText}>+381</Text>

        <TextInput
          {...props}
          style={styles.phoneNumberInput}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </View>
      {props.value && props.value?.length > 0 && props.error ? (
        <Text style={styles.errorText}>{props.error}</Text>
      ) : null}
    </>
  );
};
const styles = StyleSheet.create({
  prefixText: {
    color: "black",
    fontSize: 16,
    marginRight: 8,
    fontWeight: "medium", // Make prefix stand out
  },
  phoneNumberInputContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#333",
  },
  phoneNumberInput: {
    backgroundColor: "white", // Dark input background
    color: "black",
    padding: 15,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 2,
    borderColor: "white",
    width: "70%",
  },
  inputLabel: {
    color: "#ccc",
    fontSize: 14,
    marginBottom: 8,
    marginTop: 15,
  },
  errorText: {
    color: "red",
  },
  textInputFocused: {
    borderColor: "#2596be",
  },

  flagIcon: {
    width: 24, // Adjust size as needed
    height: 18, // Adjust size as needed, maintain aspect ratio
    marginRight: 8,
    marginLeft: 12,
    borderRadius: 2, // Slightly rounded corners for the flag
  },
});

export default SharedPhoneNumber;
