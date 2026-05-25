import { useLocalization } from "@/context/LocalizationContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useState } from "react";
import * as FileSystem from "expo-file-system/legacy";
import { Alert } from "react-native";

const useUserChange = () => {
  const [isLoadingChange, setIsLoadingChange] = useState(false);
  const [errorChange, setErrorChange] = useState(null);
  const [message, setMessage] = useState(null);
  const [isMessage, setIsMessage] = useState(false);
  const { localization } = useLocalization();

  const getFileUri = async (uri) => {
    // Ako je content:// → kopiraj u cache
    if (uri.startsWith("content://")) {
      const destPath = `${FileSystem.cacheDirectory}${Date.now()}.jpg`;
      await FileSystem.copyAsync({ from: uri, to: destPath });
      return destPath;
    }
    // Ako je file:// → vrati direkt
    return uri;
  };
  const handleChangeUser = async (userData) => {
    setIsLoadingChange(true);
    setErrorChange(null);

    const formData = new FormData();
    formData.append("name", userData?.name);
    formData.append("phoneNumber", userData?.phoneNumber);

    if (userData?.image) {
      const imageUri = await getFileUri(userData.image);

      const filename = imageUri.split("/").pop();
      const ext = filename?.split(".").pop()?.toLowerCase();

      let fileType = "image/jpeg";
      if (ext === "png") fileType = "image/png";
      if (ext === "jpg" || ext === "jpeg") fileType = "image/jpeg";

      formData.append("image", {
        uri: imageUri,
        name: filename,
        type: fileType,
      });
    }

    try {
      const storedToken = await AsyncStorage.getItem("token");

      const baseUrl = process.env.EXPO_PUBLIC_API_URL.replace(/\/$/, "");
      const apiUrl = `${baseUrl}/users/${storedToken}`;
      const response = await fetch(apiUrl, {
        method: "PUT",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setIsMessage(true);
        setMessage(localization.SETTINGS.PROFILE.messageConfirm);
      } else {
        setIsMessage(true);
        setMessage(localization.SETTINGS.ERROR.imageError);
      }
    } catch (error) {
      setIsMessage(true);
      setErrorChange(localization.SETTINGS.ERROR.label);
    } finally {
      setIsLoadingChange(false);
    }
  };

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
