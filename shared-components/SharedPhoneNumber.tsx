import { ColorsBarber } from "@/constants/Colors";
import { forwardRef, useState } from "react";
import { Image, StyleSheet, Text, TextInput, View } from "react-native";

const SharedPhoneNumber = forwardRef((props: any, ref) => {
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
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text style={styles.prefixText}>+381</Text>

          <TextInput
            {...props}
            ref={ref}
            style={styles.phoneNumberInput}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        </View>
      </View>
      {props.value && props.value?.length > 0 && props.error ? (
        <Text style={styles.errorText}>{props.error}</Text>
      ) : null}
    </>
  );
});
const styles = StyleSheet.create({
  prefixText: {
    color: ColorsBarber.light.textColor,
    fontFamily: "OldStandard-Regular",

    fontSize: 16,
    fontWeight: "medium", // Make prefix stand out
  },
  phoneNumberInputContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 8,
    borderColor: "#333",
  },
  phoneNumberInput: {
    backgroundColor: "white",
    color: ColorsBarber.light.textColor,
    paddingTop: 15,
    paddingBottom: 15,
    paddingRight: 15,
    paddingLeft: 5,
    borderRadius: 8,
    fontSize: 16,
    borderColor: "white",
    width: "70%",
    fontFamily: "OldStandard-Regular",
  },
  inputLabel: {
    color: ColorsBarber.light.inActiveTextColor,
    fontSize: 14,
    marginBottom: 8,
    fontFamily: "OldStandard-Bold",

    marginTop: 15,
  },
  errorText: {
    color: "red",
    fontFamily: "OldStandard-Regular",
  },
  textInputFocused: {
    borderColor: ColorsBarber.light.textColor,
    borderWidth: 2,
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
