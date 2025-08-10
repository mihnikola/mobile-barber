// src/hooks/useAuth.js
import { useEffect, useState } from "react";
import { saveStorage } from "../../../../helpers/token";
import { post } from "../../../../api/apiService";
import {
  getExpoTokenStorage,
  removeExpoTokenStorage,
} from "@/helpers/expoToken";
import { Platform } from "react-native";

const useLoginForm = () => {
  const [data, setData] = useState(null);
  const [pending, setPending] = useState(false);
  const [status, setStatus] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isMessage, setIsMessage] = useState(false);

  async function registerForPushNotificationsAsync() {
    

    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        handleRegistrationError(
          "Permission not granted to get push token for push notification!"
        );
        return;
      }
      const projectId =
        Constants?.expoConfig?.extra?.eas?.projectId ??
        Constants?.easConfig?.projectId;
      if (!projectId) {
        handleRegistrationError("Project ID not found");
      }
      try {
        const pushTokenString = (
          await Notifications.getExpoPushTokenAsync({
            projectId,
          })
        ).data;
        console.log(pushTokenString);
        return pushTokenString;
      } catch (e) {
        handleRegistrationError(`${e}`);
      }
    } else {
      handleRegistrationError(
        "Must use physical device for push notifications"
      );
    }
  }

  useEffect(() => {
    registerForPushNotificationsAsync()
      .then((token) => setExpoPushToken(token ?? ""))
      .catch((error) => setExpoPushToken(`${error}`));
  }, []);
  const login = async (email, password) => {
    if (!email || !password) {
      setIsMessage(true);
      setError("Please enter both email and password");
      return;
    }

    setPending(true);
    setError(null);
    setData(null);

    try {
      const responseData = await post("/users/login", { email, password });
      if (responseData.status === 202) {
        setPending(false);
        setIsMessage(true);
        // setSuccess(responseData.message);
        setError(responseData.message);
        return;
      }
      if (responseData.status === 606) {
        setPending(false);
        setIsMessage(true);
        setStatus(responseData.status);
        setError(responseData.message);
        return;
      }
      if (responseData.status === 200) {
        saveStorage(responseData.token);

        setData(responseData);
      }
    } catch (err) {
      if (err.message.includes("404")) {
        setIsMessage(true);

        setError(` Not found endpoint`);
      } else {
        setIsMessage(true);

        setError(`Something Went Wrong, Please Try Again`);
      }
      setPending(false);
    }
  };

  useEffect(() => {
    if (data) {
      saveToken(data.userId);
    }
  }, [data]);

  const saveToken = async (userId) => {
    setPending(true); // Set pending state when saving token
    const expoTokenData = await getExpoTokenStorage(); // Assuming this function exists

    try {
      const responseData = await post("/api/saveToken", {
        tokenExpo: expoTokenData,
        tokenUser: userId,
      });

      if (responseData.status === 200) {
        console.log("Token saved successfully");
        setPending(false);
        setIsMessage(true);

        setSuccess("Login Successful!");
        removeExpoTokenStorage();
      } else {
        setPending(false);
        setIsMessage(true);

        setError(
          `Failed to save token: ${responseData?.message || "Unknown error"}`
        );
      }
    } catch (err) {
      console.log("Error saving token:", err.message);
      setPending(false);
      setIsMessage(true);

      setError(`Error saving token: ${err.message || err}`);
    }
  };

  return {
    data,
    pending,
    error,
    login,
    saveToken,
    success,
    status,
    setStatus,
    setIsMessage,
    isMessage,
  };
};

export default useLoginForm;
