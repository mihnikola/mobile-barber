import { ColorsBarber } from "@/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { forwardRef, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const SharedConfirmPassword = forwardRef((props: any, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <>
      <Text style={styles.inputLabel}>{props.label}</Text>
      <View
        style={[
          styles.passwordInputContainer,
          isFocused && styles.textInputFocused,
        ]}
      >
        <TextInput
          {...props}
          style={styles.passwordInput}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={!isPasswordVisible}
          ref={ref}
          placeholderTextColor="grey"
        />

        <TouchableOpacity
          style={styles.passwordToggle}
          onPress={togglePasswordVisibility}
        >
          <FontAwesome
            name={isPasswordVisible ? "eye" : "eye-slash"}
            size={24}
            color="grey"
          />
        </TouchableOpacity>
      </View>
      {props.value.length > 0 && props.error ? (
        <Text style={styles.errorText}>{props.error}</Text>
      ) : null}
    </>
  );
});
const styles = StyleSheet.create({
  passwordInputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 8,

  },
  passwordInput: {
    backgroundColor: "white", // Dark input background
    color: ColorsBarber.light.textColor,
    fontFamily:"OldStandard-Regular",

    padding: 15,
    borderRadius: 8,
    fontSize: 16,
    borderColor: "white",
    width: "80%",
  },
  inputLabel: {
   color: ColorsBarber.light.textColor,
    fontSize: 14,
    marginTop: 15,
    marginBottom: 5,
    fontFamily:"OldStandard-Regular"

  },
  errorText: {
    color: "red",
    fontFamily:"OldStandard-Regular"
  },
  textInputFocused: {
    borderColor: ColorsBarber.light.textColor,
    fontFamily:"OldStandard-Regular",
    borderWidth: 2,


  },
  passwordToggle: {
    padding: 10,
  },
});

export default SharedConfirmPassword;
