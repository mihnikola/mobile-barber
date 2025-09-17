import { useCallback } from "react";
import { Linking, Platform } from "react-native";

/**
 * Custom hook to open Google Maps with either location or directions.
 */
export const useOpenGoogleMaps = () => {
  const openLocation = useCallback((latitude, longitude) => {
    const url = Platform.select({
      ios: `http://maps.apple.com/?ll=${latitude},${longitude}`,
      android: `geo:${latitude},${longitude}?q=${latitude},${longitude}`,
    });

    Linking.openURL(url).catch((err) =>
      console.error("Failed to open map:", err)
    );
  }, []);

  const openGoogleMapsRoute = (url) => {
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open directions:", err)
    );
  };

  return { openLocation, openGoogleMapsRoute };
};
