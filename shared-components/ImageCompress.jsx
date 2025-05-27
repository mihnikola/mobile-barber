import { useState } from 'react';
import { Button, Image, View, Platform, Text, StyleSheet, Alert, ToastAndroid, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Toast } from 'toastify-react-native';
import Avatar from './Avatar';
import { IconSymbol } from "@/components/ui/IconSymbol";
import { DUMMY_AVATAR_URI } from "@/assets/images/defaultImgAvatar.png";

export default function ImageCompress() {
    const [pickedImageUri, setPickedImageUri] = useState(null);
    const [originalImageInfo, setOriginalImageInfo] = useState(null);
    const [compressedImageInfo, setCompressedImageInfo] = useState(null);

    // Function to request permissions
    const requestPermissions = async () => {
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert(
                    'Dozvola potrebna',
                    'Moramo imati dozvolu za pristup galeriji da bismo ovo radili!'
                );
                return false;
            }
        }
        return true;
    };

    const showToast = (text) => {
        ToastAndroid.show(text, ToastAndroid.SHORT);
    };
    const pickImage = async () => {
        const hasPermission = await requestPermissions();
        if (!hasPermission) return;

        // Reset previous image info
        setPickedImageUri(null);
        setOriginalImageInfo(null);
        setCompressedImageInfo(null);

        // ImagePicker options for compression
        // `quality` from 0 (compress most) to 1 (highest quality, least compression)
        const compressionQuality = 0.5; // Example: 50% compression

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false, // Set to true if you want to allow cropping/editing
            aspect: [5, 4],     // Aspect ratio if allowsEditing is true
            quality: compressionQuality, // This is the key property for compression
            // base64: true, // You can also get base64 data if needed
        });

        if (!result.canceled) {
            console.log("result.assets[0].fileSize ", result.assets[0])
            if (result.assets[0].fileSize > 400000) {
                showToast("This file is too large. Choose another image.");
                return;
            }
            const selectedAsset = result.assets[0]; // Access the first asset in the assets array

            setPickedImageUri(selectedAsset.uri);

            // Get original file info (if available and needed for comparison)
            // Note: ImagePicker might not always provide original file size directly
            // without additional native module or a separate fetch.
            // For simplicity, we'll assume `fileSize` and `width/height` from the result
            // represents the *compressed* info.
            // To truly compare original vs. compressed, you might need to pick *without*
            // compression first, then re-pick with compression.
            // Or, on Android, you might get the original file path.
            // For this example, we'll display what ImagePicker gives us.

            // Mock original size (as ImagePicker result already contains the compressed info)
            // In a real app, you might pick without quality first to get original size,
            // then process.
            const originalWidth = selectedAsset.width / Math.sqrt(compressionQuality);
            const originalHeight = selectedAsset.height / Math.sqrt(compressionQuality);
            const originalFileSizeEstimate = selectedAsset.fileSize / compressionQuality; // Very rough estimate

            setOriginalImageInfo({
                width: Math.round(originalWidth),
                height: Math.round(originalHeight),
                fileSize: Math.round(originalFileSizeEstimate),
                uri: selectedAsset.uri // This URI is already for the compressed image
            });

            setCompressedImageInfo({
                width: selectedAsset.width,
                height: selectedAsset.height,
                fileSize: selectedAsset.fileSize,
                uri: selectedAsset.uri
            });

            console.log('Original asset info (estimated):', originalImageInfo);
            console.log('Compressed asset info:', compressedImageInfo);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={pickImage} >
                <View style={styles.imageAvatar}>
                    <IconSymbol size={60} name="image" color="white" />
                </View>
                {!pickedImageUri &&
                    <Image
                        source={require("@/assets/images/defaultImgAvatar.png")}
                        style={styles.headerImage}
                        resizeMode="cover"
                    />}
                {pickedImageUri && (<Avatar url={pickedImageUri} size={200} />)}

            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    imageAvatar: {
        position: 'absolute',
        top: "70%",
        left: '70%',
        zIndex: 99
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    headerImage: {
        width: 200,
        height: 200,
        opacity: .9
    },

    container: {
        marginTop: 70,
        alignItems: 'center',
    },
    image: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
        marginBottom: 10,
        borderRadius: 20
    },
    infoText: {
        fontSize: 14,
        marginBottom: 5,
    },
});