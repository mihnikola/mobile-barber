import AsyncStorage from "@react-native-async-storage/async-storage";

export const getLanguageValue = async () => {
  try {
    const value = await AsyncStorage.getItem("languageValue");
    return value ?? "sr"; // default to "en" if no value is stored
  } catch (e) {
    // console.error("Error reading language value from AsyncStorage:", e);
    // return "sr"; // fallback default
  }
};

export const setLanguageValue = async (value) => {
  try {
    return await AsyncStorage.setItem("languageValue", value);
  } catch (e) {
    // saving error
  }
};
