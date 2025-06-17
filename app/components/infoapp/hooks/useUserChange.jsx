import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useState, useCallback, useEffect } from "react";

const useUserChange = () => {
    const [isLoadingChange, setIsLoadingChange] = useState(true);
    const [errorChange, setErrorChange] = useState(null);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        if (message) {
            setTimeout(() => {
                setMessage(null);
            }, 3000);
        }
    }, [message])

    const handleChangeUser = useCallback(async (userData) => {
        setIsLoadingChange(true);
        setErrorChange(null);
        const filename = userData?.image.split('/').pop();
        const fileType = filename.split('.').pop() === 'png' ? 'image/png' : 'image/jpeg';
        const formData = new FormData();
        formData.append('image', {
            uri: userData?.image,
            name: filename,
            type: fileType,
        });
        formData.append('name', userData?.name);
        formData.append('phoneNumber', userData?.phoneNumber);
        try {
            const storedToken = await AsyncStorage.getItem("token");
            const response = await axios.put(`${process.env.EXPO_PUBLIC_API_URL}/users/${storedToken}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Axios might need this explicitly for FormData, depending on setup
                },
                timeout: 120000, // 2 minutes timeout for large files
            });

            if (response.status >= 200 && response.status < 300) {
                setMessage(response.data.message);
            } else {
                setMessage(`Upload failed: ${response.data.message || 'Unknown error'}`);
            }
        } catch (error) {
            if (err.message.includes("404")) {
                setErrorChange(`Not found endpoint`);
            } else {
                setErrorChange(`Something Went Wrong, Please Try Again`);
            }
            setIsLoadingChange(false);
        } finally {
            setIsLoadingChange(false);
        }
    }, []);

    return { message, isLoadingChange, errorChange, handleChangeUser };
};

export default useUserChange;
