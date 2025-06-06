import useLoginForm from "./hooks/useLoginForm";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { IconSymbol } from "@/components/ui/IconSymbol";
import usePassword from "../login/hooks/usePassword";
import useEmail from "../login/hooks/useEmail";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const navigation = useNavigation();
  const { email, emailError, handleEmailChange } = useEmail(); // Use useEmail
  const {
    password,
    handlePasswordChange,
    togglePasswordVisibility,
    isPasswordVisible,
  } = usePassword(); // Use useEmail
  const { pending, login } = useLoginForm();

  const handleLogin = () => {
    if (emailError) {
      return;
    }
    login(email, password);
  };

  const checka = () => {
    navigation.navigate("components/register/index");
  };
  return (
    <View style={styles.form} keyboardShouldPersistTaps="handled">
      <Image
        source={require("@/assets/images/logoImage.png")}
        style={styles.reactLogo}
      />
      <Text style={styles.title}>Sign In</Text>

      <TextInput
        placeholder="Enter your email"
        keyboardType="email-address"
        value={email}
        onChangeText={handleEmailChange}
        style={styles.textInput}
      />
      {email.length > 3 && emailError ? (
        <Text style={styles.errorText}>{emailError}</Text>
      ) : null}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={password}
          onChangeText={handlePasswordChange}
          placeholder="Enter your password"
          secureTextEntry={!isPasswordVisible} // If false, the password is visible
        />
        <TouchableOpacity
          onPress={togglePasswordVisibility}
          style={styles.iconContainer}
        >
          <IconSymbol
            name={isPasswordVisible ? "visible" : "not.visible"}
            size={25}
            color="gray"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={handleLogin} disabled={pending}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>
            {pending ? "Submitting..." : "Submit"}
          </Text>
        </View>
      </TouchableOpacity>
      <View style={styles.containerRegister}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Register </Text>
        </View>
        <View style={styles.textContainer}>
          <TouchableOpacity onPress={checka}>
            <Text style={styles.linkText}>here.</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <Text style={{ color: "white", textAlign: "center", fontSize: 16 }}>
          Sign in to see more features in app
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  errorText: {
    color: "red",
    marginTop: 10,
    textAlign: "center",
  },
  iconContainer: {
    position: "absolute",
    right: 10, // Aligns the icon to the right of the TextInput
    top: 10, // Centers the icon vertically inside the input
  },
  containerRegister: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    padding: 30,
  },
  form: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  title: {
    fontSize: 30,
    color: "#fff",
    marginBottom: 5,
    marginTop: 20,
    textAlign: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    padding: 10,
    textAlign: "center",
  },
  inputContainer: {
    position: "relative",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  button: {
    padding: 5,
    backgroundColor: "gray",
    borderColor: "#000",
    borderWidth: 1,
    textAlign: "center",
  },
  container: {
    marginTop: 10,
    flexDirection: "column", // This is similar to flex-col in Tailwind
    justifyContent: "space-between",
    gap: 10, // React Native doesn't have a gap utility like Tailwind, but you can achieve spacing using margin or padding
  },
  textContainer: {
    alignItems: "center", // For centering the text on smaller screens
    flexDirection: "row", // Flex row for larger screens (equivalent to md:flex-row in Tailwind)
    justifyContent: "space-between",
    alignSelf: "center",
  },
  textInput: {
    marginBottom: 10,
    borderBottomWidth: 1,
    backgroundColor: "white",
    padding: 10,
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
  reactLogo: {
    height: 220,
    width: 250,
    margin: "auto",
    marginTop: 40,
  },
});

export default LoginScreen;
