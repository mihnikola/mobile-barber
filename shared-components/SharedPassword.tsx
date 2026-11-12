import { ColorsBarber } from "@/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { forwardRef, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { TouchableOpacity } from "./TouchableOpacity";
import { colors, fonts } from "@/theme";

const SharedPassword = forwardRef((props: any, ref) => {
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
          placeholderTextColor={ColorsBarber.dark.inActiveTextColor}
        />

        <TouchableOpacity
          style={styles.passwordToggle}
          onPress={togglePasswordVisibility}
        >
          <FontAwesome
            name={isPasswordVisible ? "eye" : "eye-slash"}
            size={24}
            color={colors.textMuted}
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
    backgroundColor: colors.white,
    borderRadius: 8,
  },
  passwordInput: {
    backgroundColor: colors.white,
    color: ColorsBarber.dark.textColorInput,
    padding: 15,
    borderRadius: 8,
    fontSize: 16,
    width: "80%",
    fontFamily: fonts.regular,
  },
  inputLabel: {
    color: ColorsBarber.dark.textColor,
    fontFamily: fonts.bold,
    fontSize: 14,
    marginTop: 20,
    marginBottom: 4,
  },
  errorText: {
    color: colors.danger,
    fontFamily: fonts.bold,
  },
  textInputFocused: {
    borderWidth: 2,

    borderColor: ColorsBarber.dark.textColor,
  },
  passwordToggle: {
    padding: 10,
  },
});

export default SharedPassword;
