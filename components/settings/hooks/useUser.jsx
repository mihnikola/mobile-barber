import { get } from "@/api/apiService";
import { removeStorage } from "@/helpers/token";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useState } from "react";

const useUser = () => {
    const [userData, setUserData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isValid, setIsValid] = useState(false);
    const [isMessage, setIsMessage] = useState(false);

    const tokenData = async () => {
        setIsLoading(true);
        try {
            const storedToken = await AsyncStorage.getItem("token");
            if (storedToken) {
                setIsValid(true);
            } else {
                setIsValid(false);
            }
            setIsLoading(false);
        } catch (err) {
            setIsValid(false);
            setIsLoading(false);
        }
    }
    const onPressHandler = (data) => {
        if (data === "1") {
            router.push("/(tabs)/(04_settings)/infoUserProfile");
        }
        if (data === "100") {
            router.push("/(tabs)/(04_settings)/infoApp");
        }
        if (data === "200") {
            router.push("/(tabs)/(04_settings)/infoPrivacy");
        }
        if (data === "900") {
            router.push("/(tabs)/(04_settings)/infoHelpCenter");
        }
        if (data === "6") {
            setIsMessage(true);
        }
    };

    const logoutHandler = async () => {
        setIsMessage(false);
        await removeStorage().then((s) => {
            router.push("/(tabs)/(04_settings)/login");
        });
    };

    const fetchUserData = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const storedToken = await AsyncStorage.getItem("token");

            const response = await get(`/users/${storedToken}`);
            if (response.status === 200) {
                setUserData(response.data);
                setIsLoading(false);
            }
        } catch (err) {
            if (err.message.includes("404")) {
                setError(`Not found endpoint`);
            } else {
                setError(`Something Went Wrong, Please Try Again`);
            }
            setIsLoading(false);
        }
    };


    return { userData, isLoading, error, isValid, tokenData, fetchUserData, onPressHandler, logoutHandler, isMessage, setIsMessage };
};

export default useUser;
