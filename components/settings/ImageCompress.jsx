import { ActivityIndicator, Image, View } from "react-native";
import { useEffect } from "react";
import usePickImage from "@/components/infoapp/hooks/usePickImage";
import { Icon, Pressable } from "@/components/ui";
import { makeStyles, useTheme } from "@/theme";

/**
 * Profile photo picker (Phase 5.6 fix): 96px DS avatar (radius 12) with a small camera badge,
 * left-aligned. Tapping the photo or the badge opens the picker (same handler as before).
 */
export default function ImageCompress({ imageValue, handlePickImage }) {
  const styles = useStyles();
  const { colors } = useTheme();
  const { selectedImageUri, pickImage, uploading } = usePickImage(imageValue);
  useEffect(() => {
    if (selectedImageUri) {
      handlePickImage(selectedImageUri);
    }
  }, [selectedImageUri]);

  return (
    <Pressable onPress={pickImage} disabled={uploading} style={styles.container}>
      {selectedImageUri ? (
        <Image source={{ uri: selectedImageUri }} style={styles.image} />
      ) : (
        <View style={[styles.image, styles.placeholder]}>
          <Icon name="person" size={40} color="inkMuted" />
        </View>
      )}
      {uploading && (
        <View style={[styles.image, styles.uploading]}>
          <ActivityIndicator color={colors.onPrimary} />
        </View>
      )}
      <View style={styles.badge}>
        <Icon name="camera" size={16} rawColor={colors.onPrimary} />
      </View>
    </Pressable>
  );
}

const useStyles = makeStyles((colors) => ({
  container: { width: 96, height: 96 },
  image: { width: 96, height: 96, borderRadius: 12, resizeMode: "cover" },
  placeholder: { backgroundColor: colors.surfaceSunken, alignItems: "center", justifyContent: "center" },
  uploading: { position: "absolute", backgroundColor: colors.scrim, alignItems: "center", justifyContent: "center" },
  badge: {
    position: "absolute",
    right: -6,
    bottom: -6,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    borderWidth: 2,
    borderColor: colors.bg,
    alignItems: "center",
    justifyContent: "center",
  },
}));
