import {
  View,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  ScrollView,
  BackHandler,
} from "react-native";
import ImageCompress from "../../../shared-components/ImageCompress";
import useUser from "./hooks/useUser";
import Loader from "@/components/Loader";
import useUserChange from "./hooks/useUserChange";
import { SuccessToast } from "toastify-react-native";
import usePhoneNumber from "./hooks/usePhoneNumber";
import useName from "./hooks/useName";
import { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import { IconSymbol } from "@/components/ui/IconSymbol";

const userprofile = () => {
  const navigation = useNavigation();

  const { userData, isLoading, error } = useUser();
  const { phoneNumber, handlePhoneNumberChange, isValidPhoneNumber } =
    usePhoneNumber(userData?.phoneNumber);
  const [changedImg, setChangedImg] = useState(null);
  const { name, handleNameChange } = useName(userData?.name);
  const { message, isLoadingChange, errorChange, handleChangeUser } =
    useUserChange();
  const [isValidated, setIsValidated] = useState(false);

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
  if (!isLoading) {
    return (
      <ScrollView styles={styles.container}>
        <View>
          <View style={styles.imageContainer}>
            <Image
              source={require("@/assets/images/settingsImage.jpg")}
              style={styles.headerImage}
              resizeMode="cover"
            />
            <View style={styles.imageContainerImage}>
              <ImageCompress
                handlePickImage={selectedImgHandler}
                imageValue={userData?.image}
              />
            </View>
          </View>
        </View>
        <View style={styles.userDataContainer}>
          <View>
            <TextInput
              style={styles.textInputDisabled}
              defaultValue={userData?.email}
              editable={false}
              selectTextOnFocus={false}
            />
          </View>
          <View style={styles.phoneNumberContainer}>
            <TextInput
              style={styles.input}
              onChangeText={handlePhoneNumberChange}
              value={phoneNumber}
              placeholder="Enter phone number"
              keyboardType="phone-pad" // Suggests numeric keyboard
            />
            <IconSymbol
              style={styles.icon}
              name={
                isValidPhoneNumber
                  ? "ok"
                  : phoneNumber.length > 0
                  ? "error"
                  : null
              }
              size={30}
              color={
                isValidPhoneNumber
                  ? "rgb(0, 200, 160)"
                  : phoneNumber.length > 0
                  ? "rgb(201, 52, 33)"
                  : null
              }
            />
          </View>
          <View>
            <TextInput
              placeholder="Enter your name"
              value={name}
              onChangeText={handleNameChange}
              style={styles.textInput}
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
                <Text
                  style={isValidated ? styles.buttonText : styles.unButtonText}
                >
                  {isLoadingChange ? "Submiting..." : "Submit"}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
        {message ? <SuccessToast text1={message} duration={1000} /> : null}
      </ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  phoneNumberContainer: {
    backgroundColor: "white",
    flexDirection: "row",
  },
  icon: {
    marginRight: 5,
    alignSelf: "flex-end",
  },
  input: {
    color: "black",
    fontSize: 14,
    width: "90%",
    minWidth: '60%',
    alignSelf: "center",
    alignItems: "center",
    paddingBottom: 10
  },
  validInput: {
    borderColor: "green",
    marginBottom: 10,
    borderBottomWidth: 1,
    backgroundColor: "white",
    padding: 10,
  },
  unbutton: {
    padding: 5,
    backgroundColor: "gray",
    borderColor: "#000",
    borderWidth: 1,
    borderColor: "white",
    textAlign: "center",
  },
  unButtonText: {
    color: "black",
    fontSize: 16,
    padding: 10,
    textAlign: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    padding: 10,
    textAlign: "center",
  },
  button: {
    padding: 5,
    backgroundColor: "gray",
    borderColor: "#000",
    borderWidth: 1,
    textAlign: "center",
  },

  container: {
    width: "100%",
  },
  userDataContainer: {
    margin: 20,
    display: "flex",
    gap: 20,
    marginVertical: 20,
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
  textInputDisabled: {
    marginBottom: 10,
    borderBottomWidth: 1,
    backgroundColor: "gray",
    padding: 10,
  },
  imageContainer: {
    flex: 1,
  },
  containerInfo: {
    marginTop: 20,
    flexDirection: "column",
    gap: 10,
  },
  headerImage: {
    width: "100%",
    height: 300,
    opacity: 0.3,
  },
});

export default userprofile;
