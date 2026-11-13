// components/OtpInput.js
import React, { useRef } from "react";
import { View, TextInput } from "react-native";
import { fonts, makeStyles } from "@/theme";

const OtpInput = ({ code, setCode, maxLength = 6 }) => {
  const styles = useStyles();
  const inputs = useRef([]);

  const handleChange = (text, index) => {
    if (/^\d$/.test(text) || text === "") {
      const newCode = [...code];
      newCode[index] = text;
      setCode(newCode);

      if (text !== "" && index < maxLength - 1) {
        inputs.current[index + 1].focus();
      }

      if (text === "" && index > 0) {
        inputs.current[index - 1].focus();
      }
    }
  };

  return (
    <View style={styles.container}>
      {Array(maxLength)
        .fill(0)
        .map((_, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputs.current[index] = ref)}
            style={styles.input}
            keyboardType="number-pad"
            maxLength={1}
            onChangeText={(text) => handleChange(text, index)}
            value={code[index] || ""}
          />
        ))}
    </View>
  );
};

const useStyles = makeStyles((colors) => ({
  container: { flexDirection: "row", gap: 8, justifyContent: "center", marginVertical: 24 },
  input: {
    width: 48,
    height: 56,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: colors.lineStrong,
    backgroundColor: colors.surface,
    color: colors.ink,
    fontFamily: fonts.sansSemiBold,
    fontSize: 22,
    textAlign: "center",
  },
}));

export default OtpInput;
