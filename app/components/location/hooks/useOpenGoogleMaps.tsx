import { Alert, Linking, Platform } from "react-native";
import * as Location from "expo-location";

const useOpenGoogleMaps = () => {
  const openGoogleMapsRoute = async (
    destinationLatitude,
    destinationLongitude,
    destinationName = "Destination"
  ) => {
    try {
      // 1. Request foreground location permission
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Location Permission Denied",
          "Please grant location permission to get your current location and show the route."
        );
        return;
      }

      // 2. Get current location
      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      // 3. Construct Google Maps URL
      const origin = `${latitude},${longitude}`;
      const destination = `${destinationLatitude},${destinationLongitude}`;
      const travelMode = "driving"; // Options: 'driving', 'walking', 'bicycling', 'transit'

      let url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=${travelMode}`;

      // For iOS, try the Google Maps app scheme first, then fall back to Apple Maps
      if (Platform.OS === "ios") {
        const googleMapsUrl = `comgooglemaps://?saddr=${origin}&daddr=${destination}&directionsmode=${travelMode}`;
        const appleMapsUrl = `http://maps.apple.com/?saddr=${origin}&daddr=${destination}`;

        const canOpenGoogleMapsApp = await Linking.canOpenURL(googleMapsUrl);

        if (canOpenGoogleMapsApp) {
          url = googleMapsUrl;
        } else {
          url = appleMapsUrl;
        }
      }

      // 4. Check if the URL can be opened and then open it
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert(
          "Cannot Open Maps",
          `It seems your device cannot open maps using the URL: ${url}. Please ensure you have a maps app installed.`
        );
      }
    } catch (error) {
      console.error("Error opening maps:", error);
      Alert.alert(
        "Error",
        "An error occurred while trying to open maps. Please ensure location services are enabled and try again later."
      );
    }
  };
  return { openGoogleMapsRoute };
};

export default useOpenGoogleMaps;
