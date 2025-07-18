import {
  View,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  BackHandler,
  StatusBar,
  Button,
} from "react-native";
import ImageCompress from "../../../shared-components/ImageCompress";
import useUser from "./hooks/useUser";
import Loader from "@/components/Loader";
import useUserChange from "./hooks/useUserChange";
import usePhoneNumber from "./hooks/usePhoneNumber";
import useName from "./hooks/useName";
import { useCallback, useEffect, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import SharedInput from "@/shared-components/SharedInput";
import { SharedMessage } from "@/shared-components/SharedMessage";
import { FontAwesome } from "@expo/vector-icons";

const userprofile = () => {
  const navigation = useNavigation();

  const { userData, isLoading, error } = useUser();

  const [changedImg, setChangedImg] = useState(undefined);
  const { name, handleNameChange } = useName(userData?.name);
  const {
    message,
    isLoadingChange,
    errorChange,
    handleChangeUser,
    isMessage,
    setIsMessage,
  } = useUserChange();
  const [isValidated, setIsValidated] = useState(false);
  const { phoneNumber, isValid, handlePhoneNumberChange, errorPhoneNumber } =
    usePhoneNumber(userData?.phoneNumber);

  useEffect(() => {
    setIsValidated(validationFields);
  }, [phoneNumber, name, changedImg]);

  const validationFields = () => {
    if (!isValid) {
      return false;
    }

    if (phoneNumber === null) {
      if (name !== userData?.name || changedImg !== userData?.image) {
        return true;
      } else {
        return false;
      }
    }
    if (phoneNumber !== null) {
      if (
        phoneNumber !== userData?.phoneNumber ||
        name !== userData?.name ||
        changedImg !== userData?.image
      ) {
        return true;
      } else {
        return false;
      }
    }
  };
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        navigation.navigate("(tabs)", { screen: "settings" });
        return true;
      };
      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [])
  );

  if (isLoading) {
    return <Loader />;
  }

  const selectedImgHandler = (imgData) => {
    if (imgData) {
      setChangedImg(imgData);
    }
  };

  const messageHandler = () => {
    setIsMessage(false);
    navigation.navigate("(tabs)", { screen: "settings" });
  };

  const submitChanges = () => {
    const data = {
      phoneNumber: "+381" + phoneNumber || userData?.phoneNumber,
      name,
      image: changedImg,
    };

    handleChangeUser(data);
  };

  if (!isLoading) {
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <View style={styles.imageContainerImage}>
            <ImageCompress
              handlePickImage={selectedImgHandler}
              imageValue={userData?.image}
            />
          </View>
        </View>
        <View style={styles.userDataContainer}>
          <View>
            <Text style={styles.inputLabel}>Your Email</Text>
            <TextInput
              style={styles.inputDisabled}
              defaultValue={userData?.email}
              editable={false}
              selectTextOnFocus={false}
            />
          </View>
          <View>
            <SharedInput
              label="Phone Number"
              placeholder="6x xxx xxxx"
              placeholderTextColor="#888"
              keyboardType="phone-pad"
              dataDetectorTypes="phoneNumber"
              value={
                phoneNumber !== null
                  ? phoneNumber
                  : userData?.phoneNumber?.slice(4)
              }
              onChangeText={handlePhoneNumberChange}
              stylePassword={styles.phoneNumberInputContainer}
              style={styles.phoneNumberInput}
              autoComplete="tel"
              error={errorPhoneNumber}
            />
          </View>
          <View>
            <SharedInput
              label="Your Name"
              value={name}
              onChangeText={handleNameChange}
              placeholder="Enter your name"
              style={styles.input}
            />
          </View>

          {!isValidated && (
            <View style={styles.unbutton}>
              <Text style={styles.unButtonText}>Submit</Text>
            </View>
          )}
          {isValidated && (
            <TouchableOpacity onPress={submitChanges}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>
                  {isLoadingChange ? "Submiting..." : "Submit"}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
        {isMessage && (
          <SharedMessage
            isOpen={isMessage}
            onClose={messageHandler}
            onConfirm={messageHandler}
            icon={
              <FontAwesome
                name={error ? "close" : "check-circle-o"} // The specific FontAwesome icon to use
                size={64} // Size of the icon
                color="white" // Corresponds to text-blue-500
              />
            }
            title={message} // Title of the modal
            buttonText="Ok" // Text for the action button
          />
        )}
        <StatusBar backgroundColor="black" />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },

  inputLabel: {
    color: "#ccc",
    fontSize: 14,
    marginBottom: 8,
    marginTop: 15,
  },
  phoneNumberInputContainer: {
    flexDirection: "row", // Arrange children horizontally
    alignItems: "center", // Vertically align items in the center
    height: 50,
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#333", // Default border color
    paddingHorizontal: 10, // Padding inside the combined input area
  },
  phoneNumberInput: {
    flex: 1, // Take up remaining space
    height: "100%", // Make TextInput fill the height of the container
    color: "black",
    fontSize: 16,
    // No border or background here, handled by inputContainer
    padding: 0, // Remove default TextInput padding
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    padding: 10,
    textAlign: "center",
  },
  input: {
    backgroundColor: "white", // Dark input background
    color: "black",
    padding: 15,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 2,
    borderColor: "white",
  },
  inputDisabled: {
    backgroundColor: "grey", // Dark input background
    color: "black",
    padding: 15,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 2,
    borderColor: "white",
  },
  unbutton: {
    textAlign: "center",
    marginVertical: 30,
    backgroundColor: "black",
    padding: 10,
    borderWidth: 1,
    borderColor: "grey",
  },
  unButtonText: {
    color: "grey",
    fontSize: 16,
    padding: 10,
    textAlign: "center",
    backgroundColor: "black",
  },
  button: {
    padding: 5,
    backgroundColor: "black",
    borderColor: "white",
    borderWidth: 1,
    textAlign: "center",
    marginVertical: 60,
  },

  userDataContainer: {
    flex: 2,
    backgroundColor: "black",
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  imageContainerImage: {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    marginBottom: 10,
    borderBottomWidth: 1,
    backgroundColor: "white",
    padding: 10,
  },
  imageContainer: {
    flex: 1,
    backgroundColor: "black",
  },
  containerInfo: {
    marginTop: 20,
    flexDirection: "column",
    backgroundColor: "black",
    gap: 10,
  },
  headerImage: {
    width: "100%",
    height: 300,
    opacity: 0.3,
  },
  icon: {
    marginRight: 5,
    alignSelf: "flex-end",
  },
});

export default userprofile;
