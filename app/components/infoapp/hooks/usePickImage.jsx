import { useCallback, useEffect, useState } from "react";
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { Alert } from "react-native";

const usePickImage = (imageValue) => {
    const [selectedImageUri, setSelectedImageUri] = useState(imageValue || null);
    const [uploading, setUploading] = useState(false);
    const [statusMessage, setStatusMessage] = useState('');


    const pickImage = useCallback(async () => {
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
    });

    // const uploadImage = useCallback(async () => {
    //     if (!selectedImageUri) {
    //         Alert.alert('No image selected', 'Please pick an image first.');
    //         return;
    //     }

    //     setUploading(true); // Set uploading state to true to show activity indicator
    //     setStatusMessage('Uploading...');

    //     // Extract filename from the URI
    //     const filename = selectedImageUri.split('/').pop();
    //     // Attempt to determine the MIME type based on file extension, default to JPEG
    //     // In a real app, you might use a library like 'mime-types' or more robust logic
    //     const fileType = filename.split('.').pop() === 'png' ? 'image/png' : 'image/jpeg';

    //     // Create FormData object to prepare the file for multipart/form-data upload
    //     const formData = new FormData();
    //     formData.append('image', { // 'image' is the field name that the Node.js backend (Multer) expects
    //         uri: selectedImageUri,
    //         name: filename,
    //         type: fileType,

    //     });

    //     try {
            
    //         const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/upload`, formData, { 
    //             headers: {
    //                 'Content-Type': 'multipart/form-data', // Axios might need this explicitly for FormData, depending on setup
    //             },
    //             // Optional: add a timeout
    //             timeout: 120000, // 2 minutes timeout for large files
    //         });

    //         // Axios automatically parses JSON responses
    //         const data = response.data; // Access response data directly from response.data

    //         if (response.status >= 200 && response.status < 300) { // Check if the HTTP status code indicates success
    //             setStatusMessage(`Upload successful! ${data.message || ''}\nURL: ${data.blobUrl}`);
    //             setSelectedImageUri(null); // Clear the selected image after successful upload
    //         } else {
    //             // This block might not be reached if axios throws an error for non-2xx responses by default
    //             setStatusMessage(`Upload failed: ${data.message || 'Unknown error'}`);
    //             console.error('Backend error response (non-2xx status):', data);
    //         }
    //     } catch (error) {
    //         // Axios error handling is more centralized
    //         if (axios.isAxiosError(error)) {
    //             // Handle Axios-specific errors (e.g., network error, 4xx/5xx responses)
    //             console.error('Axios error during upload:', error.response ? error.response.data : error.message);
    //             setStatusMessage(`Upload failed: ${error.response?.data?.message || error.message}`);
    //         } else {
    //             // Handle other unexpected errors
    //             console.error('General error during upload:', error);
    //             setStatusMessage(`Upload failed: ${error.message}`);
    //         }
    //     } finally {
    //         setUploading(false); // Reset uploading state regardless of success or failure
    //     }
    // });

    return { pickImage, selectedImageUri, uploading, statusMessage };
};

export default usePickImage;
