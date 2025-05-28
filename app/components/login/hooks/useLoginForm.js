// src/hooks/useAuth.js
import { useState } from "react";
import {
  getExpoTokenStorage,
  removeExpoTokenStorage,
  saveStorage,
} from "../../../../helpers/index";
import { ToastAndroid } from "react-native";
import { post } from "../../../../api/apiService";
import { useNavigation } from "@react-navigation/native";

const showToast = (text) => {
  ToastAndroid.show(text, ToastAndroid.SHORT);
};

const useLoginForm = () => {
  const [data, setData] = useState(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  const login = async (email, password) => {
    if (!email || !password) {
      showToast("Please enter both email and password");
      return;
    }

    setPending(true);
    setError(null);
    setData(null);

    try {
      const responseData = await post("/users/login", { email, password });

      if (responseData.status === 202) {
        setPending(false);
        showToast(responseData.message);
      }
      if (responseData.status === 200) {
        setData(responseData);
        saveStorage(responseData.token);
        // You would typically get the userId from the response here
        // For example, if your responseData has a user object with an id:
        const userId = responseData.userId;
        const expoToken = await getExpoTokenStorage(); // Assuming this function exists
        if (responseData.status === 200 && expoToken && userId) {
          saveToken(userId, expoToken);
          removeExpoTokenStorage();
          setPending(false);
          showToast("Login Successful!");
          navigation.navigate("(tabs)", { screen: "index" });
        }
      }
    } catch (err) {
      if (err.message.includes("404")) {
        showToast(` Not found endpoint`);
      } else {
        showToast(`Something Went Wrong, Please Try Again`);
      }
      setPending(false);
    }
  };

  const saveToken = async (userId, dataTokenExpo) => {
    setPending(true); // Set pending state when saving token
    try {
      const responseData = await post("/api/saveToken", {
        tokenExpo: dataTokenExpo,
        tokenUser: userId,
      });
      console.log("saveToken+++", responseData);

      if (responseData.status === 200) {
        console.log("Token saved successfully");
        setPending(false);
        removeExpoTokenStorage();
        showToast("Login Successful!");
        navigation.navigate("(tabs)", { screen: "index" });
      } else {
        setPending(false);
        showToast(
          `Failed to save token: ${responseData?.message || "Unknown error"}`
        );
      }
    } catch (err) {
      console.log("Error saving token:", err.message);
      setPending(false);
      showToast(`Error saving token: ${err.message || err}`);
    }
  };

  return { data, pending, error, login, saveToken }; // Return saveToken
};

export default useLoginForm;
