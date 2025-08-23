import {
  View,
  StyleSheet,
  TextInput,
  Text,
  StatusBar,
  ScrollView,
} from "react-native";
import ImageCompress from "@/shared-components/ImageCompress";
import useUser from "@/components/infoapp/hooks/useUser";
import Loader from "@/components/Loader";
import useUserChange from "@/components/infoapp/hooks/useUserChange";
import usePhoneNumber from "@/components/infoapp/hooks/usePhoneNumber";
import useName from "@/components/infoapp/hooks/useName";
import { useCallback, useEffect, useState } from "react";
import SharedInput from "@/shared-components/SharedInput";
import { SharedMessage } from "@/shared-components/SharedMessage";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import SharedButton from "@/shared-components/SharedButton";
import SharedPhoneNumber from "@/shared-components/SharedPhoneNumber";

const userprofile = () => {
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
        phoneNumber !== userData?.phoneNumber?.slice(4) ||
        name !== userData?.name ||
        changedImg !== userData?.image
      ) {
        return true;
      } else {
        return false;
      }
    }
  };


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
    router.push("(tabs)/(04_settings)");
  };

  const submitChanges = () => {

    const data = {
      phoneNumber: phoneNumber !== userData?.phoneNumber?.slice(4) &&  phoneNumber !== userData?.phoneNumber &&   phoneNumber !== null &&  phoneNumber !== "null"
         ? "+381" + phoneNumber
          : null,
      name: name !== userData?.name ? name : null,
      image: changedImg === userData?.image ? null : changedImg,
    };
    handleChangeUser(data);
  };

  const messageHandler2 = () => {
    setIsMessage(false);
  };
  if (!isLoading) {
    return (
      <ScrollView style={styles.container}>
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
            <SharedPhoneNumber
              label="Phone Number"
              placeholder="6x xxx xxxx"
              placeholderTextColor="#888"
              keyboardType="phone-pad"
              dataDetectorTypes="phoneNumber"
              value={
                phoneNumber !== null
                  ? phoneNumber
                  : userData?.phoneNumber === null ? "" : userData?.phoneNumber?.slice(4)
              }
              onChangeText={handlePhoneNumberChange}
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

          <SharedButton
            disabled={!isValidated}
            onPress={submitChanges}
            text={isLoadingChange ? `Submiting...` : `Submit`}
          />
        </View>
        {isMessage && (
          <SharedMessage
            isOpen={isMessage}
            onClose={!errorChange ? messageHandler : messageHandler2}
            onConfirm={!errorChange ? messageHandler : messageHandler2}
            icon={
              <FontAwesome
                name={errorChange ? "close" : "check-circle-o"} // The specific FontAwesome icon to use
                size={64} // Size of the icon
                color="white" // Corresponds to text-blue-500
              />
            }
            title={errorChange || message} // Title of the modal
            buttonText="Ok" // Text for the action button
          />
        )}
        <StatusBar backgroundColor="black" />
      </ScrollView>
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
    // height: 50,
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#333", // Default border color
    paddingHorizontal: 10, // Padding inside the combined input area
  },
  phoneNumberInput: {
    backgroundColor: "white", // Dark input background
    color: "black",
    padding: 15,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 2,
    borderColor: "white",
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
    flex:1,
    flexDirection: "column",
  },
  textInput: {
    marginBottom: 10,
    borderBottomWidth: 1,
    backgroundColor: "white",
    padding: 10,
  },
  imageContainer: {
    flex: 1,
    alignItems: "center",
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
