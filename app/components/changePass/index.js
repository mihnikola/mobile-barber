import {
  View,
  Text,
  TextInput,
  StatusBar,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from "react-native";
import { ScrollView } from "react-native";
import { Image } from "react-native";
import SharedButton from "@/shared-components/SharedButton";
import usePassword from "./hooks/usePassword";
import useConfirmPassword from "./hooks/useConfirmPassword";

const changePass = () => {
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
  const submitChanges = () => {
    if(password !== confirmPassword){
        return;
    }

  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar backgroundColor="black" barStyle="dark-content" />
      <View>
        <Text style={styles.mainTitle}>Enter New Password</Text>
      </View>
      <View>
        <Text style={styles.subtitle}>Please enter new password</Text>
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
        <SharedButton text="Submit" onPress={submitChanges} />
      </View>
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
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 13,
    color: "#ccc",
  },
});
export default changePass;
