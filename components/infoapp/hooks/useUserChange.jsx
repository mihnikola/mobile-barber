import { useLocalization } from "@/context/LocalizationContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useState } from "react";
import * as FileSystem from "expo-file-system/legacy";
import { Alert } from "react-native";
import { useAuth } from "@/context/AuthContext";
import { usersApi } from "@/lib/api/services";

const useUserChange = () => {
  const [isLoadingChange, setIsLoadingChange] = useState(false);
  const [errorChange, setErrorChange] = useState(null);
  const [message, setMessage] = useState(null);
  const [isMessage, setIsMessage] = useState(false);
  const { localization } = useLocalization();
  const { isToken } = useAuth();

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
      const response = await usersApi.update(isToken,  formData);
      setIsMessage(true);

      if (response.status === 201) {
        setMessage(localization.SETTINGS.PROFILE.messageConfirm);
      } else {
        setMessage(localization.SETTINGS.ERROR.imageError);
      }
    } catch (error) {
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
