import { get } from "@/api/apiService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";

const useUser = () => {
    const [userData, setUserData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
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
        fetchUserData();
    }, []);

    return { userData, isLoading, error };
};

export default useUser;
