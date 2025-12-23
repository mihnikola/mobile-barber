import { useLocalization } from "@/context/LocalizationContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useState, useCallback } from "react";

const useUserChange = () => {
  const [isLoadingChange, setIsLoadingChange] = useState(false);
  const [errorChange, setErrorChange] = useState(null);
  const [message, setMessage] = useState(null);
  const [isMessage, setIsMessage] = useState(false);
  const { localization } = useLocalization();

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

    const obj = Object.fromEntries(formData._parts);
    console.log("formData", obj);
    try {
      const storedToken = await AsyncStorage.getItem("token");
      const response = await axios.put(
        `${process.env.EXPO_PUBLIC_API_URL}users/${storedToken}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Axios might need this explicitly for FormData
          },
        }
      );
      console.log("resss", response.status);
      if (response.status >= 200 && response.status < 300) {
        setIsMessage(true);
        setMessage(localization.SETTINGS.PROFILE.messageConfirm);
      } else {
        setIsMessage(true);

        setMessage(localization.SETTINGS.ERROR.imageError);
      }
    } catch (error) {
      console.log("err", error);
      setIsMessage(true);
      setErrorChange(localization.SETTINGS.ERROR.label);
      setIsLoadingChange(false);
    } finally {
      setIsLoadingChange(false);
    }
  }, []);

  return {
    message,
    isLoadingChange,
    errorChange,
    setErrorChange,
    handleChangeUser,
    setIsMessage,
    isMessage,
  };
};

export default useUserChange;
