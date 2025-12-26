import AsyncStorage from "@react-native-async-storage/async-storage";

export const getStorage = async () => {
  try {
    console.log("xzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz")
    const result =  await AsyncStorage.getItem("token");
    console.log("getStorage++++",result)

    return result;
  } catch (e) {
    // error reading value
  }
};
export const saveStorage = async (value) => {
  try {
    console.log("saveStorage++++",value)

    return await AsyncStorage.setItem("token", value);
  } catch (e) {
    // saving error
  }
};

export const removeStorage = async () => {
  try {
    console.log("removeStorage++++")
    return await AsyncStorage.removeItem("token");
  } catch (e) {
    // saving error
  }
};
