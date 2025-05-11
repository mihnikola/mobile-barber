// src/hooks/useReservationCancellationAlert.js
import { useCallback } from 'react';
import { Alert } from 'react-native';

const useReservationCancellationAlert = (onConfirm) => {
    const showAlert = useCallback(() => {
        Alert.alert(
            "Upozorenje",
            "Da li ste sigurni da želite da otkažete rezervaciju?",
            [
                {
                    text: "Odustani",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel",
                },
                {
                    text: "Ok",
                    onPress: () => {
                        onConfirm();
                    },
                },
            ]
        );
    }, [onConfirm]);

    return { showAlert };
};

export default useReservationCancellationAlert;