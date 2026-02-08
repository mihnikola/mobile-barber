import { Alert, Linking } from "react-native";

export const useOpenGoogleMaps = () => {
  const openGoogleMapsRoute = async (url: string) => {
    try {
      await Linking.openURL(url);
    } catch (error) {
      Alert.alert("Error", "Failed to open URL");
    }
  };

  return { openGoogleMapsRoute };
};
