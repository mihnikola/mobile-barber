import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    Alert,
} from 'react-native';
// Import Expo's ImagePicker
import * as ImagePicker from 'expo-image-picker';
// Import Axios
import axios from 'axios'; // <-- NEW: Import axios

export default function ImageCompress() {
    const [selectedImageUri, setSelectedImageUri] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [statusMessage, setStatusMessage] = useState('');

    const pickImage = async () => {
        try {
            // Request media library permissions
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission required', 'Please grant media library permissions to select an image.');
                return;
            }

            // Launch the image library to select an image
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images, // Only allow images
                allowsEditing: true, // Allow user to crop/edit the image
                aspect: [4, 3], // Set aspect ratio for editing (e.g., 4:3)
                quality: 1, // Request highest quality image
            });

            // If the user did not cancel the image selection
            if (!result.canceled) {
                setSelectedImageUri(result.assets[0].uri); // Set the URI of the selected image
                setStatusMessage(''); // Clear any previous status messages
            } else {
                setStatusMessage('Image selection cancelled.');
            }
        } catch (error) {
            console.error('Error picking image:', error);
            setStatusMessage('Failed to pick image.');
        }
    };

    const uploadImage = async () => {
        if (!selectedImageUri) {
            Alert.alert('No image selected', 'Please pick an image first.');
            return;
        }

        setUploading(true); // Set uploading state to true to show activity indicator
        setStatusMessage('Uploading...');

        // Extract filename from the URI
        const filename = selectedImageUri.split('/').pop();
        // Attempt to determine the MIME type based on file extension, default to JPEG
        // In a real app, you might use a library like 'mime-types' or more robust logic
        const fileType = filename.split('.').pop() === 'png' ? 'image/png' : 'image/jpeg';

        // Create FormData object to prepare the file for multipart/form-data upload
        const formData = new FormData();
        formData.append('image', { // 'image' is the field name that the Node.js backend (Multer) expects
            uri: selectedImageUri,
            name: filename,
            type: fileType,
        });

        try {
            // IMPORTANT: Replace 'http://YOUR_NODEJS_SERVER_IP:3000/upload' with the actual IP address or hostname.
            // - If running on an Android emulator and your server is on your host machine: 'http://10.0.2.2:3000/upload'
            // - If running on an iOS simulator and your server is on your host machine: 'http://localhost:3000/upload'
            // - If running on a physical device, ensure your device and computer are on the same Wi-Fi network.
            //   Use your computer's local IP address (e.g., 'http://192.168.1.X:3000/upload').
            const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/upload`, formData, { // <-- NEW: Using axios.post
                headers: {
                    'Content-Type': 'multipart/form-data', // Axios might need this explicitly for FormData, depending on setup
                },
                // Optional: add a timeout
                timeout: 120000, // 2 minutes timeout for large files
            });

            // Axios automatically parses JSON responses
            const data = response.data; // Access response data directly from response.data

            if (response.status >= 200 && response.status < 300) { // Check if the HTTP status code indicates success
                setStatusMessage(`Upload successful! ${data.message || ''}\nURL: ${data.blobUrl}`);
                setSelectedImageUri(null); // Clear the selected image after successful upload
            } else {
                // This block might not be reached if axios throws an error for non-2xx responses by default
                setStatusMessage(`Upload failed: ${data.message || 'Unknown error'}`);
                console.error('Backend error response (non-2xx status):', data);
            }
        } catch (error) {
            // Axios error handling is more centralized
            if (axios.isAxiosError(error)) {
                // Handle Axios-specific errors (e.g., network error, 4xx/5xx responses)
                console.error('Axios error during upload:', error.response ? error.response.data : error.message);
                setStatusMessage(`Upload failed: ${error.response?.data?.message || error.message}`);
            } else {
                // Handle other unexpected errors
                console.error('General error during upload:', error);
                setStatusMessage(`Upload failed: ${error.message}`);
            }
        } finally {
            setUploading(false); // Reset uploading state regardless of success or failure
        }
    };

    return (
        <View style={styles.container}>

            <TouchableOpacity style={styles.button} onPress={pickImage} disabled={uploading}>
                <Text style={styles.buttonText}>Pick an Image</Text>
            </TouchableOpacity>

            {selectedImageUri && (
                <View style={styles.imageContainer}>
                    <Image source={{ uri: selectedImageUri }} style={styles.image} />
                </View>
            )}

            <TouchableOpacity
                style={[styles.button, styles.uploadButton, (uploading || !selectedImageUri) && styles.disabledButton]}
                onPress={uploadImage}
                disabled={uploading || !selectedImageUri}>
                {uploading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.buttonText}>Upload Image</Text>
                )}
            </TouchableOpacity>

        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30,
        color: '#333',
    },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 8,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3, // For Android shadow
    },
    uploadButton: {
        backgroundColor: '#28a745',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    disabledButton: {
        opacity: 0.6, // Visual feedback for disabled buttons
    },
    imageContainer: {
        marginBottom: 20,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        padding: 10,
        backgroundColor: '#fff',
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 8,
        resizeMode: 'cover', // Ensures image fits within the bounds without distortion
        marginBottom: 10,
    },
    selectedText: {
        fontSize: 14,
        color: '#555',
        textAlign: 'center',
    },
    statusText: {
        marginTop: 20,
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
        textAlign: 'center',
    },
});
