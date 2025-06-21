import { useCallback, useState } from "react";
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import * as ImageManipulator from 'expo-image-manipulator';
import { Alert } from "react-native";

const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB

const usePickImage = (imageValue) => {
  const [selectedImageUri, setSelectedImageUri] = useState(imageValue || null);
  const [uploading, setUploading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const compressImageUntilUnder1MB = async (uri) => {
    let quality = 0.9;
    let resizedUri = uri;
    let sizeOk = false;

    while (quality > 0.1 && !sizeOk) {
      const result = await ImageManipulator.manipulateAsync(
        resizedUri,
        [{ resize: { width: 1000 } }], // Optional resizing
        {
          compress: quality,
          format: ImageManipulator.SaveFormat.JPEG,
        }
      );

      const fileInfo = await FileSystem.getInfoAsync(result.uri);
      if (fileInfo.size < MAX_FILE_SIZE) {
        sizeOk = true;
        return result.uri;
      }

      resizedUri = result.uri;
      quality -= 0.1; // Keep reducing quality
    }

    return resizedUri; // Return even if >1MB (best effort)
  };

  const pickImage = useCallback(async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission required', 'Please grant access to media library.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1, // Start with full quality
      });

      if (result.canceled) {
        setStatusMessage('Image selection cancelled.');
        return;
      }

      let originalUri = result.assets[0].uri;
      const compressedUri = await compressImageUntilUnder1MB(originalUri);

      const compressedInfo = await FileSystem.getInfoAsync(compressedUri);

      if (compressedInfo.size > MAX_FILE_SIZE) {
        Alert.alert("Warning", "Couldn't compress below 1MB. Best effort applied.");
      }

      setSelectedImageUri(compressedUri);
      setStatusMessage('');
    } catch (error) {
      console.error('Error picking image:', error);
      setStatusMessage('Failed to pick image.');
    }
  }, []);

  return { pickImage, selectedImageUri, uploading, statusMessage };
};

export default usePickImage;
