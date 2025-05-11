// src/hooks/useCancelReservation.js
import { useState, useCallback } from 'react';
import { put } from '@/api/apiService';
import { useNavigation } from '@react-navigation/native';
import { ToastAndroid } from 'react-native';

const useCancelReservation = () => {
    const [isCanceling, setIsCanceling] = useState(false);
    const [cancelError, setCancelError] = useState(null);
    const navigation = useNavigation();

    const showToast = useCallback((text) => {
        ToastAndroid.show(text, ToastAndroid.SHORT);
    }, []);

    const cancelReservation = useCallback(async (reservationId) => {
        if (!reservationId) {
            setCancelError("Reservation ID is missing.");
            return false;
        }

        setIsCanceling(true);
        setCancelError(null);
        try {
            const response = await put(`/reservations/${reservationId}`, { status: 1 }); // Assuming status 1 is for cancellation
            showToast(response.message || "Rezervacija je otkazana.");
            navigation.navigate("(tabs)", { screen: "explore" });
            return true;
        } catch (err) {
            setCancelError(err.message || "Failed to cancel reservation.");
            console.error("Error canceling reservation:", err);
            showToast(err.message || "Došlo je do greške prilikom otkazivanja rezervacije.");
            return false;
        } finally {
            setIsCanceling(false);
        }
    }, [navigation, showToast]);

    return { isCanceling, cancelError, cancelReservation };
};

export default useCancelReservation;