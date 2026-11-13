import { View,  Image } from "react-native";
import usePickImage from "@/components/infoapp/hooks/usePickImage";
import { useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { Icon, Pressable } from "@/components/ui";
import { makeStyles } from "@/theme";

export default function ImageCompress({ imageValue, handlePickImage }) {
  const styles = useStyles();
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
          <Icon name="personCircle" size={280} color="ink" />
          <Pressable
            style={styles.buttonPlaceholder}
            onPress={pickImage}
            disabled={uploading}
          >
            <Icon name="photo" size={45} color="ink" />
          </Pressable>
        </View>
      )}
      {selectedImageUri && (
        <View style={styles.defaultImgAvatar}>
          <Image source={{ uri: selectedImageUri }} style={styles.image} />
        </View>
      )}
      {selectedImageUri && (
        <Pressable
          style={styles.button}
          onPress={pickImage}
          disabled={uploading}
        >
          <Icon name="photo" size={45} color="ink" />
        </Pressable>
      )}
    </View>
  );
}

const useStyles = makeStyles((colors) => ({
  defaultImgAvatar: {
    width: 200,
    height: 200,
    backgroundColor: colors.bg,
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
    right: 0,
    bottom: 10,
  },
  buttonPlaceholder: {
    position: "absolute",
    right: 20,
    bottom: 30,
  },
}));
