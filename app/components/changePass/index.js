import {
  View,
  Text,
  TextInput,
  StatusBar,
  StyleSheet,
  Platform,
  TouchableOpacity,
  BackHandler,
} from "react-native";
import { ScrollView } from "react-native";
import { Image } from "react-native";
import SharedButton from "@/shared-components/SharedButton";
import usePassword from "./hooks/usePassword";
import useConfirmPassword from "./hooks/useConfirmPassword";
import { useNavigation, useRoute } from "@react-navigation/native";
import useChangePasswordHandler from "./hooks/useChangePasswordHandler";
import { useEffect } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { SharedMessage } from "@/shared-components/SharedMessage";

const changePass = () => {
  const navigation = useNavigation();
  const route = useRoute(); // Get the route object
  const { data } = route.params;

  const {
    password,
    passwordError,
    handlePasswordChange,
    isPasswordVisible,
    setIsPasswordVisible,
  } = usePassword();
  const {
    confirmPassword,
    handleConfirmPasswordChange,
    isPasswordConfirmVisible,
    setIsPasswordConfirmVisible,
  } = useConfirmPassword(password);

  const { handlePatchUser, message, isMessage, setIsMessage, error, isLoading } =
    useChangePasswordHandler();
  const submitChanges = () => {
    
    handlePatchUser(data, password,confirmPassword);
  };

  function handleBackButtonClick3() {
    navigation.navigate("components/login/index");
    return true;
  }
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick3);
    return () => {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackButtonClick3
      );
    };
  }, []);

  const confirmHandler = () => {
    setIsMessage(false);
    navigation.navigate("components/login/index");
  };
  const confirmHandler2 = () => {
    setIsMessage(false);
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar backgroundColor="black" barStyle="dark-content" />
      <View>
        <Text style={styles.mainTitle}>Enter New Password</Text>
      </View>

      <View style={styles.textinputContainer}>
        <Text style={{ color: "white", fontSize: 14, marginTop: 10 }}>
          Password
        </Text>
        <View style={styles.passContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Enter a new password"
            placeholderTextColor="grey"
            onChangeText={handlePasswordChange}
            value={password}
            secureTextEntry={!isPasswordVisible}
          />
          <TouchableOpacity
            onPress={() => setIsPasswordVisible((prev) => !prev)}
            style={styles.icon}
          >
            <Text style={{ color: "#888" }}>
              {isPasswordVisible ? "Hide" : "Show"}
            </Text>
          </TouchableOpacity>
        </View>
        {password.length > 0 && passwordError && (
          <Text style={{ color: "red" }}>{passwordError}</Text>
        )}
        <Text style={{ color: "white", fontSize: 14, marginTop: 10 }}>
          Re-Enter Password
        </Text>

        <View style={styles.passContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Confirm a new password"
            placeholderTextColor="grey"
            onChangeText={handleConfirmPasswordChange}
            value={confirmPassword}
            secureTextEntry={!isPasswordConfirmVisible}
          />
          <TouchableOpacity
            onPress={() => setIsPasswordConfirmVisible((prev) => !prev)}
            style={styles.icon}
          >
            <Text style={{ color: "#888" }}>
              {isPasswordConfirmVisible ? "Hide" : "Show"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.imageContainer}>
        <Image
          source={require("../../../assets/images/fgtPass.png")}
          style={styles.image}
        />
      </View>

      <View style={styles.btnFooter}>
        <SharedButton text={isLoading ? "Submitting...":"Submit"} disabled={isLoading} onPress={submitChanges} />
      </View>
      {isMessage && (
        <SharedMessage
          isOpen={isMessage}
          onClose={!error ? confirmHandler : confirmHandler2}
          onConfirm={!error ? confirmHandler : confirmHandler2}
          icon={
            <FontAwesome
              name={error ? "close" : "check-circle-o"} // The specific FontAwesome icon to use
              size={64} // Size of the icon
              color="white" // Corresponds to text-blue-500
            />
          }
          title={error || message} // Title of the modal
          buttonText="Ok" // Text for the action button
        />
      )}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  passContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    alignItems: "center",
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  textinputContainer: {
    display: "flex",
    gap: 10,
  },
  btnFooter: {
    marginVertical: 10,
  },
  icon: {
    paddingHorizontal: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 5,
    padding: 15,
    flex: 1,
    paddingVertical: 10,
    color: "#000",
  },
  imageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },

  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#0A0B0E",
    paddingTop: Platform.OS === "android" ? 20 : 0,
  },
  image: {
    width: 290,
    height: 290,
    resizeMode: "cover",
  },
  mainTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginVertical: 20,
  },
  subtitle: {
    fontSize: 13,
    color: "#ccc",
  },
});
export default changePass;
