import { Alert, Linking } from "react-native";

export const useOpenGoogleMaps = () => {
  const openGoogleMapsRoute = async (url) => {
    try {
      const supported = await Linking.canOpenURL(url);
      console.log("url", url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert("Error", "Can't open this URL on your device");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to open URL");
    }
  };

  return { openGoogleMapsRoute };
};
