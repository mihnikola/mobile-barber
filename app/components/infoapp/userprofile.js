import {
  View,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  ScrollView,
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
import { IconSymbol } from "@/components/ui/IconSymbol";
import SharedInput from "@/shared-components/SharedInput";

const userprofile = () => {
  const navigation = useNavigation();

  const { userData, isLoading, error } = useUser();
  const {phoneNumber:pn} = userData;

  const [changedImg, setChangedImg] = useState(null);
  const { name, handleNameChange } = useName(userData?.name);
  const { message, isLoadingChange, errorChange, handleChangeUser } =
    useUserChange();
  const [isValidated, setIsValidated] = useState(false);
  const { phoneNumber, handlePhoneNumberChange, errorPhoneNumber } =
    usePhoneNumber(pn);



  useEffect(() => {
    setIsValidated(validationFields);
  }, [phoneNumber, name, changedImg]);

  const validationFields = () => {
    if (
      phoneNumber !== userData?.phoneNumber ||
      name !== userData?.name ||
      changedImg !== userData?.image
    ) {
      return true;
    } else {
      return false;
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

  const submitChanges = () => {
    const data = {
      phoneNumber,
      name,
      image: changedImg,
    };
    if (isValidPhoneNumber || phoneNumber.length === 0) {
      handleChangeUser(data);
    }
  };

  console.log("phoneNumber+++++++",phoneNumber)
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
              style={styles.input}
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
              value={phoneNumber}
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
              <Button disabled={!isValidated} color="black" title="Submit" />
            </View>
          )}
          {isValidated && (
            <TouchableOpacity onPress={submitChanges}>
              <View style={styles.button}>
                <Text
                  style={isValidated ? styles.buttonText : styles.unButtonText}
                >
                  {isLoadingChange ? "Submiting..." : "Submit"}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
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
  unbutton: {
    textAlign: "center",
    marginVertical: 30,
    backgroundColor: "black",
  },
  unButtonText: {
    color: "black",
    fontSize: 16,
    padding: 10,
    textAlign: "center",
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
