import {
  View,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import ImageCompress from "../../../shared-components/ImageCompress";
import useUser from "./hooks/useUser";
import Loader from "@/components/Loader";
import useUserChange from "./hooks/useUserChange";
import { SuccessToast } from "toastify-react-native";
import usePhoneNumber from "./hooks/usePhoneNumber";
import useName from "./hooks/useName";
import { useState } from "react";

const userprofile = () => {
  const { userData, isLoading, error } = useUser();
  const { phoneNumber, handlePhoneNumberChange } = usePhoneNumber(
    userData?.phoneNumber
  );
  const [changedImg, setChangedImg] = useState(null);
  const { name, handleNameChange } = useName(userData?.name);
  const { message, isLoadingChange, errorChange, handleChangeUser } =
    useUserChange();

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
    console.log("submitChanges+++", data);

    handleChangeUser(data);
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
              style={styles.textInput}
              defaultValue={userData?.email}
              editable={false}
              selectTextOnFocus={false}
            />
          </View>
          <View>
            <TextInput
              style={styles.textInput}
              value={phoneNumber}
              onChangeText={handlePhoneNumberChange}
              placeholder="Enter your phone number"
              keyboardType="phone-pad" // or "numeric"
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

          <TouchableOpacity onPress={submitChanges}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Submit</Text>
            </View>
          </TouchableOpacity>
        </View>
        {message ? <SuccessToast text1={message} duration={1000}/> : null}
      </ScrollView>
    );
  }
};

const styles = StyleSheet.create({
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
