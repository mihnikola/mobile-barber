import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useState, useCallback } from "react";

const useUserChange = () => {
  const [isLoadingChange, setIsLoadingChange] = useState(false);
  const [errorChange, setErrorChange] = useState(null);
  const [message, setMessage] = useState(null);
  const [isMessage, setIsMessage] = useState(false);

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

      console.log("axios.put", response);
      if (response.status >= 200 && response.status < 300) {
        setIsMessage(true);
        console.log("res", response.data);

        setMessage(response.data.message);
      } else {
        setIsMessage(true);

        setMessage(
          `Upload failed: ${response.data.message || "Unknown error"}`
        );
      }
    } catch (error) {
      setIsMessage(true);
      setErrorChange(`Something Went Wrong, Please Try Again`);
      setIsLoadingChange(false);
    } finally {
      setIsLoadingChange(false);
    }
  }, []);

  return {
    message,
    isLoadingChange,
    errorChange,
    handleChangeUser,
    setIsMessage,
    isMessage,
  };
};

export default useUserChange;
