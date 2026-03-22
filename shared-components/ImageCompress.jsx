import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import usePickImage from "@/components/infoapp/hooks/usePickImage";
import { useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ImageCompress({ imageValue, handlePickImage }) {
  const { selectedImageUri, pickImage, uploading } = usePickImage(imageValue);
  
  useEffect(() => {
    if (selectedImageUri) {
      handlePickImage(selectedImageUri);
    }
  }, [selectedImageUri]);

  return (
    <View style={styles.container}>
      {uploading && <ActivityIndicator size={32} />}

      {!selectedImageUri && (
        <View>
          <Ionicons name="person-circle-sharp" size={280} color="white" />
          <TouchableOpacity
            style={styles.buttonPlaceholder}
            onPress={pickImage}
            disabled={uploading}
          >
            <MaterialIcons size={45} name="photo" color="white" />
          </TouchableOpacity>
        </View>
      )}
      {selectedImageUri && (
        <View style={styles.defaultImgAvatar}>
          <Image source={{ uri: selectedImageUri }} style={styles.image} />
        </View>
      )}
      {selectedImageUri && (
        <TouchableOpacity
          style={styles.button}
          onPress={pickImage}
          disabled={uploading}
        >
          <MaterialIcons size={45} name="photo" color="white" />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  defaultImgAvatar: {
    width: 200,
    height: 200,
    backgroundColor: "black",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    resizeMode: "cover", // Ensures image fits within the bounds without distortion
  },
  button: {
    position: "absolute",
    right:0,
    bottom: 10
  },
  buttonPlaceholder: {
    position: "absolute",
    right:20,
    bottom: 30

  },
});
