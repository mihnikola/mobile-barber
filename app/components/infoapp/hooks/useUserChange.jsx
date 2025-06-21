import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useState, useCallback, useEffect } from "react";

const useUserChange = () => {
  const navigation = useNavigation();
  const [isLoadingChange, setIsLoadingChange] = useState(false);
  const [errorChange, setErrorChange] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (message) {
      setTimeout(() => {
        setMessage(null);
        navigation.navigate("(tabs)", { screen: "settings" });
      }, 3000);
    }
  }, [message]);

  const handleChangeUser = useCallback(async (userData) => {
    setIsLoadingChange(true);
    setErrorChange(null);

    const formData = new FormData();

    formData.append("name", userData?.name);
    formData.append("phoneNumber", userData?.phoneNumber);
    if (userData?.image) {
      const filename = userData?.image.split("/").pop();
      const fileType =
        filename.split(".").pop() === "png"
          ? "image/png"
          : filename.split(".").pop() === "jpg"
          ? "image/jpg"
          : "image/jpeg";
      formData.append("image", {
        uri: userData?.image,
        name: filename,
        type: fileType,
      });
    }
    console.log("formData", formData);
    try {
      const storedToken = await AsyncStorage.getItem("token");
      const response = await axios.put(
        `${process.env.EXPO_PUBLIC_API_URL}/users/${storedToken}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Axios might need this explicitly for FormData, depending on setup
          },
        }
      );

      if (response.status >= 200 && response.status < 300) {
        setMessage(response.data.message);
      } else {
        setMessage(
          `Upload failed: ${response.data.message || "Unknown error"}`
        );
      }
    } catch (error) {
      console.log("error++++", error);
      if (err.message.includes("404")) {
        setErrorChange(`Not found endpoint`);
      } else {
        setErrorChange(`Something Went Wrong, Please Try Again`);
      }
      setIsLoadingChange(false);
    } finally {
      setIsLoadingChange(false);
    }
  }, []);

  return { message, isLoadingChange, errorChange, handleChangeUser };
};

export default useUserChange;
