import { useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

const CheckChangeSignInUp = ({ check, title, link }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 100);
  }, []);

  if (!isLoading) {
    return (
      <View style={styles.containerRegister}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{title} </Text>
        </View>
        <View style={styles.textContainer}>
          <TouchableOpacity onPress={check}>
            <Text style={styles.linkText}>{link}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
};
const styles = StyleSheet.create({
  containerRegister: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    padding: 30,
  },

  textContainer: {
    alignItems: "center", // For centering the text on smaller screens
    flexDirection: "row", // Flex row for larger screens (equivalent to md:flex-row in Tailwind)
    justifyContent: "space-between",
    alignSelf: "center",
  },

  text: {
    color: "#6B7280", // Equivalent to text-neutral-500
    textAlign: "center", // Default alignment for smaller screens
    fontSize: 14,
  },
  linkText: {
    color: "white",
    textDecorationLine: "underline",
    cursor: "pointer", // While this doesn't do exactly the same thing as cursor:pointer in web, it works for touch events in React Native
  },
});

export default CheckChangeSignInUp;
