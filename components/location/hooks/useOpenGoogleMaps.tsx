import { Alert, Linking } from "react-native";

export const useOpenGoogleMaps = () => {

  const extractAddressFromGoogleMapsUrl = (url: string) => {
    const match = url.match(/\((.*?)\)/);
    return match ? decodeURIComponent(match[1]) : null;
  };

  const openGoogleMapsRoute = async (url: string) => {
    try {
      const addressValue = extractAddressFromGoogleMapsUrl(url);
      const urlData = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addressValue)}`;
      await Linking.openURL(urlData);
    } catch (error) {
      Alert.alert("Error", "Failed to open URL");
    }
  };
  return { openGoogleMapsRoute };
};
